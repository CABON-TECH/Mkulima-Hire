// import React, { useRef } from "react";
// import emailjs from "@emailjs/browser";

import { Button } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function Contact() {
  // const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
  };
  return (
    <div className="">
      <Navbar />
      <p className="sm:px-20 py-5 text-center text-[#74c116] font-bold text text-4xl tracking-tighter">
        Get In Touch With Us
      </p>
      <p className="text-left sm:text-center pl-10 font-semibold">
        Please send me a message about enquiries.
      </p>

      <div className="px-10 py-5">
        <form
          // ref={form}
          onSubmit={sendEmail}
        >
          <div className="mb-6">
            <label htmlFor="name" className=" block mb-2 text-sm font-medium">
              Your name
            </label>
            <input
              type="name"
              id="name"
              placeholder="Name"
              className=" bg-gray-50 border rounded-lg border-gray-300 text-sm rounded-l block w-full p-2.5"
              required
              spellCheck="false"
              name="user_name"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email" className=" block mb-2 text-sm font-medium">
              Your email
            </label>
            <input
              type="email"
              id="email"
              className=" bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5 "
              placeholder="Email address"
              required
              spellCheck="false"
              name="user_email"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="password"
              className=" block mb-2 text-sm font-medium"
            >
              Message Title
            </label>
            <input
              type="name"
              id="password"
              placeholder="Subject of Message"
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              required
              name="user_email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="email" className=" block mb-2 text-sm font-medium">
              Message body
            </label>
            <textarea
              className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
              placeholder="More about message"
              required
              name="message"
            />
          </div>

          <Button
            sx={{
              color: "#ffff",
              background: "#74c116",
              px: 2,
              py: 1,
              "&:hover": {
                backgroundColor: "#74c116",
              },
            }}
          >
            Submit
          </Button>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Contact;
