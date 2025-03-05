import React, { useState, useEffect, useMemo } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { motion } from "framer-motion";
import SemesterDetails from "./SemesterDetails";

const SemesterSummary = React.memo(
  ({ retake, results, toggleSemesterDetails, expandedSemester }) => {
    const [includeRetakes, setIncludeRetakes] = useState(true);

    // Process results with memoization
    const { processedResults, retakeSemesters, retakenCourses } =
      useMemo(() => {
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
              courseHighestPoints.set(
                course.courseTitle,
                course.pointEquivalent,
              );
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
            { totalCredits: 0, totalPoints: 0, totalCourses: 0 },
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
        <div className="mx-auto w-4/5">
          <div className="mt-4 text-center text-gray-500">
            No results available.
          </div>
        </div>
      );
    }

    return (
      <div className="mx-auto w-4/5">
        <div className="flex items-center justify-between">
          <div className="mb-4 flex items-center gap-2 text-gray-600">
            <FaCircleInfo className="text-primary" />
            <p className="text-sm">
              Click a row for details • Toggle retakes with button
            </p>
          </div>

          {retake && (
            <div className="mb-6 flex justify-end">
              <button
                className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                  includeRetakes
                    ? "bg-primaryDark text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setIncludeRetakes((prev) => !prev)}
              >
                {includeRetakes ? "Showing Retakes" : "Retakes Hidden"}
              </button>
            </div>
          )}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {["Semester", "SGPA", "Credits", "Courses"].map((header) => (
                  <th
                    key={header}
                    className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-700"
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
                      <td className="px-4 py-3 text-gray-900">
                        {semester.semesterName}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {semester.sgpa}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {semester.totalCredits}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {semester.totalCourses}
                      </td>
                    </tr>

                    {expandedSemester === index && (
                      <tr>
                        <td colSpan={4} className="bg-gray-50 p-4">
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
  },
);

export default SemesterSummary;
