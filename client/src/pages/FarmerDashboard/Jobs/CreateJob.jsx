import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import Avatar from "react-avatar";
import Modal from "react-modal";
import done from "../../../assets/done.svg";

const API_URL = import.meta.env.VITE_API_URL;

const createJobSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  phone: Yup.string().required("Phone Number is required"),
  city: Yup.string().required("City name is required"),
  state: Yup.string().required("State name is required"),
  jobTitle: Yup.string().required("Job Title is required"),
  rate: Yup.number().required("Hourly Rate is required"),
});

const CreateJob = () => {
  const user = useSelector((state) => state?.auth.user);

  const [email, setEmail] = useState(user?.email);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("");
  const [charCount, setCharCount] = useState(0);
  const [isMyInputFocused, setIsMyInputFocused] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
    setValue("");
    setCharCount(0);
  }

  const createJob = async (values, { resetForm }) => {
    setIsButtonDisabled(true);
    try {
      const config = {
        headers: { Authorization: `Bearer ${user?.token}` },
      };
      await axios.post(
        API_URL + "jobs",
        {
          title: values.jobTitle,
          description: value,
          city: values.city,
          state: values.state,
          phone: values.phone,
          email: email,
          pay: values.rate,
          date: Date(),
          user: user?._id,
        },
        config
      );
      setIsButtonDisabled(false);
      openModal();
      toast.success("Job Posted successfully");
      resetForm();
    } catch (error) {
      toast.error(error.message);
      setIsButtonDisabled(false);
    }
  };

  const handleTextAreaChange = (event) => {
    const newValue = event.target.value;
    if (newValue.length <= 500) {
      setCharCount(newValue.length);
      setValue(newValue);
      // onChange(event);
    }
  };

  return (
    <div className="sm:pl-60 pl-2 py-5 pb-24 w-full pr-2 sm:pr-10">
      <div className="flex justify-between items-center">
        <p className="text-[#74c116] text-2xl">Hello, {user.name}</p>
        <Avatar name={user.name} size="40" round={true} />
      </div>
      <hr className="mt-3" />

      <ToastContainer />
      <h2 className="text-[#74c116] text-xl font-semibold">
        Create a Job Opening
      </h2>
      <Formik
        initialValues={{
          email: email,
          phone: "",
          city: "",
          state: "",
          jobTitle: "",
          rate: "",
          description: value,
        }}
        validationSchema={createJobSchema}
        onSubmit={createJob}
      >
        {(formik) => (
          <Form className="flex flex-col">
            <section className="grid sm:grid-cols-2 grid-cols-1 gap-5">
              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm pb-1 mt-5">
                  Email
                </label>
                <Field
                  name="email"
                  className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="phone" className="text-sm pb-1 mt-5">
                  Phone Number
                </label>
                <Field
                  name="phone"
                  className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Phone Number"
                  type="tel"
                />

                <ErrorMessage
                  name="phone"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>
            </section>

            <section className="grid grid-cols-2 gap-5">
              <div className="flex flex-col">
                <label htmlFor="state" className="text-sm pb-1 mt-5">
                  State
                </label>
                <Field
                  name="state"
                  className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="State"
                />

                <ErrorMessage
                  name="state"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="email" className="text-sm pb-1 mt-5">
                  City
                </label>
                <Field
                  name="city"
                  className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="City"
                />

                <ErrorMessage
                  name="city"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>
            </section>

            <section className="grid sm:grid-cols-2 grid-cols-1 gap-5">
              <div className="flex flex-col">
                <label htmlFor="jobTitle" className="text-sm pb-1 mt-5">
                  Job Title
                </label>
                <Field
                  name="jobTitle"
                  className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Job Title"
                />

                <ErrorMessage
                  name="jobTitle"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="rate" className="text-sm pb-1 mt-5">
                  Hourly Rate (in KES)
                </label>
                <Field
                  name="rate"
                  className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Hourly Rate"
                  type="number"
                />

                <ErrorMessage
                  name="rate"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>
            </section>

            <section className="">
              <div className="flex flex-col relative">
                <label htmlFor="description" className="text-sm pb-1 mt-5">
                  Job Description
                </label>
                <Field
                  onChange={handleTextAreaChange}
                  value={value}
                  name="description"
                  className="focus:border-2 border-[1px] rounded-lg p-3 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Job Description"
                  as="textarea"
                  onBlur={() => setIsMyInputFocused(false)}
                  onFocus={() => setIsMyInputFocused(true)}
                />
                {!value && isMyInputFocused && (
                  <p className="text-red-700 text-sm">
                    Please provide a job description
                  </p>
                )}

                <p className="text-xs flex justify-end pt-1">{charCount}/500</p>
              </div>
            </section>

            <button
              disabled={
                !formik.isValid || !formik.dirty || isButtonDisabled || !value
              }
              type="submit"
              className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 rounded-lg mt-5 disabled:opacity-50 transition-all duration-300"
            >
              Create Job
            </button>
          </Form>
        )}
      </Formik>

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
        className="bg-white flex flex-col mt-[10%] py-10 sm:w-[50%] w-[90%] mx-auto justify-center items-center rounded-sm"
        appElement={document.getElementById("root") || undefined}
      >
        <div className="flex justify-center">
          <img src={done} alt="job posted" className="w-40" />
        </div>
        <p className="text-xl text-center w-1/2 py-3">
          You have successfully created a job posting! Now, wait for
          applications to start rolling in!
        </p>
        <div className="flex justify-center">
          <button
            onClick={() => closeModal()}
            className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 rounded-lg mt-5 disabled:opacity-50"
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateJob;
