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
  compareResults,
  loading,
  retake,
  retakeCourses,
}) => {
  return (
    <div>
      {!profile && !loading ? (
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
          loading={loading}
          retake={retake}
          retakeCourses={retakeCourses}
        />
      )}
    </div>
  );
};

export default Home;
