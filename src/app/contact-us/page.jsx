"use client";

import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactForm = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_3u9xqsp", "template_68bm8b7", form.current, "VjsqiX_cv5ApJllNl") // Use public key directly here
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
   <div className="mt-6">
      <h2 className="text-2xl font-bold text-center">Contact Us</h2>
     <div className="max-w-lg my-10 dark:bg-[#0F0F0F] border mx-auto p-6 bg-white shadow-md rounded-lg">
      <form ref={form} onSubmit={sendEmail}>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-[#eee] mb-1"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="user_name"
            required
            className="w-full px-4 py-2 border-[2px] border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Your Name"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-[#eee] mb-1"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="user_email"
            required
            className="w-full px-4 py-2 border-[2px] border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Your Email"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-[#eee] mb-1"
            htmlFor="message"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows="4"
            className="w-full px-4 py-2 border-[2px] border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Your Message"
          ></textarea>
        </div>

        <input
          type="submit"
          value={"Send"}
          className="w-full py-2 px-4 bg-blue-600 dark:border cursor-pointer dark:hover:bg-[#222222] text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        />
      </form>
    </div>
   </div>
  );
};

export default ContactForm;
