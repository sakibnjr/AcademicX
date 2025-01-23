import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";
import { AiOutlineMail } from "react-icons/ai";
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

    // EmailJS parameters
    const emailParams = {
      to_email: "test@mail.com", // The recipient email
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
    <div className="mx-auto my-auto flex w-4/5 items-center justify-center">
      <Toaster />
      <motion.div
        className="w-full rounded-lg bg-white p-6 shadow-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-6 text-center">
          <AiOutlineMail size={48} className="mx-auto text-blue-500" />
          <h1 className="text-2xl font-semibold text-gray-800">Contact Us</h1>
          <p className="mt-2 text-gray-500">
            We would love to hear your feedback!
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
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
              placeholder="Write your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-4 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              rows="4"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full rounded-md bg-blue-500 px-4 py-2 font-medium text-white shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Send Feedback
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default ContactPage;
