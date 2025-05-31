import React from "react";
import { motion } from "framer-motion";

const SemesterDetails = ({ semester, retakenCourses = [] }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="relative z-50 bg-white rounded-lg overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-50">
              <th className="border-b px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                Course Title
              </th>
              <th className="border-b px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                Credits
              </th>
              <th className="border-b px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600">
                Point
              </th>
              <th className="hidden border-b px-4 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-600 md:table-cell">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {semester.data.map((course, idx) => {
              const isRetaken = retakenCourses.includes(course.courseTitle);

              return (
                <tr
                  key={idx}
                  className={`transition-colors ${
                    isRetaken ? "bg-red-50 hover:bg-red-100" : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">
                    {course.courseTitle}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">
                    {course.totalCredit}
                  </td>
                  <td className="px-4 py-3 text-sm text-center text-gray-600">
                    {course.pointEquivalent}
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-center text-gray-600 md:table-cell">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      course.gradeLetter === 'A+' || course.gradeLetter === 'A' ? 'bg-green-100 text-green-800' :
                      course.gradeLetter === 'A-' || course.gradeLetter === 'B+' ? 'bg-blue-100 text-blue-800' :
                      course.gradeLetter === 'B' || course.gradeLetter === 'B-' ? 'bg-indigo-100 text-indigo-800' :
                      course.gradeLetter === 'C+' || course.gradeLetter === 'C' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {course.gradeLetter}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default SemesterDetails;
