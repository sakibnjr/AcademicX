import React, { useState } from "react";
import { Bar, Line, Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
  Filler,
} from "chart.js";
import ComparisonSummary from "./ComparisonSummary";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
);

const CompareCgpaCharts = ({ results, compareResults }) => {
  const [chartType, setChartType] = useState("bar"); // Default chart type

  const labels = results.map((semester) => semester.semesterName);

  const datasets = [
    {
      label: "Your CGPA",
      data: results.map((semester) => semester.cgpa),
      borderColor: "rgba(75, 192, 192, 1)",
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      tension: 0.4, // Smooth curve
      fill: true,
    },
    {
      label: "Competitor CGPA",
      data: compareResults.map((semester) => semester.cgpa),
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      tension: 0.4, // Smooth curve
      fill: true,
    },
  ];

  const commonOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw.toFixed(2)} CGPA`,
        },
      },
      title: {
        display: true,
        text: "Semester-wise CGPA Comparison",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "CGPA",
        },
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case "bar":
        return <Bar data={{ labels, datasets }} options={commonOptions} />;
      case "line":
        return <Line data={{ labels, datasets }} options={commonOptions} />;
      case "radar":
        return <Radar data={{ labels, datasets }} options={commonOptions} />;
      case "stackedBar":
        return (
          <Bar
            data={{
              labels,
              datasets: datasets.map((dataset) => ({
                ...dataset,
                stack: "combined",
              })),
            }}
            options={{
              ...commonOptions,
              scales: {
                x: {
                  stacked: true,
                },
                y: {
                  stacked: true,
                },
              },
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto my-4 w-4/5">
      <h2 className="mb-4 text-center text-xl font-bold">
        Semester-wise CGPA Comparison
      </h2>

      {/* Chart Type Selector */}
      <div className="mb-4 flex justify-center">
        <select
          className="select select-bordered w-1/2 md:w-1/4"
          value={chartType}
          onChange={(e) => setChartType(e.target.value)}
        >
          <option value="bar">Bar Chart</option>
          <option value="line">Line Chart</option>
          <option value="radar">Radar Chart</option>
          <option value="stackedBar">Stacked Bar Chart</option>
        </select>
      </div>

      {/* Render Selected Chart */}
      <div>{renderChart()}</div>
      {results.length > 0 && (
        <ComparisonSummary results={results} compareResults={compareResults} />
      )}
    </div>
  );
};

export default CompareCgpaCharts;
