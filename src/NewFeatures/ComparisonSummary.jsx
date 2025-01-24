import React from "react";

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
    let totalDifference = 0;
    let highestCount = { yourCGPA: 0, comparisonCGPA: 0 };

    results.forEach((semester, index) => {
      const compareSemester = compareResults[index];
      if (semester && compareSemester) {
        const diff = calculateDifference(semester, compareSemester);
        totalDifference += Math.abs(diff);

        if (semester.cgpa > compareSemester.cgpa) highestCount.yourCGPA++;
        if (semester.cgpa < compareSemester.cgpa) highestCount.comparisonCGPA++;
      }
    });

    return {
      totalDifference: totalDifference.toFixed(2),
      highestCount,
    };
  };

  const { totalDifference, highestCount } = overallComparison();

  return (
    <div className="mt-8 rounded-lg bg-gray-100 p-6 shadow-lg">
      <h2 className="mb-6 text-center text-2xl font-bold">
        Comparison Summary
      </h2>

      {/* Total CGPA Difference */}
      <div className="mb-6 border-l-4 border-blue-500 bg-blue-50 p-4">
        <p className="font-semibold">
          <span className="text-blue-600">Total CGPA Difference:</span>{" "}
          {totalDifference} CGPA
        </p>
      </div>

      {/* Semester-wise Comparison */}
      <h3 className="mb-4 text-lg font-semibold">Semester-wise Comparison</h3>
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">Semester</th>
              <th className="border border-gray-300 p-2">Higher CGPA</th>
              <th className="border border-gray-300 p-2">CGPA Difference</th>
            </tr>
          </thead>
          <tbody>
            {results.map((semester, index) => {
              const compareSemester = compareResults[index];
              const diff = calculateDifference(semester, compareSemester);
              return (
                <tr
                  key={index}
                  className={diff > 0 ? "bg-green-50" : "bg-red-50"}
                >
                  <td className="border border-gray-300 p-2">
                    {semester?.semesterName || "N/A"}
                  </td>
                  <td className="border border-gray-300 p-2">
                    {highestCgpa(semester, compareSemester)}
                  </td>
                  <td
                    className={`border border-gray-300 p-2 ${diff > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {diff} CGPA
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Overall Comparison Section */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold">Overall Comparison</h3>
        <p className="mt-2">
          Your CGPA is higher in{" "}
          <strong>{highestCount.yourCGPA} semester(s)</strong>.
        </p>
        <p>
          Competitor CGPA is higher in{" "}
          <strong>{highestCount.comparisonCGPA} semester(s)</strong>.
        </p>
      </div>
    </div>
  );
};

export default ComparisonSummary;
