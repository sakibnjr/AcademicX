import React from "react";
import { FaGithub, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="-mt-1 bg-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          {/* Left Section - Copyright */}
          <div className="flex items-center space-x-2 text-gray-400">
            <span>AcademicX</span>
            <span className="text-gray-600">•</span>
            <span>&copy; {new Date().getFullYear()}</span>
          </div>

          {/* Center Section - Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/contact"
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              Contact
            </Link>
            <Link
              to="/faq"
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              FAQ
            </Link>
            <a
              href="https://github.com/sakibnjr/AcademicX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>

          {/* Right Section - Made with love */}
          <div className="flex items-center text-sm text-gray-400">
            Made with
            <FaHeart className="mx-1 animate-pulse text-red-500" />
            by
            <a
              href="https://www.sakibnjr.site/"
              target="_blank"
              rel="noopener noreferrer"
              className="pl-1"
            >
              SakibNjr
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
