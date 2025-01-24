import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import CgpaChart from "./CgpaChart";
import SemesterSlider from "./SemesterSlider";

const ProfileAndSummary = ({
  profile,
  averageCgpa,
  totalCreditsCompleted,
  totalSemestersCompleted,
  results,
  compareResults,
  toggleSemesterDetails,
  expandedSemester,
  loading,
  retake,
  retakeCourses,
}) => {
  if (loading) {
    // Render skeleton while loading
    return (
      <>
        <div className="mx-auto my-4 grid w-4/5 grid-cols-1 gap-4 md:grid-cols-6">
          {/* Skeleton for Profile Section */}
          <div className="grid grid-cols-1 content-center gap-4 rounded-md bg-sky-100 p-4 md:col-span-2">
            <div className="flex justify-center">
              <Skeleton circle={true} height={100} width={100} />
            </div>

            <div className="flex flex-col items-center justify-center gap-2">
              <Skeleton width={300} height={40} />
              <Skeleton width={150} height={20} />
              <Skeleton width={180} height={20} />
              <Skeleton width={100} height={20} />
            </div>
          </div>

          {/* Skeleton for Academic Summary */}
          <div className="grid grid-cols-1 gap-4 md:col-span-1">
            <div className="flex items-center justify-start gap-8 border-y-2 border-r-2">
              <div className="flex flex-col">
                <Skeleton width={15} height={15} />
                <Skeleton width={15} height={15} />
                <Skeleton width={15} height={15} />
                <Skeleton width={15} height={15} />
              </div>
              <Skeleton circle={true} width={70} height={70} />
            </div>
            <div className="stat border-2">
              <div className="stat-title">
                <Skeleton width={120} height={20} />
              </div>
              <div className="stat-value">
                <Skeleton width={80} height={20} />
              </div>
            </div>
            <div className="stat border-2">
              <div className="stat-title">
                <Skeleton width={120} height={20} />
              </div>
              <div className="stat-value">
                <Skeleton width={80} height={20} />
              </div>
            </div>
          </div>

          {/* Skeleton for CGPA Chart */}
          <div className="md:col-span-3">
            <Skeleton height={300} />
          </div>
        </div>
        {/* Skeleton for Semester Slider */}
        <div className="mx-auto flex w-4/5 flex-col items-center gap-y-2">
          <div>
            <Skeleton width={180} height={25} />
          </div>
          <div className="flex items-start justify-center gap-10">
            <Skeleton width={50} height={20} />
            <Skeleton width={50} height={20} />
            <Skeleton width={50} height={20} />
          </div>
        </div>
      </>
    );
  }

  // Normal content when loading is false
  return (
    <>
      <div className="mx-auto my-4 grid w-4/5 grid-cols-1 gap-4 md:grid-cols-6">
        {/* Profile Section */}
        <div className="grid grid-cols-1 content-center gap-4 rounded-md bg-sky-100 p-4 md:col-span-2 dark:bg-primaryLight">
          <div className="flex justify-center">
            <img
              src={`https://avatar.iran.liara.run/public?name=${profile.studentName}&gender=male&size=500`}
              alt="Avatar"
              className="size-48 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-2 text-gray-800 dark:text-slate-50">
            <h2 className="text-2xl font-semibold">{profile.studentName}</h2>
            <p>Student ID: {profile.studentId}</p>
            <p>Dept. of {profile.departmentName}</p>
            <p>{profile.batchNo} Batch </p>
          </div>
        </div>

        {/* Academic Summary */}
        <div className="grid grid-cols-1 gap-4 md:col-span-1">
          <div className="flex items-center justify-start gap-8 border-y-2 border-r-2">
            <h3 className="flex flex-col text-xl font-semibold text-green-600">
              <span>C</span>
              <span>G</span>
              <span>P</span>
              <span>A</span>
            </h3>
            <div className="h-24 w-24">
              <CircularProgressbar
                value={averageCgpa * 10}
                maxValue={40}
                text={`${averageCgpa}`}
                styles={{
                  path: {
                    stroke: "#408beb", // Progress color
                    strokeLinecap: "round", // Rounded edges on the path
                    strokeWidth: 8, // Thickness of the progress path
                  },
                  trail: {
                    stroke: "#d6d6d6", // Background path color (non-progressed part)
                    strokeWidth: 8, // Background path thickness
                  },
                  text: {
                    fill: "#408beb", // Color of the text
                    fontSize: "24px", // Text size
                    fontWeight: "bold", // Text weight
                  },
                  background: {
                    fill: "#e0e0e0", // Background circle color (optional)
                  },
                }}
              />
            </div>
          </div>
          <div className="stat border-2">
            <div className="stat-title">Credits</div>
            <div className="stat-value">{totalCreditsCompleted}</div>
            {retake && (
              <div className="stat-desc">Retake Count {retakeCourses}</div>
            )}
          </div>
          <div className="stat border-2">
            <div className="stat-title">Semesters</div>
            <div className="stat-value">{totalSemestersCompleted}</div>
          </div>
        </div>

        {/* CGPA Chart */}
        <div className="md:col-span-3">
          {results.length > 0 ? (
            <CgpaChart results={results} compareResults={compareResults} />
          ) : (
            <p className="flex content-center items-center justify-center">
              No data available
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto w-4/5">
        <SemesterSlider
          results={results}
          toggleSemesterDetails={toggleSemesterDetails}
          expandedSemester={expandedSemester}
        />
      </div>
    </>
  );
};

export default ProfileAndSummary;
