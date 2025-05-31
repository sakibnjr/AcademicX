import React from "react";
import { FaChartLine, FaArrowUp, FaArrowDown, FaEquals } from "react-icons/fa";

const ComparisonSummary = ({ results, compareResults }) => {
  const calculateDifference = (result, compareResult) => {
    if (!result || !compareResult) return 0;
    return (result.cgpa - compareResult.cgpa).toFixed(2);
  };

  const highestCgpa = (result, compareResult) => {
    if (!result || !compareResult) return null;
    return result.cgpa > compareResult.cgpa ? "Your CGPA" : "Competitor CGPA";
  };

  const overallComparison = () => {
    const calculateAverageCgpa = (semesters) => {
      const { totalCgpa, totalCredits } = semesters.reduce(
        (acc, semester) => {
          if (semester.cgpa && semester.totalCredits) {
            acc.totalCgpa += semester.cgpa * semester.totalCredits;
            acc.totalCredits += semester.totalCredits;
          }
          return acc;
        },
        { totalCgpa: 0, totalCredits: 0 },
      );

      return totalCredits > 0 ? totalCgpa / totalCredits : 0;
    };

    const yourAverageCgpa = calculateAverageCgpa(results);
    const comparisonAverageCgpa = calculateAverageCgpa(compareResults);
    const difference = yourAverageCgpa - comparisonAverageCgpa;
    const totalDifference = {
      value: Math.abs(difference).toFixed(2),
      direction: difference > 0 ? "higher" : "lower",
    };

    let highestCount = { yourCGPA: 0, comparisonCGPA: 0, equal: 0 };

    results.forEach((semester, index) => {
      const compareSemester = compareResults[index];
      if (semester && compareSemester) {
        if (semester.cgpa > compareSemester.cgpa) highestCount.yourCGPA++;
        else if (semester.cgpa < compareSemester.cgpa) highestCount.comparisonCGPA++;
        else highestCount.equal++;
      }
    });

    return {
      totalDifference,
      highestCount,
    };
  };

  const { totalDifference, highestCount } = overallComparison();

  return (
    <div className="space-y-6">
      {/* Overall Performance Card */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200">
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 rounded-lg bg-green-100">
            <FaChartLine className="text-green-600 text-lg" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">
            Overall Performance
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Your CGPA Higher */}
          <div className="bg-green-50 rounded-lg p-4 border border-green-100">
            <div className="flex items-center gap-2 mb-1">
              <FaArrowUp className="text-green-600" />
              <span className="text-sm font-medium text-green-700">Your CGPA Higher</span>
            </div>
            <div className="text-2xl font-bold text-green-600">{highestCount.yourCGPA}</div>
            <div className="text-sm text-green-600">semesters</div>
          </div>

          {/* Competitor CGPA Higher */}
          <div className="bg-red-50 rounded-lg p-4 border border-red-100">
            <div className="flex items-center gap-2 mb-1">
              <FaArrowDown className="text-red-600" />
              <span className="text-sm font-medium text-red-700">Competitor CGPA Higher</span>
            </div>
            <div className="text-2xl font-bold text-red-600">{highestCount.comparisonCGPA}</div>
            <div className="text-sm text-red-600">semesters</div>
          </div>

          {/* Equal CGPA */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-1">
              <FaEquals className="text-slate-600" />
              <span className="text-sm font-medium text-slate-700">Equal CGPA</span>
            </div>
            <div className="text-2xl font-bold text-slate-600">{highestCount.equal}</div>
            <div className="text-sm text-slate-600">semesters</div>
          </div>
        </div>

        {/* Total Difference */}
        <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">Total CGPA Difference</span>
            <span className={`text-lg font-bold ${totalDifference.direction === 'higher' ? 'text-green-600' : 'text-red-600'}`}>
              {totalDifference.value} Points {totalDifference.direction}
            </span>
          </div>
        </div>
      </div>

      {/* Semester-wise Comparison */}
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-4">
          Semester-wise Comparison
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Semester</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">Higher CGPA</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-slate-600">CGPA Difference</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {results.map((semester, index) => {
                const compareSemester = compareResults[index];
                const diff = calculateDifference(semester, compareSemester);
                const isHigher = diff > 0;
                return (
                  <tr key={index} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 text-sm text-slate-600">
                      {semester?.semesterName || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                        isHigher 
                          ? 'bg-green-100 text-green-700' 
                          : diff < 0 
                            ? 'bg-red-100 text-red-700'
                            : 'bg-slate-100 text-slate-700'
                      }`}>
                        {isHigher ? <FaArrowUp className="text-xs" /> : diff < 0 ? <FaArrowDown className="text-xs" /> : <FaEquals className="text-xs" />}
                        {highestCgpa(semester, compareSemester)}
                      </span>
                    </td>
                    <td className={`py-3 px-4 text-sm font-medium ${
                      isHigher ? 'text-green-600' : diff < 0 ? 'text-red-600' : 'text-slate-600'
                    }`}>
                      {diff} CGPA
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSummary;
