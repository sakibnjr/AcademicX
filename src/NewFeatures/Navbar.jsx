import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ profile, resetResults }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Checks if a path is active
  const isActive = (path) => location.pathname === path;

  // Classes for active and inactive links
  const activeClass = "text-white bg-blue-600"; // Active link style
  const inactiveClass = "text-gray-700 hover:text-blue-600"; // Inactive link style

  // Close menu function
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="navbar bg-base-100 shadow-lg rounded-xl mt-2">
      {/* Left Side - Logo */}
      <div className="navbar-start flex items-center">
        <Link to="/" className="text-xl flex items-center">
          Academic
          <span className="italic text-4xl relative -left-1">X</span>
        </Link>
      </div>

      {/* Center Menu for Larger Screens */}
      <div
        className={
          profile ? "navbar-center hidden lg:flex" : "navbar-end hidden lg:flex"
        }
      >
        <ul className="menu menu-horizontal p-0 space-x-6">
          <li>
            <Link
              to="/"
              className={isActive("/") ? activeClass : inactiveClass}
            >
              {profile ? "Dashboard" : "Home"}
            </Link>
          </li>
          {profile && (
            <>
              <li>
                <Link
                  to="/filter"
                  className={isActive("/filter") ? activeClass : inactiveClass}
                >
                  Filter
                </Link>
              </li>
              <li>
                <Link
                  to="/compare"
                  className={isActive("/compare") ? activeClass : inactiveClass}
                >
                  Compare
                </Link>
              </li>
            </>
          )}
          <li>
            <Link
              to="/contact"
              className={isActive("/contact") ? activeClass : inactiveClass}
            >
              Contact
            </Link>
          </li>
          <li>
            <Link
              to="/faq"
              className={isActive("/faq") ? activeClass : inactiveClass}
            >
              FAQ
            </Link>
          </li>
        </ul>
      </div>

      {/* Right Side - Log Out Button */}
      {profile && (
        <div className="navbar-end flex items-center space-x-4">
          <button
            onClick={resetResults}
            className="btn btn-error btn-outline btn-sm md:btn-md"
          >
            Log Out
          </button>
        </div>
      )}

      {/* Mobile Hamburger Menu */}
      <div className="navbar-end lg:hidden">
        <button
          className="btn btn-ghost"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaBars className="text-3xl" />
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="lg:hidden flex items-center justify-center w-screen h-screen fixed top-0 left-0 bg-base-100 z-50">
          <div className="flex flex-col items-center justify-center w-full h-full bg-white rounded-lg shadow-lg p-4">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="self-center text-gray-700 mb-4"
            >
              <FaTimes className="text-2xl" />
            </button>

            <ul className="menu p-2 space-y-6 w-full">
              <li>
                <Link
                  to="/"
                  className={isActive("/") ? activeClass : inactiveClass}
                  onClick={handleLinkClick}
                >
                  {profile ? "Dashboard" : "Home"}
                </Link>
              </li>
              {profile && (
                <>
                  <li>
                    <Link
                      to="/filter"
                      className={
                        isActive("/filter") ? activeClass : inactiveClass
                      }
                      onClick={handleLinkClick}
                    >
                      Filter
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/compare"
                      className={
                        isActive("/compare") ? activeClass : inactiveClass
                      }
                      onClick={handleLinkClick}
                    >
                      Compare
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link
                  to="/contact"
                  className={isActive("/contact") ? activeClass : inactiveClass}
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/faq"
                  className={isActive("/faq") ? activeClass : inactiveClass}
                  onClick={handleLinkClick}
                >
                  FAQ
                </Link>
              </li>
              {profile && (
                <li>
                  <button
                    onClick={() => {
                      resetResults();
                      handleLinkClick();
                    }}
                    className="btn btn-error"
                  >
                    Log Out
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
