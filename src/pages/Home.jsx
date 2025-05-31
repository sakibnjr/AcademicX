import React from "react";
import HeroSection from "../components/HeroSection";
import ProfileAndSummary from "../components/profileAndSummary/ProfileAndSummary";

const Home = ({
  studentId,
  setStudentId,
  handleFetchResults,
  profile,
  averageCgpa,
  totalCreditsCompleted,
  totalSemestersCompleted,
  results,
  isProfileLoading,
  isResultsLoading,
  retake,
  retakeCourses,
}) => {
  const isLoading = isProfileLoading || isResultsLoading;

  return (
    <div>
      {!profile && !isLoading ? (
        <HeroSection 
          studentId={studentId}
          setStudentId={setStudentId}
          handleFetchResults={handleFetchResults}
        />
      ) : (
        <ProfileAndSummary
          profile={profile}
          averageCgpa={averageCgpa}
          totalCreditsCompleted={totalCreditsCompleted}
          totalSemestersCompleted={totalSemestersCompleted}
          results={results}
          loading={isLoading}
          isResultsLoading={isResultsLoading}
          retake={retake}
          retakeCourses={retakeCourses}
        />
      )}
    </div>
  );
};

export default React.memo(Home);
