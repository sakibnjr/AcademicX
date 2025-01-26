import React, { useState } from "react";
import { motion } from "framer-motion";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "daisyui/dist/full.css"; // Import DaisyUI

const MarksheetFilter = ({ results }) => {
  const [semesterFilter, setSemesterFilter] = useState("");
  const [creditFilter, setCreditFilter] = useState(null);
  const [pointFilter, setPointFilter] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);

  const handleFilter = () => {
    let filteredResults = results.flatMap((semester) =>
      semester.data.map((course) => ({
        ...course,
        semesterName: semester.semesterName,
      })),
    );

    if (semesterFilter) {
      filteredResults = filteredResults.filter(
        (course) => course.semesterName === semesterFilter,
      );
    }

    if (creditFilter) {
      filteredResults = filteredResults.filter(
        (course) => course.totalCredit === creditFilter,
      );
    }

    if (pointFilter) {
      filteredResults = filteredResults.filter((course) => {
        if (pointFilter === "above") {
          return course.pointEquivalent > 3;
        } else if (pointFilter === "below") {
          return course.pointEquivalent <= 3;
        } else if (pointFilter === "four") {
          return course.pointEquivalent === 4;
        } else if (pointFilter === "failed") {
          return course.pointEquivalent === 0;
        }
        return true; // Default case to handle any unexpected values
      });
    }

    return filteredResults;
  };

  const filteredCourses = handleFilter();

  const totalCredits = results
    .flatMap((semester) => semester.data)
    .reduce((sum, course) => sum + course.totalCredit, 0);

  const calculateModifiedAverageCGPA = () => {
    const allCourses = results.flatMap((semester) => semester.data);
    const modifiedCourses = allCourses.map((course) => {
      const isMatchingCourse = filteredCourses.some(
        (filteredCourse) => filteredCourse.courseTitle === course.courseTitle,
      );

      if (isMatchingCourse && selectedPoint !== null) {
        return { ...course, pointEquivalent: selectedPoint };
      }

      return course;
    });

    const totalWeightedPoints = modifiedCourses.reduce(
      (sum, course) => sum + course.pointEquivalent * course.totalCredit,
      0,
    );

    return (totalWeightedPoints / totalCredits).toFixed(2);
  };

  const modifiedAverageCGPA =
    selectedPoint !== null ? calculateModifiedAverageCGPA() : "N/A";

  const averageCGPA = (
    results
      .flatMap((semester) => semester.data)
      .reduce(
        (sum, course) => sum + course.pointEquivalent * course.totalCredit,
        0,
      ) / totalCredits
  ).toFixed(2);

  // Calculate percentage improvement
  const improvementPercentage =
    averageCGPA && modifiedAverageCGPA
      ? (((modifiedAverageCGPA - averageCGPA) / averageCGPA) * 100).toFixed(2)
      : 0;

  return (
    <div className="mx-auto my-6 flex w-4/5 flex-col rounded-lg p-6 shadow-lg shadow-primary/15 lg:flex-row dark:text-text">
      {/* Smart Filter Summary */}
      <motion.div
        className="mb-6 rounded-lg bg-sky-50 p-4 shadow-md lg:mb-0 lg:mr-6 lg:w-1/3"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="mb-4 text-lg font-semibold text-text">
          Smart Filter Summary
        </h2>

        {/* Circular Progress for Matching Courses */}
        <div className="mt-6">
          <h3 className="mb-2 text-center text-lg font-medium text-gray-600">
            Matching Courses
          </h3>

          <div className="mb-4 flex items-center gap-2">
            <div className="relative h-6 w-full overflow-hidden rounded-md bg-gray-200">
              <div
                className="absolute left-0 top-0 h-full bg-primaryDark"
                style={{
                  width: `${
                    (filteredCourses.length /
                      results.flatMap((semester) => semester.data).length) *
                    100
                  }%`,
                }}
              />
            </div>
            <div className="text-center text-lg font-bold text-blue-600">
              {filteredCourses.length}
            </div>
          </div>
        </div>
        <div className="mb-6">
          {/* Original CGPA */}
          <div className="stat shadow-lg">
            <div className="stat-title">Original CGPA</div>
            <div className="stat-value">{averageCGPA}</div>
            <div className="stat-desc">CGPA before modification</div>
          </div>

          {/* Modified CGPA */}
          <div className="stat mt-4 shadow-lg">
            <div className="stat-title">Modified CGPA</div>
            <div className="stat-value">{modifiedAverageCGPA}</div>
            <div className="stat-desc">CGPA after selected points</div>
          </div>

          {/* Percentage Improvement */}
          <div className="stat mt-4 shadow-lg">
            <div className="stat-title">Improvement</div>
            <div className="stat-value text-green-500">
              {improvementPercentage}%
            </div>
            <div className="stat-desc">Percentage improvement in CGPA</div>
          </div>
        </div>
      </motion.div>

      {/* DaisyUI Stats for CGPA */}
      <div className="lg:w-2/3">
        {/* Filter Controls */}
        <div className="mb-6 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 dark:text-white">
          {/* Semester Filter */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Semester
            </label>
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="">All Semesters</option>
              {results.map((semester, index) => (
                <option key={index} value={semester.semesterName}>
                  {semester.semesterName}
                </option>
              ))}
            </select>
          </div>

          {/* Credit Filter */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              Credit Hours
            </label>
            <select
              value={creditFilter || ""}
              onChange={(e) =>
                setCreditFilter(
                  e.target.value ? parseInt(e.target.value) : null,
                )
              }
              className="w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="">All Credits</option>
              <option value="1">1 Credit</option>
              <option value="2">2 Credits</option>
              <option value="3">3 Credits</option>
            </select>
          </div>

          {/* CGPA Filter */}
          <div>
            <label className="mb-2 block font-medium text-gray-700">
              CGPA Points
            </label>
            <select
              value={pointFilter || ""}
              onChange={(e) => setPointFilter(e.target.value || null)}
              className="w-full rounded-lg border border-gray-300 p-2"
            >
              <option value="">All Points</option>
              <option value="four">4.00</option>
              <option value="above">Above 3</option>
              <option value="below">Below or Equal to 3</option>
              <option value="failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Selected Point Input */}
        <div className="mb-6">
          <label className="mb-2 block font-medium text-gray-700">
            Select Point to Recalculate Average CGPA
          </label>
          <select
            value={selectedPoint || ""}
            onChange={(e) =>
              setSelectedPoint(
                e.target.value ? parseFloat(e.target.value) : null,
              )
            }
            className="w-full rounded-lg border border-primary bg-sky-200 p-2"
          >
            <option value="">Select a Point</option>
            {[4, 3.75, 3.5, 3.25].map((point) => (
              <option key={point} value={point}>
                {point}
              </option>
            ))}
          </select>
        </div>

        {/* Filtered Results */}
        <div className="max-h-80 overflow-y-auto">
          {filteredCourses.length > 0 ? (
            <table className="min-w-full overflow-hidden rounded-lg border border-gray-300 bg-white">
              <thead>
                <tr>
                  <th className="sticky top-0 border-b bg-white px-4 py-2">
                    Course Name
                  </th>
                  <th className="sticky top-0 border-b bg-white px-4 py-2">
                    Semester
                  </th>
                  <th className="sticky top-0 border-b bg-white px-4 py-2">
                    Credit
                  </th>
                  <th className="sticky top-0 border-b bg-white px-4 py-2">
                    Point
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="border-b px-4 py-2">{course.courseTitle}</td>
                    <td className="border-b px-4 py-2">
                      {course.semesterName}
                    </td>
                    <td className="border-b px-4 py-2">{course.totalCredit}</td>
                    <td className="border-b px-4 py-2">
                      {course.pointEquivalent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center text-gray-500">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarksheetFilter;
