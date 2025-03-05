import React from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const CGPA = ({ averageCgpa }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-lg p-6 shadow-md">
      <h3 className="text-center text-xl font-semibold text-green-600">CGPA</h3>
      <div className="h-24 w-24">
        <CircularProgressbar
          value={averageCgpa * 10}
          maxValue={40}
          text={`${averageCgpa}`}
          styles={{
            path: {
              stroke: "#408beb",
              strokeLinecap: "round",
              strokeWidth: 8,
            },
            trail: {
              stroke: "#e0e0e0",
              strokeWidth: 8,
            },
            text: {
              fill: "#408beb",
              fontSize: "24px",
              fontWeight: "bold",
            },
          }}
        />
      </div>
    </div>
  );
};

export default CGPA;
