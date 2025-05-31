import React from "react";
import { motion } from "framer-motion";

const Profile = ({ profile }) => {
  // Function to detect gender from name (this is a simple heuristic)
  const detectGender = (name) => {
    if (!name) return 'male'; // Default to male if name is not available
    
    // Common female name endings in Bengali/English
    const femaleEndings = ['a', 'i', 'y', 'ee', 'ah', 'ia'];
    const lastName = name.split(' ').pop().toLowerCase();
    
    // Check if the name ends with common female endings
    return femaleEndings.some(ending => lastName.endsWith(ending)) ? 'female' : 'male';
  };

  // If profile is not available, show a loading state
  if (!profile) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center p-6 h-full"
      >
        <div className="relative">
          <div className="h-32 w-32 rounded-full bg-gray-200 animate-pulse" />
        </div>
        <div className="mt-6 space-y-3 text-center">
          <div className="h-6 w-48 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse" />
          <div className="h-8 w-40 bg-gray-200 rounded-full animate-pulse" />
        </div>
      </motion.div>
    );
  }

  // Get the gender for the avatar
  const avatarGender = detectGender(profile.studentName);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center p-6 h-full"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="relative"
        >
          <img
            src={`https://avatar.iran.liara.run/public?name=${profile.studentName || 'User'}&gender=${avatarGender}&size=500`}
            alt="Avatar"
            className="h-32 w-32 rounded-full object-cover ring-4 ring-indigo-500/20"
          />
          <div className="absolute -bottom-2 -right-2 rounded-full bg-indigo-500 p-2 text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-6 space-y-3 text-center">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-900"
        >
          {profile.studentName || 'Student Name'}
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-sm text-gray-500"
        >
          {profile.studentId || 'Student ID'}
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="inline-flex items-center rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700"
        >
          <span>{profile.deptShortName || 'Department'}</span>
          <span className="mx-2 text-indigo-300">•</span>
          <span>Batch {profile.batchNo || 'N/A'}</span>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Profile;
