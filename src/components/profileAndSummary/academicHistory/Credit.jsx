import React from "react";

const Credit = ({ totalCreditsCompleted, retakeCourses, retake }) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg p-4 shadow-md">
      <h4 className="text-center text-lg font-semibold text-gray-800">
        Total Credits
      </h4>
      <p className="text-center text-2xl font-bold text-blue-700">
        {totalCreditsCompleted}
      </p>
      {retake && (
        <p className="text-center text-sm text-gray-500">
          Retake Courses: {retakeCourses}
        </p>
      )}
    </div>
  );
};

export default Credit;
