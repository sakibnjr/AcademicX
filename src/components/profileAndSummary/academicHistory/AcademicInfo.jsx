import React from "react";
import CGPA from "./CGPA";
import Credit from "./Credit";
import Semester from "./Semester";

const AcademicInfo = ({ children }) => {
  return <div className="grid gap-4 md:col-span-1">{children}</div>;
};

export default AcademicInfo;
