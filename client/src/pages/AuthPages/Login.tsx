import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import { useDispatch } from 'react-redux';
import { login } from '../../features/auth/authSlice';
import { AppDispatch } from '../../features/auth/store';

const LogInSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  loginPassword: Yup.string().required('Password is required'),
});

const LogIn = () => {
  const [showPassword, setShowPassword] = useState('password');
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  // Authentication
  //jh

  const togglePassword = () =>
    // Password visibility
    setShowPassword((prevState) =>
      prevState === 'password' ? 'text' : 'password',
    );

  const eyeIcon =
    showPassword === 'password' ? (
      <FaEye size="1.2rem" />
    ) : (
      <FaEyeSlash size="1.2rem" />
    );

  const signIn = async (values: { email: string; loginPassword: string }) => {
    // Handle log in
    const { email, loginPassword } = values;
    setIsButtonDisabled(true);
    try {
      const response = await dispatch(
        login({
          email: email,
          password: loginPassword,
        }),
      );
      if (
        response.payload.role == 'worker' ||
        response.payload.role == 'farmer'
      ) {
        toast.success('Log In successful');
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(response.payload));
      } else {
        toast.error('Error logging in');
      }

      if (response.payload.role == 'worker') {
        navigate('/worker-dashboard');
      }
      if (response.payload.role == 'farmer') {
        navigate('/farmer-dashboard');
      }
      setIsButtonDisabled(false);
    } catch (error) {
      setIsButtonDisabled(false);
    }
  };

  return (
    <>
      <Navbar window={undefined} />
      <div className="text-custom-black w-[99vw] flex flex-col justify-center mx-auto">
        <ToastContainer />
        <div className="flex justify-center gap-1 text-[#74c116]">
          <p className="font-semibold text-3xl">Mkulima-Hire</p>
        </div>
        <p className="text-3xl mx-auto font-semibold tracking-tight py-7">
          Welcome back!
        </p>
        <p className="mx-auto">Please, enter your details</p>

        <Formik
          initialValues={{
            email: '',
            loginPassword: '',
          }}
          validationSchema={LogInSchema}
          onSubmit={signIn}
        >
          {(formik) => (
            <Form className="flex flex-col mx-auto">
              <div className="flex flex-col mx-auto">
                <label htmlFor="email" className="text-sm pb-1 mt-5">
                  Email
                </label>
                <Field
                  name="email"
                  className="focus:border-2 border-[1px] rounded-lg p-3 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
                  placeholder="Email"
                />

                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>
              <div className="flex flex-col mx-auto">
                <label htmlFor="loginPassword" className="text-sm pb-1 mt-5">
                  Password
                </label>

                <div className="input-container relative">
                  <Field
                    name="loginPassword"
                    className="focus:border-2 border-[1px] rounded-lg p-3 sm:w-[30rem] w-80 bg-transparent border-[#2b2b39] focus:outline-none"
                    placeholder="Enter password"
                    type={showPassword}
                  />
                  <span
                    className="absolute top-[33%] right-[3%]"
                    onClick={togglePassword}
                    style={{ cursor: 'pointer' }}
                  >
                    {eyeIcon}
                  </span>
                </div>
                <ErrorMessage
                  name="loginPassword"
                  component="div"
                  className="text-red-700 text-sm"
                />
              </div>

              <button
                disabled={!formik.isValid || !formik.dirty || isButtonDisabled}
                type="submit"
                className="bg-[#74c116] text-[#ffffff] text-md font-light px-10 py-2 bg-custom-blue sm:w-[30rem] w-80 mx-auto rounded-lg mt-5 disabled:opacity-50 transition-all duration-300"
              >
                Log In
              </button>
              <p className="mx-auto mt-2">
                Don't have an account?{' '}
                <Link to="/register" className="text-[#74c116]">
                  Sign Up
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

export default LogIn;
