import React from "react";
import { Link } from "react-router-dom";

const SidebarMenu = () => {
  return (
    <div className="absolute z-50 w-64 h-full bg-gray-800 text-gray-300 p-5">
      {/* Sidebar Header */}
      <div className="text-2xl font-semibold mb-6 text-center text-white">
        <span>Student Dashboard</span>
      </div>

      {/* Menu Items */}
      <ul className="space-y-4">
        <li>
          <Link
            to="/overview"
            className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Overview
          </Link>
        </li>
        <li>
          <Link
            to="/filter"
            className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Filter
          </Link>
        </li>
        <li>
          <Link
            to="/compare"
            className="block px-4 py-2 rounded-md hover:bg-gray-700 hover:text-white transition duration-300"
          >
            Compare
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SidebarMenu;
