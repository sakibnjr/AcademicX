import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaExclamationTriangle, FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Animated Warning Icon */}
      <motion.div
        className="mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <FaExclamationTriangle className="text-red-600 text-8xl animate-bounce" />
      </motion.div>

      {/* Animated Text */}
      <motion.h1
        className="text-7xl font-bold text-gray-800 mb-4"
        initial={{ x: "-100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        404
      </motion.h1>
      <motion.p
        className="text-2xl text-gray-700 mb-8 text-center"
        initial={{ x: "100vw" }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 70 }}
      >
        Uh-oh! You seem to have lost your way. <br />
        This page doesn't exist.
      </motion.p>

      {/* Animated Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 120 }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          <FaHome className="text-lg" />
          Go Back to Home
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default NotFoundPage;
