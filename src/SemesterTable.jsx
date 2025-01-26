import React, { useState, useEffect } from "react";
import { GoAlert } from "react-icons/go";
import SemesterDetails from "./SemesterDetails";
import { motion } from "framer-motion";

const SemesterTable = ({
  results,
  toggleSemesterDetails,
  expandedSemester,
}) => {
  const [includeRetakes, setIncludeRetakes] = useState(true); // Toggle state for including retakes
  const [processedResults, setProcessedResults] = useState([]);
  const [retakeSemesters, setRetakeSemesters] = useState([]);
  const [retakenCourses, setRetakenCourses] = useState([]); // State for retaken courses

  // Function to process results based on retake inclusion
  const processResults = () => {
    const courseTracker = new Map(); // Track courses and their first occurrence
    const retakeIndices = new Set(); // Track semesters with retakes
    const updatedRetakenCourses = []; // To store retaken courses per semester
    const updatedResults = results.map((semester, semesterIndex) => {
      let filteredCourses = semester.data;
      let retakenInThisSemester = []; // List of retaken courses in this semester

      if (!includeRetakes) {
        // Exclude retaken courses if toggled off
        filteredCourses = semester.data.filter((course) => {
          if (courseTracker.has(course.courseTitle)) {
            retakeIndices.add(semesterIndex); // Mark semester as having retakes
            retakenInThisSemester.push(course.courseTitle); // Track retaken courses
            return false; // Exclude this course
          }
          courseTracker.set(course.courseTitle, semester.semesterName);
          return true; // Keep the course
        });
      } else {
        // Identify retake semesters
        semester.data.forEach((course) => {
          if (courseTracker.has(course.courseTitle)) {
            retakeIndices.add(semesterIndex); // Mark semester as having retakes
            retakenInThisSemester.push(course.courseTitle); // Track retaken courses
          } else {
            courseTracker.set(course.courseTitle, semester.semesterName);
          }
        });
      }

      // Store retaken courses per semester
      updatedRetakenCourses.push(retakenInThisSemester);

      // Calculate SGPA and other values based on filtered courses
      const totalCredits = filteredCourses.reduce(
        (sum, course) => sum + course.totalCredit,
        0,
      );
      const totalPoints = filteredCourses.reduce(
        (sum, course) => sum + course.totalCredit * course.pointEquivalent,
        0,
      );
      const sgpa =
        totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "N/A";

      return {
        ...semester,
        data: filteredCourses,
        totalCredits,
        sgpa,
        totalCourses: filteredCourses.length,
      };
    });

    // Update states
    setProcessedResults(updatedResults);
    setRetakeSemesters(Array.from(retakeIndices));
    setRetakenCourses(updatedRetakenCourses);
  };

  // Reprocess results whenever results or toggle state changes
  useEffect(() => {
    processResults();
  }, [results, includeRetakes]);

  return (
    <div>
      {/* Toggle Button */}
      <div className="mb-6 flex items-center justify-center">
        <button
          className={`rounded-md px-4 py-2 shadow-md ${
            includeRetakes
              ? "bg-green-500 text-white"
              : "bg-gray-300 text-black"
          }`}
          onClick={() => setIncludeRetakes((prev) => !prev)}
        >
          {includeRetakes ? "Show Without Retakes" : "Show With Retakes"}
        </button>
      </div>

      {/* Table Section */}
      {Array.isArray(processedResults) && processedResults.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 rounded-lg bg-white shadow-lg">
            {/* Table Header */}
            <thead className="sticky top-0 bg-blue-500 text-white">
              <tr>
                <th className="p-4 text-left text-sm font-semibold tracking-wide">
                  Semester
                </th>
                <th className="p-4 text-left text-sm font-semibold tracking-wide">
                  SGPA
                </th>
                <th className="p-4 text-left text-sm font-semibold tracking-wide">
                  Total Credits
                </th>
                <th className="p-4 text-left text-sm font-semibold tracking-wide">
                  Total Courses Taken
                </th>
                <th className="p-4 text-left text-sm font-semibold tracking-wide">
                  Retake Indicator
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="divide-y divide-gray-200">
              {processedResults.map((semester, index) => {
                const isRetakeSemester = retakeSemesters.includes(index);

                return (
                  <React.Fragment key={index}>
                    {/* Main Row */}
                    <tr
                      className={`cursor-pointer transition duration-300 ${
                        expandedSemester === index
                          ? "bg-blue-100 hover:bg-blue-200"
                          : isRetakeSemester
                            ? "bg-red-50 hover:bg-red-100"
                            : "hover:bg-gray-100"
                      }`}
                      onClick={() => toggleSemesterDetails(index)}
                      title={
                        isRetakeSemester
                          ? "This semester contains retaken courses."
                          : "No retake courses in this semester."
                      }
                    >
                      <td className="p-4">{semester.semesterName}</td>
                      <td className="p-4">{semester.sgpa}</td>
                      <td className="p-4">{semester.totalCredits}</td>
                      <td className="p-4">{semester.totalCourses}</td>
                      <td className="p-4 text-center">
                        {isRetakeSemester && (
                          <GoAlert
                            className="text-yellow-600"
                            title="Retake courses detected."
                          />
                        )}
                      </td>
                    </tr>

                    {/* Expandable Details Row */}
                    {expandedSemester === index && (
                      <tr>
                        <td colSpan={5} className="bg-gray-50 p-4">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <SemesterDetails
                              semester={semester}
                              includeRetakes={includeRetakes}
                              retakenCourses={retakenCourses[index] || []} // Pass retaken courses
                            />
                          </motion.div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="mt-4 text-center text-gray-500">
          No results available.
        </div>
      )}
    </div>
  );
};

export default SemesterTable;
