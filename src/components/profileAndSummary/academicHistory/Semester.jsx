import React from "react";

const Semester = ({ totalSemestersCompleted }) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow-md">
      <h4 className="text-center text-lg font-semibold text-gray-800">
        Total Semesters
      </h4>
      <p className="text-center text-2xl font-bold text-blue-700">
        {totalSemestersCompleted}
      </p>
    </div>
  );
};

export default Semester;
