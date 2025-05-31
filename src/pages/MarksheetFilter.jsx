import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaFilter, FaChartLine, FaGraduationCap } from "react-icons/fa";

const MarksheetFilter = ({ results, averageCgpa }) => {
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
        return true;
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

  const improvementPercentage =
    averageCgpa && modifiedAverageCGPA !== "N/A"
      ? (((modifiedAverageCGPA - averageCgpa) / averageCgpa) * 100).toFixed(2)
      : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-8">
      <div className="mx-auto w-4/5">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Smart Filter</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Filter and analyze your academic performance
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1 space-y-4"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-blue-100">
                  <FaChartLine className="text-blue-600 text-lg" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Performance Summary
                </h2>
              </div>

              <div className="space-y-3">
                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-sm text-slate-600 mb-0.5">Original CGPA</div>
                  <div className="text-xl font-bold text-slate-800">{averageCgpa}</div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-sm text-slate-600 mb-0.5">Modified CGPA</div>
                  <div className="text-xl font-bold text-slate-800">{modifiedAverageCGPA}</div>
                </div>

                <div className="bg-slate-50 rounded-lg p-3">
                  <div className="text-sm text-slate-600 mb-0.5">Improvement</div>
                  <div className="text-xl font-bold text-green-600">
                    {improvementPercentage}%
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-blue-100">
                  <FaFilter className="text-blue-600 text-lg" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Matching Courses
                </h2>
              </div>

              <div className="mb-3">
                <div className="relative h-3 w-full overflow-hidden rounded-full bg-slate-200">
                  <div
                    className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{
                      width: `${
                        (filteredCourses.length /
                          results.flatMap((semester) => semester.data).length) *
                        100
                      }%`,
                    }}
                  />
                </div>
              </div>
              <div className="text-center">
                <span className="text-xl font-bold text-blue-600">
                  {filteredCourses.length}
                </span>
                <span className="text-slate-600 ml-2 text-sm">courses matched</span>
              </div>
            </div>
          </motion.div>

          {/* Filter Controls and Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-blue-100">
                  <FaGraduationCap className="text-blue-600 text-lg" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Filter Controls
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Semester
                  </label>
                  <select
                    value={semesterFilter}
                    onChange={(e) => setSemesterFilter(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-sm"
                  >
                    <option value="">All Semesters</option>
                    {results.map((semester, index) => (
                      <option key={index} value={semester.semesterName}>
                        {semester.semesterName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Credit Hours
                  </label>
                  <select
                    value={creditFilter || ""}
                    onChange={(e) =>
                      setCreditFilter(
                        e.target.value ? parseInt(e.target.value) : null,
                      )
                    }
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-sm"
                  >
                    <option value="">All Credits</option>
                    <option value="1">1 Credit</option>
                    <option value="2">2 Credits</option>
                    <option value="3">3 Credits</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    CGPA Points
                  </label>
                  <select
                    value={pointFilter || ""}
                    onChange={(e) => setPointFilter(e.target.value || null)}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-sm"
                  >
                    <option value="">All Points</option>
                    <option value="four">4.00</option>
                    <option value="above">Above 3</option>
                    <option value="below">Below or Equal to 3</option>
                    <option value="failed">Failed</option>
                  </select>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Select Point to Recalculate Average CGPA
                </label>
                <select
                  value={selectedPoint || ""}
                  onChange={(e) =>
                    setSelectedPoint(
                      e.target.value ? parseFloat(e.target.value) : null,
                    )
                  }
                  className="w-full px-3 py-1.5 rounded-lg border border-blue-200 bg-blue-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 text-sm"
                >
                  <option value="">Select a Point</option>
                  {[4, 3.75, 3.5, 3.25].map((point) => (
                    <option key={point} value={point}>
                      {point}
                    </option>
                  ))}
                </select>
              </div>

              <div className="max-h-80 overflow-y-auto rounded-lg border border-slate-200">
                {filteredCourses.length > 0 ? (
                  <table className="min-w-full divide-y divide-slate-200">
                    <thead className="bg-slate-50 sticky top-0">
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Course Name
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Semester
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Credit
                        </th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Point
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                      {filteredCourses.map((course, index) => (
                        <tr key={index} className="hover:bg-slate-50 transition-colors duration-200">
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-900">
                            {course.courseTitle}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-900">
                            {course.semesterName}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-900">
                            {course.totalCredit}
                          </td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-slate-900">
                            {course.pointEquivalent}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-slate-500 text-sm">No courses found.</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarksheetFilter;
