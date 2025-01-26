// src/Maintenance.js
import React from "react";
import { motion } from "framer-motion";

const Maintenance = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-900 to-purple-800 p-4">
      <motion.div
        className="w-full max-w-2xl rounded-2xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="space-y-6">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="mx-auto w-fit rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 p-2">
              <svg
                className="h-16 w-16 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h1 className="mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-center text-4xl font-extrabold text-transparent md:text-5xl">
              Maintenance in Progress
            </h1>
            <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-gray-200">
              We're giving our platform a quick tune-up to serve you better.
              <br className="hidden md:block" />
              Please check back soon. We appreciate your patience!
            </p>
          </motion.div>

          <motion.div
            className="flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6, type: "spring" }}
          >
            <div className="relative mt-8 h-24 w-24">
              <motion.div
                className="absolute h-full w-full rounded-full border-4 border-cyan-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute h-full w-full rounded-full border-4 border-transparent border-t-cyan-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </motion.div>

          <motion.div
            className="mt-8 text-center text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p>Follow us for updates:</p>
            <div className="mt-2 flex justify-center space-x-4">
              <a href="#" className="transition-colors hover:text-cyan-400">
                Twitter
              </a>
              <a href="#" className="transition-colors hover:text-cyan-400">
                LinkedIn
              </a>
              <a href="#" className="transition-colors hover:text-cyan-400">
                Blog
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Maintenance;
