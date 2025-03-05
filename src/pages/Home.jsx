import React from "react";
import HeroSection from "../components/HeroSection";
import ProfileAndSummary from "../components/profileAndSummary/ProfileAndSummary";
import Text from "../components/heroSection/Text";
import Input from "../components/heroSection/Input";
import Button from "../components/heroSection/Button";

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
    <div className="flex-1 content-center">
      {!profile && !loading ? (
        <HeroSection>
          <Text
            studentId={studentId}
            setStudentId={setStudentId}
            handleFetchResults={handleFetchResults}
          />
          <div className="my-4 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0">
            <Input studentId={studentId} setStudentId={setStudentId} />
            <div className="w-full">
              <Button handleFetchResults={handleFetchResults} />
            </div>
          </div>
        </HeroSection>
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
