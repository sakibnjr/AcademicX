import React from "react";
import SemesterDetails from "./SemesterDetails";

const Results = ({
  index,
  semester,
  toggleSemesterDetails,
  expandedSemester,
}) => {
  return (
    <div
      key={index}
      className="text-center rounded-lg bg-base-100 border-2 border-gray-300 shadow-md transition-transform transform hover:scale-105"
      onClick={() => toggleSemesterDetails(index)}
    >
      <div className="flex flex-col items-center p-4">
        <h2 className="text-2xl font-semibold text-primary cursor-pointer my-2">
          {semester.semesterName}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          <div className="stat place-items-center">
            <div className="stat-title">SGPA</div>
            <div className="stat-value">{semester.cgpa || "Not available"}</div>
            <div className="stat-desc">Semester Grade Point Average</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Total Credits</div>
            <div className="stat-value">{semester.totalCredits}</div>
            <div className="stat-desc">Total credits done this semester</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Total Courses Taken</div>
            <div className="stat-value">{semester.data.length}</div>
            <div className="stat-desc">Number of courses completed</div>
          </div>
        </div>
      </div>

      {expandedSemester === index && <SemesterDetails semester={semester} />}
    </div>
  );
};

export default Results;
