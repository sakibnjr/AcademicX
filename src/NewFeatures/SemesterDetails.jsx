import React from "react";

const SemesterDetails = ({ semester }) => {
  return (
    <div className="relative z-50 bg-white px-4">
      <h3 className="text-2xl font-semibold text-green-600 m-4">Marksheet</h3>
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
            <th className="hidden md:table-cell border px-4 py-3 text-center text-sm font-medium text-gray-700">
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
              <td className="hidden md:table-cell border px-4 py-2 text-sm">
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
