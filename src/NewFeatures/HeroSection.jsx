import React from "react";
import Button from "./Button";
import Input from "./Input";

import Text from "./Text";
const HeroSection = ({ studentId, setStudentId, handleFetchResults }) => {
  return (
    <div className="mx-auto grid w-4/5 justify-center rounded-lg bg-white p-8">
      <Text
        studentId={studentId}
        setStudentId={setStudentId}
        handleFetchResults={handleFetchResults}
      />
      <div className="my-4 flex flex-col items-center justify-center md:flex-row">
        <Input studentId={studentId} setStudentId={setStudentId} />
        <div className="w-full">
          <Button handleFetchResults={handleFetchResults} />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
