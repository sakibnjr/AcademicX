const ComparisonSummary = ({ results, compareResults }) => {
  const calculateDifference = (result, compareResult) => {
    if (!result || !compareResult) return 0;
    return (result.cgpa - compareResult.cgpa).toFixed(2);
  };

  const highestCgpa = (result, compareResult) => {
    if (!result || !compareResult) return null;
    return result.cgpa > compareResult.cgpa ? "Your CGPA" : "Comparison CGPA";
  };

  const overallComparison = () => {
    let totalDifference = 0;
    let highestCount = { yourCGPA: 0, comparisonCGPA: 0 };

    results.forEach((semester, index) => {
      const compareSemester = compareResults[index];
      const diff = calculateDifference(semester, compareSemester);
      totalDifference += Math.abs(diff);

      if (semester.cgpa > compareSemester.cgpa) highestCount.yourCGPA++;
      if (semester.cgpa < compareSemester.cgpa) highestCount.comparisonCGPA++;
    });

    return {
      totalDifference: totalDifference.toFixed(2),
      highestCount,
    };
  };

  const { totalDifference, highestCount } = overallComparison();

  return (
    <div className="my-4">
      <h2 className="text-center text-xl font-bold mb-4">Comparison Summary</h2>
      <div className="text-center">
        <p>
          <strong>Total CGPA Difference: </strong> {totalDifference} CGPA
        </p>
        <p>
          <strong>Higher CGPA in Semester-wise Comparison:</strong>
        </p>
        {results.map((semester, index) => {
          const diff = calculateDifference(semester, compareResults[index]);
          return (
            <p key={index}>
              <strong>{semester.semesterName}: </strong>
              {highestCgpa(semester, compareResults[index])} ({diff} CGPA)
            </p>
          );
        })}

        <div className="mt-4">
          <h3 className="text-lg">Overall Comparison</h3>
          <p>
            <strong>
              Your CGPA is higher in {highestCount.yourCGPA} semester(s).
            </strong>
          </p>
          <p>
            <strong>
              Comparison CGPA is higher in {highestCount.comparisonCGPA}{" "}
              semester(s).
            </strong>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComparisonSummary;
