import React, { useState } from "react";
import { motion } from "framer-motion";
import SemesterSummary from "./resultInfo/SemesterSummary";
import DashboardSkeleton from "./DashboardSkeleton";
import Profile from "./profile/Profile";
import CgpaChart from "./CgpaChart";
import GenerateSemesterReport from "../reports/GenerateSemesterReport";

const ProfileAndSummary = ({
  profile,
  averageCgpa,
  totalCreditsCompleted,
  totalSemestersCompleted,
  results,
  loading,
  isResultsLoading,
  retake,
  retakeCourses,
}) => {
  const [expandedSemester, setExpandedSemester] = useState(null);

  const toggleSemesterDetails = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };

  // Show skeleton only if we're still loading and have no data at all
  if (loading && !profile && results.length === 0) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Academic Dashboard</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">Track your academic progress and performance</p>
        </motion.div>

        <div className="space-y-4 sm:space-y-6">
          {/* Summary Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
          >
            <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-sm p-4 sm:p-6 text-white">
              <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Current CGPA</h3>
              {isResultsLoading && !averageCgpa ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-indigo-400 rounded w-16"></div>
                </div>
              ) : (
                <p className="text-2xl sm:text-3xl font-bold">{averageCgpa}</p>
              )}
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm p-4 sm:p-6 text-white">
              <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Credits Completed</h3>
              {isResultsLoading && !totalCreditsCompleted ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-purple-400 rounded w-16"></div>
                </div>
              ) : (
                <>
                  <p className="text-2xl sm:text-3xl font-bold">{totalCreditsCompleted || 0}</p>
                  {retake && (
                    <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-purple-100">Retake Courses: {retakeCourses}</p>
                  )}
                </>
              )}
            </div>
            <div className="bg-gradient-to-br from-pink-500 to-pink-600 rounded-xl shadow-sm p-4 sm:p-6 text-white">
              <h3 className="text-base sm:text-lg font-medium mb-1 sm:mb-2">Semesters</h3>
              {isResultsLoading && !totalSemestersCompleted ? (
                <div className="animate-pulse">
                  <div className="h-8 bg-pink-400 rounded w-16"></div>
                </div>
              ) : (
                <p className="text-2xl sm:text-3xl font-bold">{totalSemestersCompleted || 0}</p>
              )}
            </div>
          </motion.div>

          {/* Profile and CGPA Chart Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 lg:grid-cols-6 gap-3 sm:gap-4"
          >
            <div className="bg-white rounded-xl shadow-sm overflow-hidden lg:col-span-2">
              <Profile profile={profile} />
            </div>
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:col-span-4">
              {isResultsLoading && results.length === 0 ? (
                <div className="animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-32 mb-4"></div>
                  <div className="h-64 bg-gray-200 rounded"></div>
                </div>
              ) : (
                <CgpaChart results={results} />
              )}
            </div>
          </motion.div>

          {/* Semester Details Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Semester Details</h2>
                  <p className="mt-1 text-xs sm:text-sm text-gray-600">Detailed breakdown of your academic performance</p>
                </div>
                <GenerateSemesterReport results={results} retakenCourses={retake ? retakeCourses : []} />
              </div>
            </div>
            {isResultsLoading && results.length === 0 ? (
              <div className="p-4 sm:p-6">
                <div className="animate-pulse space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border border-gray-200 rounded-lg p-4">
                      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <SemesterSummary
                retake={retake}
                results={results}
                toggleSemesterDetails={toggleSemesterDetails}
                expandedSemester={expandedSemester}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfileAndSummary;


 