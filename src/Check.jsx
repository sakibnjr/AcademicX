import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import ProfileAndSummary from "./ProfileAndSummary";
import MarksheetFilter from "./MarksheetFilter";
import Compare from "./Compare";
import Home from "./Home";

const App = () => {
  const [studentId, setStudentId] = useState("");
  const [compareStudentId, setCompareStudentId] = useState("");
  const [profile, setProfile] = useState(null);
  const [results, setResults] = useState([]);
  const [compareResults, setCompareResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [averageCgpa, setAverageCgpa] = useState(null);
  const [totalCreditsCompleted, setTotalCreditsCompleted] = useState(null);
  const [totalSemestersCompleted, setTotalSemestersCompleted] = useState(0);
  const [expandedSemester, setExpandedSemester] = useState(null);

  const navigate = useNavigate(); // Initialize navigate

  const semesterList = [
    { id: "213", name: "Fall 2021" },
    { id: "221", name: "Spring 2022" },
    { id: "222", name: "Summer 2022" },
    { id: "223", name: "Fall 2022" },
    { id: "231", name: "Spring 2023" },
    { id: "232", name: "Summer 2023" },
    { id: "233", name: "Fall 2023" },
    { id: "241", name: "Spring 2024" },
    { id: "242", name: "Summer 2024" },
    { id: "243", name: "Fall 2024" },
    { id: "251", name: "Spring 2025" },
  ];

  // Unified function to fetch semester data
  const fetchSemesterData = useCallback(async (semesterId, studentId) => {
    try {
      const response = await axios.get(
        `http://software.diu.edu.bd:8006/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`
      );
      return response.data;
    } catch (err) {
      console.error("Failed to fetch semester data:", err);
      return null;
    }
  }, []);

  // Fetch student profile
  const fetchStudentProfile = useCallback(async (studentId) => {
    try {
      const response = await axios.get(
        `http://software.diu.edu.bd:8006/result/studentInfo?studentId=${studentId}`
      );
      return response.data;
    } catch (err) {
      console.error("Failed to fetch student profile:", err);
      return null;
    }
  }, []);

  // Handle fetching results for the main student
  const handleFetchResults = async () => {
    if (!studentId) {
      setError("Please enter a valid Student ID.");
      return;
    }

    setLoading(true);
    setError(null);
    resetResults();

    const studentProfile = await fetchStudentProfile(studentId);
    if (!studentProfile) {
      setError("Student profile not found.");
      setLoading(false);
      return;
    }

    setProfile(studentProfile);

    // Fetch results for each semester
    const fetchedResults = await Promise.all(
      semesterList.map(async (semester) => {
        const data = await fetchSemesterData(semester.id, studentId);
        if (data && data.length > 0) {
          return {
            semesterName: semester.name,
            cgpa: data[0]?.cgpa,
            totalCredits: data.reduce(
              (total, course) => total + course.totalCredit,
              0
            ),
            data,
          };
        }
        return null;
      })
    );

    const validResults = fetchedResults.filter(Boolean);
    setResults(validResults);

    calculateSummary(validResults);

    if (validResults.length === 0) {
      setError("No data found for the provided Student ID.");
    } else {
      navigate("/"); // Navigate to overview after fetching results
    }

    setLoading(false);
  };

  // Handle comparing results for another student
  const handleCompareResults = async () => {
    if (!compareStudentId) {
      setError("Please enter a valid second Student ID.");
      return;
    }

    setLoading(true);
    setError(null);

    // Fetch results for comparison
    const fetchedCompareResults = await Promise.all(
      semesterList.map(async (semester) => {
        const data = await fetchSemesterData(semester.id, compareStudentId);
        if (data && data.length > 0) {
          return {
            semesterName: semester.name,
            cgpa: data[0]?.cgpa,
            totalCredits: data.reduce(
              (total, course) => total + course.totalCredit,
              0
            ),
            data,
          };
        }
        return null;
      })
    );

    const validCompareResults = fetchedCompareResults.filter(Boolean);
    setCompareResults(validCompareResults);

    if (validCompareResults.length > 0) {
      navigate("/compare"); // Navigate to compare page after fetching results
    } else {
      setError("No comparison data found for the provided Student ID.");
    }

    setLoading(false);
  };

  // Reset results and states
  const resetResults = () => {
    setResults([]);
    setProfile(null);
    setCompareResults([]);
    setAverageCgpa(null);
    setTotalCreditsCompleted(null);
    setTotalSemestersCompleted(0);
  };

  // Calculate summary statistics
  const calculateSummary = (semesters) => {
    if (!semesters.length) return;

    let weightedCgpaSum = semesters.reduce((total, semester) => {
      if (semester.cgpa && semester.totalCredits) {
        return total + semester.cgpa * semester.totalCredits;
      }
      return total;
    }, 0);

    let totalCredits = semesters.reduce(
      (total, semester) => total + (semester.totalCredits || 0),
      0
    );

    const avgCgpa = totalCredits > 0 ? weightedCgpaSum / totalCredits : 0;

    setAverageCgpa(avgCgpa.toFixed(2));
    setTotalCreditsCompleted(totalCredits);
    setTotalSemestersCompleted(semesters.length);
  };

  // Toggle expanded details for semesters
  const toggleSemesterDetails = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="w-4/5 mx-auto">
        <Navbar profile={profile} resetResults={resetResults} />
      </div>

      {error && (
        <div className="text-red-500 text-center my-4 font-semibold text-lg">
          {error}
        </div>
      )}

      {/* Define Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              studentId={studentId}
              setStudentId={setStudentId}
              handleFetchResults={handleFetchResults}
              profile={profile}
              averageCgpa={averageCgpa}
              totalCreditsCompleted={totalCreditsCompleted}
              totalSemestersCompleted={totalSemestersCompleted}
              results={results}
              compareResults={compareResults}
              toggleSemesterDetails={toggleSemesterDetails}
              expandedSemester={expandedSemester}
              loading={loading}
            />
          }
        />
        {/* <Route
          path="/overview"
          element={
            <ProfileAndSummary
              profile={profile}
              averageCgpa={averageCgpa}
              totalCreditsCompleted={totalCreditsCompleted}
              totalSemestersCompleted={totalSemestersCompleted}
              results={results}
              compareResults={compareResults}
              toggleSemesterDetails={toggleSemesterDetails}
              expandedSemester={expandedSemester}
              loading={loading}
            />
          }
        /> */}
        <Route path="/filter" element={<MarksheetFilter results={results} />} />
        <Route
          path="/compare"
          element={
            <Compare
              results={results}
              compareStudentId={compareStudentId}
              setCompareStudentId={setCompareStudentId}
              handleCompareResults={handleCompareResults}
              compareResults={compareResults}
            />
          }
        />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
