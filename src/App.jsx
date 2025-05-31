import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import MarksheetFilter from "./pages/MarksheetFilter.jsx";
import Compare from "./pages/Compare.jsx";
import Home from "./pages/Home.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import ContactPage from "./pages/Contact.jsx";
import FAQ from "./pages/FAQ.jsx";

import generateSemesterList from "./functions/semesters.js";
import {
  setStudentId,
  setCompareStudentId,
  resetResults,
  calculateSummary,
  fetchStudentProfile,
  fetchSemesterData,
  setError,
} from "./store/features/studentSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    studentId,
    compareStudentId,
    profile,
    results,
    compareResults,
    loading,
    error,
    averageCgpa,
    totalCreditsCompleted,
    totalSemestersCompleted,
    retake,
    retakeCourses,
  } = useSelector((state) => state.student);

  // Handle fetching results for the main student
  const handleFetchResults = async () => {
    if (!studentId) {
      toast.error("Please enter a valid Student ID.", {
        position: "top-center",
        duration: 4000,
      });
      dispatch(setError("Please enter a valid Student ID."));
      return;
    }

    dispatch(resetResults());

    try {
      // Fetch student profile
      const profileResult = await dispatch(fetchStudentProfile(studentId)).unwrap();
      
      if (!profileResult) {
        toast.error("Student profile not found.", {
          position: "top-center",
          duration: 4000,
        });
        dispatch(setError("Student profile not found."));
        return;
      }

      // Fetch results for each semester
      const semesterList = generateSemesterList();
      const fetchPromises = semesterList.map((semester) =>
        dispatch(fetchSemesterData({ 
          semesterId: semester.id, 
          studentId,
          semesterName: semester.name 
        }))
      );

      await Promise.all(fetchPromises);
      dispatch(calculateSummary());

      if (results.length === 0) {
        toast.error("No data found for the provided Student ID.", {
          position: "top-center",
          duration: 4000,
        });
        dispatch(setError("No data found for the provided Student ID."));
      } else {
        toast.success("Results fetched successfully!", {
          position: "top-center",
          duration: 3000,
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch results. Please try again.", {
        position: "top-center",
        duration: 4000,
      });
      dispatch(setError(error.message));
    }
  };

  const handleCompareResults = async () => {
    if (!compareStudentId) {
      toast.error("Please enter a valid second Student ID.", {
        position: "top-center",
        duration: 4000,
      });
      dispatch(setError("Please enter a valid second Student ID."));
      return;
    }

    try {
      // Fetch results for each semester for comparison
      const semesterList = generateSemesterList();
      const fetchPromises = semesterList.map((semester) =>
        dispatch(fetchSemesterData({ 
          semesterId: semester.id, 
          studentId: compareStudentId,
          semesterName: semester.name,
          isComparison: true 
        }))
      );

      await Promise.all(fetchPromises);

      if (compareResults.length > 0) {
        toast.success("Comparison results fetched successfully!", {
          position: "top-center",
          duration: 3000,
        });
        navigate("/compare");
      } else {
        toast.error("No comparison data found for the provided Student ID.", {
          position: "top-center",
          duration: 4000,
        });
        dispatch(setError("No comparison data found for the provided Student ID."));
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch comparison results. Please try again.", {
        position: "top-center",
        duration: 4000,
      });
      dispatch(setError(error.message));
    }
  };

  return (
    <div>
      <Toaster />
      <Navbar profile={profile} resetResults={() => dispatch(resetResults())} />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              studentId={studentId}
              setStudentId={(id) => dispatch(setStudentId(id))}
              handleFetchResults={handleFetchResults}
              profile={profile}
              averageCgpa={averageCgpa}
              totalCreditsCompleted={totalCreditsCompleted}
              totalSemestersCompleted={totalSemestersCompleted}
              results={results}
              compareResults={compareResults}
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
              <MarksheetFilter results={results} averageCgpa={averageCgpa} />
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
                setCompareStudentId={(id) => dispatch(setCompareStudentId(id))}
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
