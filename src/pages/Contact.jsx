import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { MdOutlineReportProblem } from "react-icons/md";
import emailjs from "emailjs-com";

const ContactPage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !message) {
      toast.error("Please fill out all fields!", {
        position: "top-center",
      });
      return;
    }

    const emailParams = {
      to_email: "test@mail.com",
      from_name: name,
      message: message,
    };

    emailjs
      .send(
        "", // Replace with your EmailJS service ID
        "", // Replace with your EmailJS template ID
        emailParams,
        "", // Replace with your EmailJS user ID
      )
      .then(
        () => {
          toast.success("Feedback sent successfully!", {
            position: "top-center",
          });
          setName("");
          setMessage("");
        },
        (error) => {
          toast.error("Failed to send feedback. Please try again.", {
            position: "top-center",
          });
          console.error("EmailJS Error:", error);
        },
      );
  };

  return (
    <div className="mx-auto w-4/5 px-4 py-12 sm:px-6">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white"
      >
        <div className="mb-8 text-center">
          <h1 className="mt-4 text-2xl font-semibold text-gray-900">
            Get in Touch
          </h1>
          <p className="mt-2 text-gray-600">We’d love to hear your feedback.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
              rows="4"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Send Feedback
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;
