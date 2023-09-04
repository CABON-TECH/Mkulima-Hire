import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  Link,

  // useNavigate
} from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/Dropdown";

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
  const [roleSelected, setRoleSelected] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  const signUp = async (values) => {
    // Handle sign up
    const { userName, signUpEmail, signUpPassword } = values;
    setIsButtonDisabled(true);
    try {
      const response = await dispatch(
        register({
          username: userName,
          email: signUpEmail,
          password: signUpPassword,
          role: roleSelected,
        })
      );
      console.log("Registration successful:", response.payload);
      toast.success("Registration successful");
      // Store user data in localStorage
      localStorage.setItem("user", JSON.stringify(response.payload));

      if (response.payload.role == "worker") {
        navigate("/worker-dashboard");
      }
      if (response.payload.role == "farmer") {
        navigate("/farmer-dashboard");
      }

      setIsButtonDisabled(false);
    } catch (error) {
      toast.error(error.message);
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="text-custom-black w-[99vw] flex flex-col justify-center mx-auto overflow-x-hidden">
        <ToastContainer />
        <div className="flex justify-center gap-1 text-[#74c116]">
          <p className="font-semibold text-3xl">Mkulima-Hire</p>
        </div>
        <p className="text-3xl mx-auto font-semibold tracking-tight py-7">
          Welcome to Mkulima-Hire
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

              <div className="mt-5">
                <label htmlFor="role" className="text-sm pb-1">
                  Role
                </label>
                <Dropdown
                  name="role"
                  width={100}
                  placeholderText="Select a role"
                  options={[
                    { label: "Farmer", value: "farmer" },
                    { label: "Worker", value: "worker" },
                  ]}
                  value={roleSelected}
                  onChange={(e) => setRoleSelected(e.target.value)}
                />
              </div>

              <button
                disabled={
                  !formik.isValid ||
                  !formik.dirty ||
                  isButtonDisabled ||
                  roleSelected == ""
                }
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
