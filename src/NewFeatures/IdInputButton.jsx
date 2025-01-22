import React from "react";

const IdInputButton = ({ studentId, setStudentId, handleFetchResults }) => {
  return (
    <div className="grid items-center bg-white p-8 rounded-lg shadow-lg w-4/5 mx-auto">
      <div>
        {/* Header Section */}
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">
          DIU Result Analyzer
        </h1>
        <p className="text-gray-500 text-sm mb-6">
          Enter your Student ID to continue
        </p>

        {/* Input Section */}
        <input
          type="text"
          placeholder="e.g., XXX-XX-XXXX"
          value={studentId}
          required={true}
          onChange={(e) => setStudentId(e.target.value)}
          className="border-2 border-gray-300 p-4 rounded-lg w-full mb-4 text-lg focus:ring-2 focus:ring-indigo-500"
        />

        {/* Button Section */}
        <button
          onClick={handleFetchResults}
          className="bg-indigo-600 text-white py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 w-full text-lg"
        >
          Analyze
        </button>
      </div>
    </div>
  );
};

export default IdInputButton;
