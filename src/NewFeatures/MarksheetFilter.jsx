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
      }))
    );

    if (semesterFilter) {
      filteredResults = filteredResults.filter(
        (course) => course.semesterName === semesterFilter
      );
    }

    if (creditFilter) {
      filteredResults = filteredResults.filter(
        (course) => course.totalCredit === creditFilter
      );
    }

    if (pointFilter) {
      filteredResults = filteredResults.filter((course) =>
        pointFilter === "above"
          ? course.pointEquivalent > 3
          : course.pointEquivalent <= 3
      );
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
        (filteredCourse) => filteredCourse.courseTitle === course.courseTitle
      );

      if (isMatchingCourse && selectedPoint !== null) {
        return { ...course, pointEquivalent: selectedPoint };
      }

      return course;
    });

    const totalWeightedPoints = modifiedCourses.reduce(
      (sum, course) => sum + course.pointEquivalent * course.totalCredit,
      0
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
        0
      ) / totalCredits
  ).toFixed(2);

  // Calculate percentage improvement
  const improvementPercentage =
    averageCGPA && modifiedAverageCGPA
      ? (((modifiedAverageCGPA - averageCGPA) / averageCGPA) * 100).toFixed(2)
      : 0;

  return (
    <div className="w-4/5 mx-auto bg-white p-6 rounded-lg shadow-lg my-6 flex flex-col lg:flex-row">
      {/* Smart Filter Summary */}
      <motion.div
        className="lg:w-1/3 bg-indigo-50 p-4 rounded-lg shadow-md mb-6 lg:mb-0 lg:mr-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-lg font-semibold text-indigo-600 mb-4">
          Smart Filter Summary
        </h2>

        {/* Circular Progress for Matching Courses */}
        <div className="mt-6">
          <h3 className="text-lg text-center mb-2 font-medium text-gray-600">
            Matching Courses
          </h3>
          {/* <div className="size-20">
            <CircularProgressbar
              value={filteredCourses.length}
              maxValue={results.flatMap((semester) => semester.data).length}
              text={`${filteredCourses.length}`}
              styles={{
                path: {
                  stroke: "#4c6ef5", // Blue color for the path
                },
                text: {
                  fill: "#4c6ef5", // Blue color for the text
                  fontSize: "16px",
                  fontWeight: "bold",
                },
              }}
            />
          </div> */}
          <div className="flex gap-2 items-center mb-4">
            <div className="relative w-full h-6 bg-gray-200 rounded-md overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-blue-600"
                style={{
                  width: `${
                    (filteredCourses.length /
                      results.flatMap((semester) => semester.data).length) *
                    100
                  }%`,
                }}
              />
            </div>
            <div className="text-center text-blue-600 font-bold text-lg">
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
          <div className="stat shadow-lg mt-4">
            <div className="stat-title">Modified CGPA</div>
            <div className="stat-value">{modifiedAverageCGPA}</div>
            <div className="stat-desc">CGPA after selected points</div>
          </div>

          {/* Percentage Improvement */}
          <div className="stat shadow-lg mt-4">
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
        <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 mb-6">
          {/* Semester Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Semester
            </label>
            <select
              value={semesterFilter}
              onChange={(e) => setSemesterFilter(e.target.value)}
              className="border border-gray-300 p-2 rounded-lg w-full"
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
            <label className="block text-gray-700 font-medium mb-2">
              Credit Hours
            </label>
            <select
              value={creditFilter || ""}
              onChange={(e) =>
                setCreditFilter(
                  e.target.value ? parseInt(e.target.value) : null
                )
              }
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value="">All Credits</option>
              <option value="1">1 Credit</option>
              <option value="2">2 Credits</option>
              <option value="3">3 Credits</option>
            </select>
          </div>

          {/* CGPA Filter */}
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              CGPA Points
            </label>
            <select
              value={pointFilter || ""}
              onChange={(e) => setPointFilter(e.target.value || null)}
              className="border border-gray-300 p-2 rounded-lg w-full"
            >
              <option value="">All Points</option>
              <option value="above">Above 3</option>
              <option value="below">Below or Equal to 3</option>
            </select>
          </div>
        </div>

        {/* Selected Point Input */}
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            Select Point to Recalculate Average CGPA
          </label>
          <select
            value={selectedPoint || ""}
            onChange={(e) =>
              setSelectedPoint(
                e.target.value ? parseFloat(e.target.value) : null
              )
            }
            className="border border-gray-300 p-2 rounded-lg w-full"
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
            <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b sticky top-0 bg-white">
                    Course Name
                  </th>
                  <th className="px-4 py-2 border-b sticky top-0 bg-white">
                    Semester
                  </th>
                  <th className="px-4 py-2 border-b sticky top-0 bg-white">
                    Credit
                  </th>
                  <th className="px-4 py-2 border-b sticky top-0 bg-white">
                    Point
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredCourses.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-100">
                    <td className="px-4 py-2 border-b">{course.courseTitle}</td>
                    <td className="px-4 py-2 border-b">
                      {course.semesterName}
                    </td>
                    <td className="px-4 py-2 border-b">{course.totalCredit}</td>
                    <td className="px-4 py-2 border-b">
                      {course.pointEquivalent}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500 text-center">No courses found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarksheetFilter;
