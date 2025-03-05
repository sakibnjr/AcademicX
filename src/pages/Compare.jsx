import React, { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import CompareCgpaChart from "../components/compare/CompareCgpaChart";
import Loader from "../components/Loader";

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
        <div className="mx-auto my-4 flex w-4/5 items-center space-x-4">
          <input
            type="text"
            placeholder="Enter second Student ID for comparison"
            value={compareStudentId}
            onChange={(e) => setCompareStudentId(e.target.value)}
            className="w-full rounded-lg border-2 border-gray-300 p-3 text-lg focus:ring-2 focus:ring-indigo-500"
          />
          <button
            onClick={fetchCompareResults} // Use the wrapper function
            className="rounded-lg bg-primaryDark p-3 text-white transition duration-300"
          >
            <AiOutlineSearch size={24} />
          </button>
        </div>
      )}
      {results.length > 0 && (
        <div>
          {isLoading ? (
            <div className="m-8 flex items-center justify-center">
              <Loader /> {/* Spinner */}
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
