import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import authServices from "../../features/auth/authService.jsx";

const SignUpSchema = Yup.object().shape({
  signUpEmail: Yup.string()
    .email("Invalid email")
    .required("Please enter your email address"),
  userName: Yup.string().required("Username is required"),
  signUpPassword: Yup.string().required("Password is required"),
});

const Register = () => {
  const [showPassword, setShowPassword] = useState("password");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();

  const togglePassword = () =>
    // Password visibility
    setShowPassword((prevState) =>
      prevState === "password" ? "text" : "password"
    );

  const eyeIcon =
    showPassword === "password" ? (
      <FaEye size="1.2rem" />
    ) : (
      <FaEyeSlash size="1.2rem" />
    );

  const signUp = async (values: {
    signUpEmail: string;
    signUpPassword: string;
    userName: string;
  }) => {
    // Handle sign up
    const { signUpEmail, signUpPassword, userName } = values;
    setIsButtonDisabled(true);
    try {
      const response = await authServices.register(
        userName,
        signUpEmail,
        signUpPassword
      );
      console.log("Registration successful:", response);
      toast.success("Registration successful");
      navigate("/dashboard");
      setIsButtonDisabled(false);
    } catch (error) {
      toast.error("Error signing up");
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="text-custom-black w-[99vw] flex flex-col justify-center mx-auto">
        <ToastContainer />
        <div className="flex justify-center gap-1 text-[#74c116]">
          <p className="font-semibold text-3xl">MkuliHire</p>
        </div>
        <p className="text-3xl mx-auto font-semibold tracking-tight py-7">
          Welcome to MkuliaHire
        </p>
        <p className="mx-auto">Please, fill in your details</p>

        <Formik
          initialValues={{
            userName: "",
            signUpEmail: "",
            signUpPassword: "",
          }}
          validationSchema={SignUpSchema}
          onSubmit={signUp}
        >
          {(formik) => (
            <Form className="flex flex-col mx-auto">
              <div className="flex flex-col mx-auto">
                <label htmlFor="signUpEmail" className="text-sm pb-1">
                  Email
                </label>
                <Field
                  name="signUpEmail"
                  className="focus:border-2 border-[1px] rounded-lg p-3 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Email"
                />

                <ErrorMessage
                  name="signUpEmail"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>
              <div className="flex flex-col mx-auto">
                <label htmlFor="userName" className="text-sm pb-1 mt-5">
                  Username
                </label>
                <Field
                  name="userName"
                  className="focus:border-2 border-[1px] rounded-lg p-3 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Username"
                />

                <ErrorMessage
                  name="userName"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>
              <div className="flex flex-col mx-auto">
                <label htmlFor="signUpPassword" className="text-sm pb-1 mt-5">
                  Password
                </label>

                <div className="input-container relative">
                  <Field
                    name="signUpPassword"
                    className="focus:border-2 border-[1px] rounded-lg p-3 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
                    placeholder="Enter password"
                    type={showPassword}
                  />
                  <span
                    className="absolute top-[33%] right-[3%]"
                    onClick={togglePassword}
                    style={{ cursor: "pointer" }}
                  >
                    {eyeIcon}
                  </span>
                </div>
                <ErrorMessage
                  name="signUpPassword"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <button
                disabled={!formik.isValid || !formik.dirty || isButtonDisabled}
                type="submit"
                className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 bg-custom-blue sm:w-[30rem] w-80 mx-auto rounded-lg mt-5 disabled:opacity-50 transition-all duration-300"
              >
                Sign Up
              </button>
              <p className="mx-auto mt-2">
                Already have an account?{" "}
                <Link to="/login" className="text-[#74c116]">
                  Log In
                </Link>
              </p>
            </Form>
          )}
        </Formik>
      </div>
      <div className="mt-10">
        <Footer />
      </div>
    </>
  );
};

export default Register;
