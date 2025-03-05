import React from "react";
import { FaGithub, FaExclamationCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mx-auto flex w-4/5 justify-center rounded-md bg-text p-4 text-white">
      <div className="flex flex-col">
        <div className="my-2 grid grid-cols-1 gap-2">
          <Link to="/contact">
            <button className="btn btn-outline btn-error btn-sm">
              <FaExclamationCircle className="mr-2" />
              Report Issues
            </button>
          </Link>
          {/* <button className="btn btn-outline btn-neutral btn-sm hidden text-white">
            <FaGithub className="mr-2" />
            Source Code
          </button> */}
        </div>
        <p className="text-sm tracking-wide">
          AcademicX v1.0 &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
