import React, { useState, useEffect, useMemo } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { motion } from "framer-motion";
import SemesterDetails from "./SemesterDetails";

const SemesterSummary = React.memo(
  ({ retake, results, toggleSemesterDetails, expandedSemester }) => {
    const [includeRetakes, setIncludeRetakes] = useState(true);

    // Process results with memoization
    const { processedResults, retakeSemesters, retakenCourses } = useMemo(() => {
      if (!results?.length)
        return {
          processedResults: [],
          retakeSemesters: [],
          retakenCourses: [],
        };

      const courseHighestPoints = new Map();
      const courseTracker = new Map();
      const retakeIndices = new Set();
      const updatedRetakenCourses = [];

      const processed = results.map((semester, semesterIndex) => {
        const retakenInThisSemester = [];
        let filteredCourses = semester.data;

        // Pre-calculate highest points
        semester.data.forEach((course) => {
          const currentMax = courseHighestPoints.get(course.courseTitle);
          if (!currentMax || course.pointEquivalent > currentMax) {
            courseHighestPoints.set(course.courseTitle, course.pointEquivalent);
          }
        });

        // Filter courses based on retake toggle
        if (!includeRetakes) {
          filteredCourses = semester.data.filter((course) => {
            if (courseTracker.has(course.courseTitle)) {
              retakeIndices.add(semesterIndex);
              retakenInThisSemester.push(course.courseTitle);
              return false;
            }
            courseTracker.set(course.courseTitle, semester.semesterName);
            return true;
          });
        } else {
          semester.data.forEach((course) => {
            if (courseTracker.has(course.courseTitle)) {
              retakeIndices.add(semesterIndex);
              retakenInThisSemester.push(course.courseTitle);
            } else {
              courseTracker.set(course.courseTitle, semester.semesterName);
            }
          });
        }

        updatedRetakenCourses.push(retakenInThisSemester);

        // Calculate metrics once
        const metrics = filteredCourses.reduce(
          (acc, course) => ({
            totalCredits: acc.totalCredits + course.totalCredit,
            totalPoints:
              acc.totalPoints + course.totalCredit * course.pointEquivalent,
            totalCourses: acc.totalCourses + 1,
          }),
          { totalCredits: 0, totalPoints: 0, totalCourses: 0 }
        );

        return {
          ...semester,
          data: filteredCourses,
          totalCredits: metrics.totalCredits,
          sgpa:
            metrics.totalCredits > 0
              ? (metrics.totalPoints / metrics.totalCredits).toFixed(2)
              : "N/A",
          totalCourses: metrics.totalCourses,
        };
      });

      return {
        processedResults: processed,
        retakeSemesters: Array.from(retakeIndices),
        retakenCourses: updatedRetakenCourses,
      };
    }, [results, includeRetakes]);

    // Only update when necessary
    useEffect(() => {
      if (!results) return;
    }, [results]);

    // Early return for empty results
    if (!processedResults.length) {
      return (
        <div className="flex items-center justify-center p-8">
          <p className="text-gray-500">No results available.</p>
        </div>
      );
    }

    return (
      <div className="p-4 sm:p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600">
            <FaCircleInfo className="text-indigo-500" />
            <p className="text-sm">
              Click a row for details • Toggle retakes with button
            </p>
          </div>

          {retake && (
            <button
              className={`inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                includeRetakes
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setIncludeRetakes((prev) => !prev)}
            >
              {includeRetakes ? "Showing Retakes" : "Retakes Hidden"}
            </button>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                {["Semester", "SGPA", "Credits", "Courses"].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {processedResults.map((semester, index) => {
                const isRetakeSemester = retakeSemesters.includes(index);

                return (
                  <React.Fragment key={semester.semesterName}>
                    <tr
                      className={`cursor-pointer transition-colors ${
                        expandedSemester === index
                          ? "bg-indigo-50 hover:bg-indigo-100"
                          : isRetakeSemester
                          ? "bg-rose-50 hover:bg-rose-100"
                          : "hover:bg-gray-50"
                      }`}
                      onClick={() => toggleSemesterDetails(index)}
                      title={
                        isRetakeSemester
                          ? "Contains retaken courses"
                          : "No retakes"
                      }
                    >
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {semester.semesterName}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          semester.sgpa >= 3.75 ? 'bg-green-100 text-green-800' :
                          semester.sgpa >= 3.50 ? 'bg-blue-100 text-blue-800' :
                          semester.sgpa >= 3.25 ? 'bg-indigo-100 text-indigo-800' :
                          semester.sgpa >= 3.00 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {semester.sgpa}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {semester.totalCredits}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {semester.totalCourses}
                      </td>
                    </tr>

                    {expandedSemester === index && (
                      <tr>
                        <td colSpan={4} className="bg-gray-50 p-0">
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <SemesterDetails
                              semester={semester}
                              retakenCourses={retakenCourses[index] || []}
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
      </div>
    );
  }
);

export default SemesterSummary;
