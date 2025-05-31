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
import { FaChartBar, FaChartLine, FaChartPie, FaLayerGroup } from "react-icons/fa";
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
  const [chartType, setChartType] = useState("bar");

  const labels = results.map((semester) => semester.semesterName);

  const datasets = [
    {
      label: "Your CGPA",
      data: results.map((semester) => semester.cgpa),
      borderColor: "rgb(34, 197, 94)", // green-500
      backgroundColor: "rgba(34, 197, 94, 0.2)",
      tension: 0.4,
      fill: true,
    },
    {
      label: "Competitor CGPA",
      data: compareResults.map((semester) => semester.cgpa),
      borderColor: "rgb(239, 68, 68)", // red-500
      backgroundColor: "rgba(239, 68, 68, 0.2)",
      tension: 0.4,
      fill: true,
    },
  ];

  const commonOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
        labels: {
          padding: 20,
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1e293b",
        bodyColor: "#1e293b",
        borderColor: "#e2e8f0",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw.toFixed(2)} CGPA`,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(226, 232, 240, 0.5)",
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          color: "#64748b",
        },
        title: {
          display: true,
          text: "CGPA",
          font: {
            size: 12,
            family: "'Inter', sans-serif",
          },
          color: "#64748b",
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
            family: "'Inter', sans-serif",
          },
          color: "#64748b",
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
                  grid: {
                    display: false,
                  },
                },
                y: {
                  stacked: true,
                  grid: {
                    color: "rgba(226, 232, 240, 0.5)",
                  },
                },
              },
            }}
          />
        );
      default:
        return null;
    }
  };

  const chartTypes = [
    { value: "bar", label: "Bar Chart", icon: FaChartBar },
    { value: "line", label: "Line Chart", icon: FaChartLine },
    { value: "radar", label: "Radar Chart", icon: FaChartPie },
    { value: "stackedBar", label: "Stacked Bar", icon: FaLayerGroup },
  ];

  return (
    <div className="space-y-6">
      {/* Chart Type Selector */}
      <div className="flex flex-wrap gap-2">
        {chartTypes.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setChartType(value)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 ${
              chartType === value
                ? "bg-blue-100 text-blue-600"
                : "bg-slate-100 text-slate-600 hover:bg-slate-200"
            }`}
          >
            <Icon className="text-lg" />
            {label}
          </button>
        ))}
      </div>

      {/* Chart Container */}
      <div className="h-[400px] bg-white/50 backdrop-blur-sm rounded-lg p-4 border border-slate-200">
        {renderChart()}
      </div>

      {/* Comparison Summary */}
      {results.length > 0 && (
        <ComparisonSummary results={results} compareResults={compareResults} />
      )}
    </div>
  );
};

export default CompareCgpaCharts;
