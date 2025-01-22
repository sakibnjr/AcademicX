import React from "react";
import { FaGithub, FaCoffee, FaExclamationCircle } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-4/5 mx-auto p-10 mt-4 bg-gray-800 text-gray-300 flex justify-center rounded-md">
      {/* Copyright and Buttons Section */}
      <div className="flex flex-col">
        <p className="text-sm">
          Copyright © 2025 - All rights reserved by AcademicX
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 my-4">
          <button className="btn btn-outline btn-error btn-sm">
            <FaExclamationCircle className="mr-2" />
            Report Issues
          </button>
          <button className="btn btn-outline btn-accent btn-sm">
            <FaGithub className="mr-2" />
            Source Code
          </button>
        </div>

        <button className="btn bg-white text-black rounded-lg px-4 py-1">
          <FaCoffee className="mr-2" />
          Buy me a Coffee
        </button>
      </div>
    </footer>
  );
};

export default Footer;
