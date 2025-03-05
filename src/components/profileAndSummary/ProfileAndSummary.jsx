import React, { useState } from "react";
import SemesterSummary from "./resultInfo/SemesterSummary";
import DashboardSkeleton from "./DashboardSkeleton";
import Profile from "./profile/Profile";
import AcademicInfo from "./academicHistory/AcademicInfo";
import CgpaChart from "./CgpaChart";

//academic info
import CGPA from "./academicHistory/CGPA";
import Credit from "./academicHistory/Credit";
import Semester from "./academicHistory/Semester";

const ProfileAndSummary = ({
  profile,
  averageCgpa,
  totalCreditsCompleted,
  totalSemestersCompleted,
  results,
  loading,
  retake,
  retakeCourses,
}) => {
  const [expandedSemester, setExpandedSemester] = useState(null);

  const toggleSemesterDetails = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };

  if (loading) {
    return <DashboardSkeleton />;
  }

  return (
    <>
      <div className="mx-auto my-6 grid w-4/5 grid-cols-1 gap-6 md:grid-cols-6">
        <Profile profile={profile} />
        <AcademicInfo>
          <CGPA averageCgpa={averageCgpa} />
          <Credit
            totalCreditsCompleted={totalCreditsCompleted}
            retakeCourses={retakeCourses}
            retake={retake}
          />
          <Semester totalSemestersCompleted={totalSemestersCompleted} />
        </AcademicInfo>

        <CgpaChart results={results} />
      </div>

      <SemesterSummary
        retake={retake}
        results={results}
        toggleSemesterDetails={toggleSemesterDetails}
        expandedSemester={expandedSemester}
      />
    </>
  );
};

export default ProfileAndSummary;
