import React from "react";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="flex justify-center my-4">
      <ClipLoader size={50} color="#4A90E2" />
    </div>
  );
};

export default Loader;
