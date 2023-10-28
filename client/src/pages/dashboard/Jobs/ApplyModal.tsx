import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { SetStateAction, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../features/auth/AuthState';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';

const applySchema = Yup.object().shape({
  name: Yup.string().required('Please provide your name'),
  contact: Yup.string().required('Please provide contact information'),
  experience: Yup.string().required('Please provide experience details'),
});

export const ApplyModal = ({
  jobOpenings,
  applyModalIsOpen,
  setApplyModalIsOpen,
  setIsOpen,
  _id,
}: {
  jobOpenings: any;
  applyModalIsOpen: any;
  setApplyModalIsOpen: any;
  setIsOpen: any;
  _id: any;
}) => {
  const user = useSelector((state: RootState) => state?.auth.user);
  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState(user?.email);
  const [workerName, setWorkerName] = useState(user?.name);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  function closeApplyModal() {
    setApplyModalIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const handleApply = async (values: { experience: string }) => {
    setIsButtonDisabled(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` },
      };
      await axios.post(
        API_URL + `jobs/${oneJob?._id}/apply`,
        {
          userId: user?._id,
          name: workerName,
          contactInfo: email,
          experience: values.experience,
        },
        config,
      );
      setIsButtonDisabled(false);
      closeApplyModal();

      openModal();
      toast.success('Job Application successful');
    } catch (error) {
      toast.error('Error applying for this job');
      setIsButtonDisabled(false);
    }
  };
  const oneJob = jobOpenings?.find((obj: { _id: any }) => obj._id === _id);

  return (
    <Modal
      isOpen={applyModalIsOpen}
      onRequestClose={closeApplyModal}
      style={{
        overlay: {
          position: 'fixed',
          background: 'rgba(24, 49, 64, 0.63)',
          backdropFilter: 'blur("91px")',
          zIndex: 1,
        },
      }}
      className="bg-white flex flex-col mt-[5%] py-10 sm:w-[50%] w-[90%] mx-auto justify-center items-center rounded-sm"
      appElement={document.getElementById('root') || undefined}
    >
      <Formik
        initialValues={{
          name: workerName,
          contact: email,
          experience: '',
        }}
        validationSchema={applySchema}
        onSubmit={handleApply}
      >
        {(formik) => (
          <Form className="flex flex-col">
            <section className="">
              <div className="flex flex-col">
                <label
                  htmlFor="contact"
                  className="text-sm pb-1 mt-5 font-semibold"
                >
                  Name
                </label>
                <Field
                  name="name"
                  className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Your Name"
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setWorkerName(e.target.value)}
                  value={workerName}
                />

                <ErrorMessage
                  name="contact"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="contact"
                  className="text-sm pb-1 mt-5 font-semibold"
                >
                  Contact Information
                </label>
                <Field
                  name="contact"
                  className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Contact Information"
                  onChange={(e: {
                    target: { value: SetStateAction<string> };
                  }) => setEmail(e.target.value)}
                  value={email}
                />

                <ErrorMessage
                  name="contact"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="experience"
                  className="text-sm pb-1 mt-5 font-semibold"
                >
                  Experience
                </label>
                <Field
                  name="experience"
                  className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="E.g. 5 years of experience"
                />

                <ErrorMessage
                  name="experience"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>
            </section>

            <button
              disabled={!formik.isValid || !formik.dirty || isButtonDisabled}
              type="submit"
              className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 bg-custom-blue mx-auto rounded-lg mt-5 disabled:opacity-50 transition-all duration-300"
            >
              Apply
            </button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};
