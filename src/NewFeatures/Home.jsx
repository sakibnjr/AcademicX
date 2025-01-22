import React from "react";
import IdInputButton from "./IdInputButton";
import ProfileAndSummary from "./ProfileAndSummary";

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
  toggleSemesterDetails,
  expandedSemester,
  loading,
  error,
}) => {
  return (
    <div className="flex-1 content-center">
      {/* Show IdInputButton only if no profile is available and data is not being loaded */}
      {!profile && !loading ? (
        <IdInputButton
          studentId={studentId}
          setStudentId={setStudentId}
          handleFetchResults={handleFetchResults}
        />
      ) : (
        // Show ProfileAndSummary when data is ready or loading
        <ProfileAndSummary
          profile={profile}
          averageCgpa={averageCgpa}
          totalCreditsCompleted={totalCreditsCompleted}
          totalSemestersCompleted={totalSemestersCompleted}
          results={results}
          compareResults={compareResults}
          toggleSemesterDetails={toggleSemesterDetails}
          expandedSemester={expandedSemester}
          loading={loading}
          error={error}
        />
      )}
    </div>
  );
};

export default Home;
