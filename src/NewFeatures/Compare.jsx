import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { GridLoader } from "react-spinners"; // Import the spinner component
import CompareCgpaChart from "./CompareCgpaChart";

const Compare = ({
  results,
  compareStudentId,
  setCompareStudentId,
  handleCompareResults,
  compareResults,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const fetchCompareResults = async () => {
    setIsLoading(true); // Start loading
    await handleCompareResults(); // Call the function to fetch comparison results
    setIsLoading(false); // Stop loading after results are fetched
  };

  return (
    <div>
      {results.length > 0 && (
        <div className="w-4/5 mx-auto my-4 flex items-center space-x-4">
          <input
            type="text"
            placeholder="Enter second Student ID for comparison"
            value={compareStudentId}
            onChange={(e) => setCompareStudentId(e.target.value)}
            className="border-2 border-gray-300 p-3 rounded-lg w-full text-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={fetchCompareResults} // Use the wrapper function
            className="bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            <AiOutlineSearch size={24} />
          </button>
        </div>
      )}
      {results.length > 0 && (
        <div>
          {isLoading ? (
            <div className="flex justify-center items-center mt-8">
              <GridLoader color="#4c6ef5" size={50} /> {/* Spinner */}
            </div>
          ) : (
            <CompareCgpaChart
              results={results}
              compareResults={compareResults}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Compare;
