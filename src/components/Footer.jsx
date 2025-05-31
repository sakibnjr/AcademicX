import React from "react";
import { FaGithub, FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black text-white -mt-1">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
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
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              Contact
            </Link>
            <Link
              to="/faq"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              FAQ
            </Link>
            <a
              href="https://github.com/sakibnjr/AcademicX"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-400 hover:text-white transition-colors duration-200"
            >
              <FaGithub className="h-5 w-5" />
            </a>
          </div>

          {/* Right Section - Made with love */}
          <div className="flex items-center text-gray-400 text-sm">
            Made with
            <FaHeart className="mx-1 text-red-500 animate-pulse" />
            by<a href="https://www.sakibnjr.site/" target="_blank"
              rel="noopener noreferrer" className="pl-1">SakibNjr</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
