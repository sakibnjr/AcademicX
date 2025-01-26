import React, { useState, useEffect } from "react";
import { FaCircleInfo, FaRedoAlt } from "react-icons/fa6";
import SemesterDetails from "./SemesterDetails";
import { motion } from "framer-motion";

const SemesterTable = ({
  results,
  toggleSemesterDetails,
  expandedSemester,
}) => {
  const [retakeCount, setRetakeCount] = useState(0);

  console.log(results);

  useEffect(() => {
    // Calculate retake count
    const allCourses = results.flatMap((semester) => semester.data || []);
    const courseMap = new Map();
    let count = 0;

    allCourses.forEach((course) => {
      if (courseMap.has(course.courseTitle)) {
        count++;
      }
      courseMap.set(course.courseTitle, course);
    });

    setRetakeCount(count);
  }, [results]);

  // Check if a semester has retake courses
  const hasRetake = (semester) => {
    const courseMap = new Map();
    return semester.data.some((course) => {
      if (courseMap.has(course.courseTitle)) {
        return true; // Retake exists
      }
      courseMap.set(course.courseTitle, course);
      return false;
    });
  };

  return (
    <div>
      {/* Tooltip Section */}
      <div
        className="tooltip tooltip-bottom tooltip-accent mb-6 flex items-center justify-center gap-2 rounded-md bg-blue-50 p-3 shadow-sm"
        data-tip="Click on a row to view semester details"
      >
        <FaCircleInfo className="text-lg text-blue-500" />
        <p className="text-sm font-medium text-blue-600">
          Click a row to expand details.
        </p>
      </div>

      {/* Retake Count */}
      <div className="mb-4 flex items-center justify-center gap-2 rounded-md bg-yellow-50 p-4 shadow">
        <FaRedoAlt className="text-lg text-yellow-600" />
        <p className="text-sm font-medium text-yellow-700">
          Total Retake Courses: <strong>{retakeCount}</strong>
        </p>
      </div>

      {/* Table Section */}
      {Array.isArray(results) && results.length > 0 ? (
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
              {results.map((semester, index) => (
                <React.Fragment key={index}>
                  {/* Main Row */}
                  <tr
                    className={`cursor-pointer transition duration-300 ${
                      expandedSemester === index
                        ? "bg-blue-100 hover:bg-blue-200"
                        : "hover:bg-gray-100"
                    }`}
                    onClick={() => toggleSemesterDetails(index)}
                  >
                    <td className="p-4">{semester.semesterName}</td>
                    <td className="p-4">{semester.cgpa || "N/A"}</td>
                    <td className="p-4">{semester.totalCredits}</td>
                    <td className="p-4">{semester.data.length}</td>
                    <td className="p-4 text-center">
                      {hasRetake(semester) && (
                        <FaRedoAlt
                          className="text-yellow-600"
                          title="This semester contains retake courses."
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
                          <SemesterDetails semester={semester} />
                        </motion.div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
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
