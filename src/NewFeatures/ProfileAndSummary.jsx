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
}) => {
  if (loading) {
    // Render skeleton while loading
    return (
      <>
        <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 my-4">
          {/* Skeleton for Profile Section */}
          <div className="grid grid-cols-1 content-center gap-4 p-4 rounded-md bg-sky-100 md:col-span-2">
            <div className="flex justify-center">
              <Skeleton circle={true} height={100} width={100} />
            </div>

            <div className="flex flex-col justify-center items-center gap-2">
              <Skeleton width={300} height={40} />
              <Skeleton width={150} height={20} />
              <Skeleton width={180} height={20} />
              <Skeleton width={100} height={20} />
            </div>
          </div>

          {/* Skeleton for Academic Summary */}
          <div className="grid grid-cols-1 gap-4 md:col-span-1">
            <div className="flex justify-start items-center gap-8 border-y-2 border-r-2">
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
        <div className="w-4/5 mx-auto flex flex-col items-center gap-y-2">
          <div>
            <Skeleton width={180} height={25} />
          </div>
          <div className="flex justify-center items-start gap-10">
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
      <div className="w-4/5 mx-auto grid grid-cols-1 md:grid-cols-6 gap-4 mt-10">
        {/* Profile Section */}
        <div className="grid grid-cols-1 content-center gap-4 p-4 rounded-md bg-sky-100 md:col-span-2">
          <div className="flex justify-center">
            <img
              src={`https://avatar.iran.liara.run/public?name=${profile.studentName}&gender=male&size=500`}
              alt="Avatar"
              className="size-48 rounded-full object-cover"
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-2">
            <h2 className="text-2xl font-semibold text-gray-800">
              {profile.studentName}
            </h2>
            <p className="text-gray-600">Student ID: {profile.studentId}</p>
            <p className="text-gray-600">Dept. of {profile.departmentName}</p>
            <p className="text-gray-600">{profile.batchNo} Batch </p>
          </div>
        </div>

        {/* Academic Summary */}
        <div className="grid grid-cols-1 gap-4 md:col-span-1">
          <div className="flex justify-start items-center gap-8 border-y-2 border-r-2">
            <h3 className="text-xl font-semibold text-green-600 flex flex-col">
              <span>C</span>
              <span>G</span>
              <span>P</span>
              <span>A</span>
            </h3>
            <div className="w-24 h-24">
              <CircularProgressbar
                value={averageCgpa * 10}
                maxValue={40}
                text={`${averageCgpa}`}
              />
            </div>
          </div>
          <div className="stat border-2">
            <div className="stat-title">Credits</div>
            <div className="stat-value">{totalCreditsCompleted}</div>
          </div>
          <div className="stat border-2">
            <div className="stat-title">Semesters</div>
            <div className="stat-value">{totalSemestersCompleted}</div>
          </div>
        </div>

        {/* CGPA Chart */}
        <div className="md:col-span-3">
          {results.length > 0 && (
            <CgpaChart results={results} compareResults={compareResults} />
          )}
        </div>
      </div>

      <div className="w-4/5 mx-auto">
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
