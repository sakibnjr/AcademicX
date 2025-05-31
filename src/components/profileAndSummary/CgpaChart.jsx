import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { motion } from "framer-motion";

// Register all necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const CgpaBox = ({ results }) => {
  const data = {
    labels: results.map((semester) => semester.semesterName),
    datasets: [
      {
        label: "CGPA",
        data: results.map((semester) => semester.cgpa),
        backgroundColor: "rgba(99, 102, 241, 0.1)",
        borderColor: "rgba(99, 102, 241, 1)",
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "rgba(99, 102, 241, 1)",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        titleColor: "#1f2937",
        bodyColor: "#1f2937",
        borderColor: "rgba(99, 102, 241, 0.2)",
        borderWidth: 1,
        padding: 12,
        boxPadding: 6,
        usePointStyle: true,
        callbacks: {
          label: (tooltipItem) => `CGPA: ${tooltipItem.raw.toFixed(2)}`,
          title: (tooltipItems) => `Semester ${tooltipItems[0].label}`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
          callback: (value) => value.toFixed(2),
        },
        border: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "#6b7280",
          font: {
            size: 12,
          },
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full"
    >
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">CGPA Progress</h2>
        <p className="mt-1 text-sm text-gray-600">Track your academic performance over semesters</p>
      </div>
      <div className="h-[300px] w-full">
        <Line data={data} options={options} />
      </div>
    </motion.div>
  );
};

function CgpaChart({ results }) {
  if (!results || results.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-[300px] items-center justify-center rounded-lg border border-gray-200 bg-gray-50"
      >
        <div className="text-center">
          <p className="text-gray-500">No data available</p>
          <p className="mt-1 text-sm text-gray-400">Your CGPA history will appear here</p>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="w-full">
      <CgpaBox results={results} />
    </div>
  );
}

export default CgpaChart;
