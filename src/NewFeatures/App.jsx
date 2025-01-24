import React, { useState, useCallback } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";

import Navbar from "./Navbar";
import Footer from "./Footer";
import MarksheetFilter from "./MarksheetFilter";
import Compare from "./Compare";
import Home from "./Home";
import NotFoundPage from "./NotFoundPage";
import ContactPage from "./Contact";
import FAQ from "./FAQ";

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
  const [retake, setRetake] = useState(false);
  const [retakeCourses, setRetakeCourses] = useState(0);

  const navigate = useNavigate(); // Initialize navigate

  const generateSemesterList = () => {
    const semesters = [];

    for (let year = 2015; year <= 2025; year++) {
      const yearSuffix = year.toString().slice(-2); // Get last two digits of the year

      // Spring semester
      semesters.push({ id: `${yearSuffix}1`, name: `Spring ${year}` });

      // Summer semester
      semesters.push({ id: `${yearSuffix}2`, name: `Summer ${year}` });

      // Fall semester
      semesters.push({ id: `${yearSuffix}3`, name: `Fall ${year}` });
    }

    return semesters;
  };

  const semesterList = generateSemesterList();

  // Unified function to fetch semester data
  const fetchSemesterData = useCallback(async (semesterId, studentId) => {
    try {
      const response = await axios.get(
        `/api/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`,
      );
      return response.data;
    } catch (err) {
      console.error("Failed to fetch semester data:", err);
      return null;
    }
  }, []);

  //function to save data in local storage with expiry
  const saveToLocalStorageWithExpiry = (key, value) => {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + 30 * 24 * 60 * 60 * 1000, // 1 month in milliseconds
    };
    localStorage.setItem(key, JSON.stringify(item));
  };

  const getFromLocalStorageWithExpiry = (key) => {
    const itemStr = localStorage.getItem(key);
    // If the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }

    const item = JSON.parse(itemStr);
    const now = new Date();

    // Compare the expiry date with the current date
    if (now.getTime() > item.expiry) {
      // If expired, remove from local storage and return null
      localStorage.removeItem(key);
      return null;
    }

    return item.value;
  };

  // Fetch student profile
  const fetchStudentProfile = useCallback(async (studentId) => {
    try {
      const response = await axios.get(
        `/api/result/studentInfo?studentId=${studentId}`,
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

    // Check if profile data is already in local storage
    const cachedProfile = getFromLocalStorageWithExpiry(`profile_${studentId}`);
    const cachedResults = getFromLocalStorageWithExpiry(`results_${studentId}`);

    // Save in local storage
    if (cachedProfile && cachedResults) {
      // Use cached data
      setProfile(cachedProfile);
      setResults(cachedResults);
      calculateSummary(cachedResults);
      setLoading(false);
      navigate("/"); // Navigate to overview after fetching results
      return;
    }

    const studentProfile = await fetchStudentProfile(studentId);
    if (!studentProfile) {
      setError("Student profile not found.");
      setLoading(false);
      return;
    }

    setProfile(studentProfile);

    // Save in local storage with expiry
    saveToLocalStorageWithExpiry(`profile_${studentId}`, studentProfile);

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
              0,
            ),
            data,
          };
        }
        return null;
      }),
    );

    const validResults = fetchedResults.filter(Boolean);
    setResults(validResults);

    // Save in local storage with expiry
    saveToLocalStorageWithExpiry(`results_${studentId}`, validResults);

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
              0,
            ),
            data,
          };
        }
        return null;
      }),
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

    // Flatten all courses across semesters
    const allCourses = semesters.flatMap((semester) =>
      semester.data.map((course) => ({
        ...course,
        semesterName: semester.semesterName, // Retain the semester info
      })),
    );

    // State to track if a course was retaken
    let isRetaken = false;
    let retakeCount = 0;

    // Create a map to track the highest CGPA for each course title
    const uniqueCourses = allCourses.reduce((map, course) => {
      const existingCourse = map.get(course.courseTitle);

      // If the same course is found, mark retake as true
      if (existingCourse) {
        isRetaken = true; // Found a retaken course
        retakeCount++;
      }

      // Update the map with the course that has the higher CGPA
      if (
        !existingCourse ||
        course.pointEquivalent > existingCourse.pointEquivalent
      ) {
        map.set(course.courseTitle, course);
      }

      return map;
    }, new Map());

    // Calculate weighted CGPA and total credits using only unique courses
    const { weightedCgpaSum, totalCredits } = Array.from(
      uniqueCourses.values(),
    ).reduce(
      (acc, course) => {
        acc.weightedCgpaSum += course.pointEquivalent * course.totalCredit;
        acc.totalCredits += course.totalCredit;
        return acc;
      },
      { weightedCgpaSum: 0, totalCredits: 0 },
    );

    // Calculate average CGPA
    const avgCgpa = totalCredits > 0 ? weightedCgpaSum / totalCredits : 0;

    // Set the calculated values
    setAverageCgpa(avgCgpa.toFixed(2));
    setTotalCreditsCompleted(totalCredits);
    setTotalSemestersCompleted(semesters.length);
    setRetake(isRetaken); // Set the retake state
    setRetakeCourses(retakeCount);
  };

  // Toggle expanded details for semesters
  const toggleSemesterDetails = (index) => {
    setExpandedSemester(expandedSemester === index ? null : index);
  };

  return (
    <div className="flex h-screen flex-col gap-10">
      <div className="mx-auto w-4/5">
        <Navbar profile={profile} resetResults={resetResults} />
      </div>

      {error && (
        <div className="my-4 text-center text-lg font-semibold text-red-500">
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
              retake={retake}
              retakeCourses={retakeCourses}
            />
          }
        />

        <Route
          path="/filter"
          element={
            results && profile ? (
              <MarksheetFilter results={results} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/compare"
          element={
            results && profile ? (
              <Compare
                results={results}
                compareStudentId={compareStudentId}
                setCompareStudentId={setCompareStudentId}
                handleCompareResults={handleCompareResults}
                compareResults={compareResults}
              />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
