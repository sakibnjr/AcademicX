import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaHome, FaFilter, FaChartLine, FaQuestionCircle, FaComments } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = ({ profile, resetResults }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Checks if a path is active
  const isActive = (path) => location.pathname === path;

  // Classes for active and inactive links
  const activeClass = "text-white bg-primary"; // Active link style
  const inactiveClass = "text-gray-700 hover:text-primary"; // Inactive link style

  // Close menu function
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center space-x-2">
              <img
                src="/academicx.svg"
                alt="Academicx"
                className="h-8 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-1">
            <Link
              to="/"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                isActive("/")
                  ? "text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <FaHome className="h-4 w-4" />
              <span>{profile ? "Dashboard" : "Home"}</span>
            </Link>
            
            {profile && (
              <>
                <Link
                  to="/filter"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive("/filter")
                      ? "text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <FaFilter className="h-4 w-4" />
                  <span>Filter</span>
                </Link>
                <Link
                  to="/compare"
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                    isActive("/compare")
                      ? "text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <FaChartLine className="h-4 w-4" />
                  <span>Compare</span>
                </Link>
              </>
            )}
            
            <Link
              to="/contact"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                isActive("/contact")
                  ? "text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <FaComments className="h-4 w-4" />
              <span>Contact</span>
            </Link>
            
            <Link
              to="/faq"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
                isActive("/faq")
                  ? "text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                  : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
              }`}
            >
              <FaQuestionCircle className="h-4 w-4" />
              <span>FAQ</span>
            </Link>

            {profile && (
              <button
                onClick={resetResults}
                className="ml-4 px-4 py-2 rounded-lg text-sm font-medium text-red-600 border border-red-200 hover:bg-red-50 transition-all duration-200 flex items-center space-x-2"
              >
                <FaTimes className="h-4 w-4" />
                <span>Log Out</span>
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 transition-all duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg rounded-b-lg border-t border-blue-100">
              <Link
                to="/"
                className={`block px-4 py-3 rounded-lg text-base font-medium flex items-center space-x-2 ${
                  isActive("/")
                    ? "text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={handleLinkClick}
              >
                <FaHome className="h-5 w-5" />
                <span>{profile ? "Dashboard" : "Home"}</span>
              </Link>

              {profile && (
                <>
                  <Link
                    to="/filter"
                    className={`block px-4 py-3 rounded-lg text-base font-medium flex items-center space-x-2 ${
                      isActive("/filter")
                        ? "text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <FaFilter className="h-5 w-5" />
                    <span>Filter</span>
                  </Link>
                  <Link
                    to="/compare"
                    className={`block px-4 py-3 rounded-lg text-base font-medium flex items-center space-x-2 ${
                      isActive("/compare")
                        ? "text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                    }`}
                    onClick={handleLinkClick}
                  >
                    <FaChartLine className="h-5 w-5" />
                    <span>Compare</span>
                  </Link>
                </>
              )}

              <Link
                to="/contact"
                className={`block px-4 py-3 rounded-lg text-base font-medium flex items-center space-x-2 ${
                  isActive("/contact")
                    ? "text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={handleLinkClick}
              >
                <FaComments className="h-5 w-5" />
                <span>Contact</span>
              </Link>

              <Link
                to="/faq"
                className={`block px-4 py-3 rounded-lg text-base font-medium flex items-center space-x-2 ${
                  isActive("/faq")
                    ? "text-white bg-gradient-to-r from-sky-500 to-blue-500 shadow-md"
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`}
                onClick={handleLinkClick}
              >
                <FaQuestionCircle className="h-5 w-5" />
                <span>FAQ</span>
              </Link>

              {profile && (
                <button
                  onClick={() => {
                    resetResults();
                    handleLinkClick();
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-red-600 hover:bg-red-50 flex items-center space-x-2"
                >
                  <FaTimes className="h-5 w-5" />
                  <span>Log Out</span>
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
