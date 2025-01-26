import React, { useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CgpaChart from "./CgpaChart";
import SemesterSlider from "./SemesterSlider";
import SemesterTable from "./SemesterTable";
import DashboardSkeleton from "./DashboardSkeleton";

const ProfileAndSummary = ({
  profile,
  averageCgpa,
  totalCreditsCompleted,
  totalSemestersCompleted,
  results,
  compareResults,
  loading,
  retake,
  retakeCourses,
}) => {
  const [activeView, setActiveView] = useState("table"); // State for active view

  const [expandedSemester, setExpandedSemester] = useState(null);

  // Toggle expanded details for semesters
  const toggleSemesterDetails = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };

  if (loading) {
    // Render skeleton while loading
    return <DashboardSkeleton />;
  }

  // Normal content when loading is false
  return (
    <>
      <div className="mx-auto my-6 grid w-4/5 grid-cols-1 gap-6 md:grid-cols-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-2 shadow-md md:col-span-2">
          <div className="flex justify-center">
            <img
              src={`https://avatar.iran.liara.run/public?name=${profile.studentName}&gender=male&size=500`}
              alt="Avatar"
              className="h-32 w-32 rounded-full object-cover ring-4 ring-blue-500"
            />
          </div>
          <div className="space-y-2 text-center text-gray-800">
            <h2 className="text-2xl font-semibold text-primaryDark">
              {profile.studentName}
            </h2>
            <p className="text-gray-600">{profile.studentId}</p>
            <p className="rounded-md bg-primaryDark text-white">
              {profile.deptShortName} <span className="mx-2 text-lg">|</span>{" "}
              BATCH {profile.batchNo}
            </p>
          </div>
        </div>

        {/* Academic Summary */}
        <div className="grid gap-4 md:col-span-1">
          {/* CGPA Display */}
          <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-6 shadow-md">
            <h3 className="text-center text-xl font-semibold text-green-600">
              CGPA
            </h3>
            <div className="h-24 w-24">
              <CircularProgressbar
                value={averageCgpa * 10}
                maxValue={40}
                text={`${averageCgpa}`}
                styles={{
                  path: {
                    stroke: "#408beb",
                    strokeLinecap: "round",
                    strokeWidth: 8,
                  },
                  trail: {
                    stroke: "#e0e0e0",
                    strokeWidth: 8,
                  },
                  text: {
                    fill: "#408beb",
                    fontSize: "24px",
                    fontWeight: "bold",
                  },
                }}
              />
            </div>
          </div>

          {/* Credit Summary */}
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

          {/* Semester Summary */}
          <div className="flex flex-col gap-2 rounded-lg p-4 shadow-md">
            <h4 className="text-center text-lg font-semibold text-gray-800">
              Total Semesters
            </h4>
            <p className="text-center text-2xl font-bold text-blue-700">
              {totalSemestersCompleted}
            </p>
          </div>
        </div>

        {/* CGPA Chart */}
        <div className="flex items-center md:col-span-3">
          <div className="w-full max-w-full overflow-hidden rounded-lg shadow-md lg:px-2">
            {results.length > 0 ? (
              <div className="w-full">
                <CgpaChart results={results} compareResults={compareResults} />
              </div>
            ) : (
              <p className="flex items-center justify-center text-gray-500">
                No data available
              </p>
            )}
          </div>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="mx-auto mb-4 flex w-4/5 justify-center gap-4">
        <button
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            activeView === "table"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveView("table")}
        >
          View as Table
        </button>
        <button
          className={`rounded-md px-4 py-2 text-sm font-medium ${
            activeView === "slider"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 hover:bg-gray-300"
          }`}
          onClick={() => setActiveView("slider")}
        >
          View as Slider
        </button>
      </div>

      {/* Conditionally Render Slider or Table */}
      <div className="mx-auto w-4/5">
        {activeView === "table" ? (
          <SemesterTable
            retake={retake}
            results={results}
            toggleSemesterDetails={toggleSemesterDetails}
            expandedSemester={expandedSemester}
          />
        ) : (
          <SemesterSlider
            results={results}
            toggleSemesterDetails={toggleSemesterDetails}
            expandedSemester={expandedSemester}
          />
        )}
      </div>
    </>
  );
};

export default ProfileAndSummary;
