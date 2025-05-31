import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaChartLine, FaUserGraduate } from "react-icons/fa";
import CompareCgpaChart from "../components/compare/CompareCgpaChart";
import GenerateReport from "../components/reports/GenerateReport";
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
    setIsLoading(true);
    await handleCompareResults();
    setIsLoading(false);
  };

  // Calculate average CGPA
  const calculateAverageCGPA = (results) => {
    if (!results || results.length === 0) return "N/A";
    const totalCGPA = results.reduce((sum, result) => sum + result.cgpa, 0);
    return (totalCGPA / results.length).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 pt-20 pb-8">
      <div className="mx-auto w-4/5">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 sm:mb-6"
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Compare Results</h1>
          <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600">
            Compare your academic performance with other students
          </p>
        </motion.div>

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 border border-slate-200 mb-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="p-1.5 rounded-lg bg-blue-100">
                <FaSearch className="text-blue-600 text-lg" />
              </div>
              <h2 className="text-lg font-semibold text-slate-800">
                Compare with Another Student
              </h2>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Enter student ID to compare"
                  value={compareStudentId}
                  onChange={(e) => setCompareStudentId(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white/50 backdrop-blur-sm text-sm"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchCompareResults}
                disabled={isLoading}
                className={`px-4 py-2 rounded-lg text-white font-medium transition-all duration-200 ${
                  isLoading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl"
                }`}
              >
                {isLoading ? (
                  <Loader />
                ) : (
                  <FaSearch className="text-lg" />
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Performance Comparison Chart */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 border border-slate-200">
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1.5 rounded-lg bg-blue-100">
                  <FaChartLine className="text-blue-600 text-lg" />
                </div>
                <h2 className="text-lg font-semibold text-slate-800">
                  Performance Comparison
                </h2>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader />
                </div>
              ) : (
                <>
                  {compareResults && compareResults.length > 0 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                        <div className="flex items-center gap-2 mb-2">
                          <FaUserGraduate className="text-blue-600" />
                          <h3 className="font-medium text-slate-800">Your Performance</h3>
                        </div>
                        <p className="text-2xl font-bold text-blue-600">
                          {calculateAverageCGPA(results)} CGPA
                        </p>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                        <div className="flex items-center gap-2 mb-2">
                          <FaUserGraduate className="text-indigo-600" />
                          <h3 className="font-medium text-slate-800">Competitor's Performance</h3>
                        </div>
                        <p className="text-2xl font-bold text-indigo-600">
                          {calculateAverageCGPA(compareResults)} CGPA
                        </p>
                      </div>
                    </div>
                  )}
                  <CompareCgpaChart
                    results={results}
                    compareResults={compareResults}
                  />
                </>
              )}
            </div>

            {/* PDF Report Generation */}
            <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 border border-slate-200">
              <GenerateReport 
                results={results} 
                compareResults={compareResults} 
              />
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Compare;
