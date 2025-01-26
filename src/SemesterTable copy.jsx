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
    const courseHighestPoints = new Map(); // Track highest pointEquivalent for each course
    const retakeIndices = new Set(); // Track semesters with retakes
    const updatedRetakenCourses = []; // To store retaken courses per semester

    const updatedResults = results.map((semester, semesterIndex) => {
      let filteredCourses = semester.data;
      let retakenInThisSemester = []; // List of retaken courses in this semester

      // Update courseHighestPoints to reflect the highest `pointEquivalent` for each course
      semester.data.forEach((course) => {
        if (
          courseHighestPoints.has(course.courseTitle) &&
          course.pointEquivalent > courseHighestPoints.get(course.courseTitle)
        ) {
          courseHighestPoints.set(course.courseTitle, course.pointEquivalent);
        } else if (!courseHighestPoints.has(course.courseTitle)) {
          courseHighestPoints.set(course.courseTitle, course.pointEquivalent);
        }
      });

      if (!includeRetakes) {
        // Exclude retaken courses if toggled off
        filteredCourses = semester.data.filter((course) => {
          if (courseHighestPoints.has(course.courseTitle)) {
            const highestPoint = courseHighestPoints.get(course.courseTitle);
            if (course.pointEquivalent < highestPoint) {
              // Course is a retake; exclude it
              retakeIndices.add(semesterIndex);
              retakenInThisSemester.push(course.courseTitle);
              return false;
            }
          }
          return true; // Keep the course
        });
      } else {
        // Identify retake semesters and use the highest `pointEquivalent`
        semester.data.forEach((course) => {
          if (courseHighestPoints.has(course.courseTitle)) {
            const highestPoint = courseHighestPoints.get(course.courseTitle);
            if (course.pointEquivalent < highestPoint) {
              retakeIndices.add(semesterIndex);
              retakenInThisSemester.push(course.courseTitle);
            }
          }
        });
      }

      // Store retaken courses per semester
      updatedRetakenCourses.push(retakenInThisSemester);

      // Calculate SGPA using the highest `pointEquivalent`
      const totalCredits = filteredCourses.reduce(
        (sum, course) => sum + course.totalCredit,
        0,
      );
      const totalPoints = filteredCourses.reduce(
        (sum, course) =>
          sum +
          course.totalCredit * courseHighestPoints.get(course.courseTitle),
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
