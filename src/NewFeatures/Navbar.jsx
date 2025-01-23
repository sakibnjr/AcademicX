import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

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
    <div className="navbar mt-2 rounded-xl bg-base-100">
      {/* Left Side - Logo */}
      <div className="navbar-start flex items-center">
        <Link to="/" className="flex items-center text-xl">
          Academic
          <span className="relative -left-1 text-4xl italic">X</span>
        </Link>
      </div>

      {/* Center Menu for Larger Screens */}
      <div
        className={
          profile ? "navbar-center hidden lg:flex" : "navbar-end hidden lg:flex"
        }
      >
        <ul className="menu menu-horizontal space-x-6 p-0">
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
            className="btn btn-outline btn-error btn-sm md:btn-md"
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
        <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-base-100 lg:hidden">
          <div className="flex h-full w-full flex-col items-center justify-center rounded-lg bg-white p-4 shadow-lg">
            {/* Close Button */}
            <button
              onClick={() => setIsMenuOpen(false)}
              className="mb-4 self-center text-gray-700"
            >
              <FaTimes className="text-2xl" />
            </button>

            <ul className="menu w-full space-y-6 p-2">
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
