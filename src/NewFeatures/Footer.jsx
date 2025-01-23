import React from "react";
import { FaGithub, FaCoffee, FaExclamationCircle } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-text mx-auto flex w-4/5 justify-center rounded-md p-4 text-white">
      {/* Copyright and Buttons Section */}
      <div className="flex flex-col">
        <p className="text-sm">
          Copyright © 2025 - All rights reserved by AcademicX
        </p>

        <div className="my-2 grid grid-cols-1 gap-2 md:grid-cols-2">
          <button className="btn btn-outline btn-error btn-sm">
            <FaExclamationCircle className="mr-2" />
            Report Issues
          </button>
          <button className="btn btn-outline btn-neutral btn-sm text-white">
            <FaGithub className="mr-2" />
            Source Code
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
