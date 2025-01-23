import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Add PointElement
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register all necessary components
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement, // Register PointElement
  Title,
  Tooltip,
  Legend,
);

const CgpaChart = ({ results }) => {
  const data = {
    labels: results.map((semester) => semester.semesterName),
    datasets: [
      {
        label: "",
        data: results.map((semester) => semester.cgpa),
        backgroundColor: "rgba(110, 167, 240, 1)",
        borderColor: "rgba(24, 112, 224, 1)",
        borderWidth: 2,
        fill: true, // Fill under the line
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: false,
        text: "",
      },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.raw.toFixed(2)} CGPA`,
        },
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
    elements: {
      line: {
        tension: 0.4, // Smooth line
      },
    },
  };

  return (
    <div className="my-4">
      <h2 className="mb-4 text-center text-xl font-bold">Semester-wise SGPA</h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default CgpaChart;
