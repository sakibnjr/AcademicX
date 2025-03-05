import React from "react";
import { toast } from "react-hot-toast";

const Input = ({ studentId, setStudentId }) => {
  const handleChange = (e) => {
    const value = e.target.value;
    // Regular expression to allow only digits and hyphens
    const regex = /^[0-9-]*$/;

    if (regex.test(value)) {
      setStudentId(value);
    } else {
      toast.error("Only digits and hyphens are allowed!");
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        id="student-id" // Add a unique ID for the input
        className="peer mx-[10px] rounded-lg border-2 bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={studentId}
        onChange={handleChange}
      />
      {!studentId && (
        <label
          htmlFor="student-id" // Link the label to the input using the ID
          className="absolute left-0 top-0 ml-4 cursor-pointer px-3 py-2 text-gray-400 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:scale-75 peer-focus:-top-8 peer-focus:text-blue-500" // Add cursor pointer for better UX
        >
          Student ID
        </label>
      )}
    </div>
  );
};

export default Input;
