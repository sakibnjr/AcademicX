import React from "react";

const SemesterDetails = ({ semester }) => {
  return (
    <div className="relative z-50 bg-white px-4">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-3 text-center text-sm font-medium text-gray-700">
              Course Title
            </th>
            <th className="border px-4 py-3 text-center text-sm font-medium text-gray-700">
              Credits
            </th>
            <th className="border px-4 py-3 text-center text-sm font-medium text-gray-700">
              Point
            </th>
            <th className="hidden border px-4 py-3 text-center text-sm font-medium text-gray-700 md:table-cell">
              Grade
            </th>
          </tr>
        </thead>
        <tbody>
          {semester.data.map((course, idx) => (
            <tr key={idx} className="border-b hover:bg-sky-50">
              <td className="border px-4 py-2 text-sm">{course.courseTitle}</td>
              <td className="border px-4 py-2 text-sm">{course.totalCredit}</td>
              <td className="border px-4 py-2 text-sm">
                {course.pointEquivalent}
              </td>
              <td className="hidden border px-4 py-2 text-sm md:table-cell">
                {course.gradeLetter}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SemesterDetails;
