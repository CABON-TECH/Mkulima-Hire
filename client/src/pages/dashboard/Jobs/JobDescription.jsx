import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { AiOutlineArrowLeft } from "react-icons/ai";
import done from "../../../assets/done.svg";
import Modal from "react-modal";
import { formatDateDifference } from "../../../features/utils/Helpers";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const applySchema = Yup.object().shape({
  contact: Yup.string().required("Please provide contact information"),
  experience: Yup.string().required("Please provide experience details"),
});

const JobDescription = () => {
  const user = useSelector((state) => state?.auth.user);
  const API_URL = import.meta.env.VITE_API_URL;

  const [email, setEmail] = useState(user?.email);
  const [jobOpenings, setJobOpenings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [applyModalIsOpen, setApplyModalIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    navigate("/worker-dashboard");
  }

  function openApplyModal() {
    setApplyModalIsOpen(true);
  }
  function closeApplyModal() {
    setApplyModalIsOpen(false);
  }

  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` },
      };
      axios.get(API_URL + "jobs", config).then((response) => {
        setJobOpenings(response?.data?.data);
        setLoading(!response?.data.success);
      });
    } catch (error) {
      toast.error(error.message);
    }
  }, [user, API_URL]);
  const oneJob = jobOpenings?.find((obj) => obj._id === _id);

  function checkApplyStatus(job) {
    const userId = parseInt(user?._id);
    const apps = job?.applications;
    return apps?.some((item) => parseInt(item._id) === userId);
  }

  const handleApply = async (values) => {
    setIsButtonDisabled(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` },
      };
      await axios.post(
        API_URL + `jobs/${oneJob?._id}/apply`,
        {
          contactInfo: email,
          experience: values.experience,
        },
        config
      );
      setIsButtonDisabled(false);
      closeApplyModal();
      openModal();
      toast.success("Job Application successful");
    } catch (error) {
      toast.error("Error applying for this job");
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
          <button
            className="text-[#74c116] flex items-center gap-x-1"
            onClick={() => navigate("/worker-dashboard")}
          >
            <AiOutlineArrowLeft />
            Go back to Jobs
          </button>
          <LoadingSpinner />
        </div>
      ) : (
        <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
          <button
            className="text-[#74c116] flex items-center gap-x-1"
            onClick={() => navigate("/worker-dashboard")}
          >
            <AiOutlineArrowLeft />
            Go back to Jobs
          </button>
          <div>
            <p className="text-lg">{oneJob?.title}</p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Job Title
            </p>
          </div>

          <div>
            <p className="text-lg">
              {oneJob?.city}, {oneJob?.state}
            </p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Job Location
            </p>
          </div>

          <div>
            <p className="text-lg">{oneJob?.pay}</p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Hourly Wage (in KES)
            </p>
          </div>

          <div>
            <p className="text-lg">{oneJob?.description}</p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Job Description
            </p>
          </div>
          <div className="mt-5">
            <p className="font-semibold">Contact the Employer</p>
            <p className="text-lg">{oneJob?.email}</p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Employer mail
            </p>
          </div>

          <div>
            <p className="text-lg">{oneJob?.phone}</p>
            <p className="text-sm text-[#282828] font-light leading-tight">
              Employer phone number
            </p>
          </div>

          <div className="mt-5">
            <p className="text-sm text-[#282828] font-light leading-tight">
              Posted {formatDateDifference(oneJob?.date)} ago
            </p>
          </div>

          <p className="text-sm text-[#282828] font-light leading-tight">
            {oneJob?.applications.length} Applicant(s) so far
          </p>

          {checkApplyStatus(oneJob) ? (
            <p className="py-2 mt-5 text-[#282828]">
              You have already applied for this job!
            </p>
          ) : (
            <button
              type="submit"
              className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 bg-custom-blue mx-auto rounded-lg mt-5 disabled:opacity-50 transition-all duration-300"
              onClick={() => openApplyModal()}
            >
              Apply For This Job
            </button>
          )}

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={{
              overlay: {
                position: "fixed",
                background: "rgba(24, 49, 64, 0.63)",
                backdropFilter: 'blur("91px")',
                zIndex: 1,
              },
            }}
            className="bg-white flex flex-col mt-[5%] py-10 sm:w-[50%] w-[90%] mx-auto justify-center items-center rounded-sm"
            appElement={document.getElementById("root") || undefined}
          >
            <div className="flex justify-center">
              <img src={done} alt="job posted" className="w-40" />
            </div>
            <p className="text-xl text-center w-1/2 py-3">
              You have successfully submitted your application! The employer
              will be in touch for next steps!
            </p>
            <div className="flex justify-center">
              <button
                onClick={() => closeModal()}
                className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 rounded-lg mt-5 disabled:opacity-50"
              >
                Close Modal
              </button>
            </div>
          </Modal>

          <Modal
            isOpen={applyModalIsOpen}
            onRequestClose={closeApplyModal}
            style={{
              overlay: {
                position: "fixed",
                background: "rgba(24, 49, 64, 0.63)",
                backdropFilter: 'blur("91px")',
                zIndex: 1,
              },
            }}
            className="bg-white flex flex-col mt-[5%] py-10 sm:w-[50%] w-[90%] mx-auto justify-center items-center rounded-sm"
            appElement={document.getElementById("root") || undefined}
          >
            <Formik
              initialValues={{
                contact: email,
                experience: "",
              }}
              validationSchema={applySchema}
              onSubmit={handleApply}
            >
              {(formik) => (
                <Form className="flex flex-col">
                  <section className="">
                    <div className="flex flex-col">
                      <label htmlFor="contact" className="text-sm pb-1 mt-5">
                        Contact Information
                      </label>
                      <Field
                        name="contact"
                        className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                        placeholder="Contact Information"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                      />

                      <ErrorMessage
                        name="contact"
                        component="div"
                        className="text-red-700 text-sm"
                      />
                    </div>

                    <div className="flex flex-col">
                      <label htmlFor="experience" className="text-sm pb-1 mt-5">
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
                    disabled={
                      !formik.isValid || !formik.dirty || isButtonDisabled
                    }
                    type="submit"
                    className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 bg-custom-blue mx-auto rounded-lg mt-5 disabled:opacity-50 transition-all duration-300"
                  >
                    Apply
                  </button>
                </Form>
              )}
            </Formik>
          </Modal>
        </div>
      )}
    </>
  );
};

export default JobDescription;
