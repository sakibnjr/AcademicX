import React, { useCallback, useMemo, lazy, Suspense } from "react";
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
import Home from "./pages/Home.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

// Lazy load routes for better performance
const MarksheetFilter = lazy(() => import("./pages/MarksheetFilter.jsx"));
const Compare = lazy(() => import("./pages/Compare.jsx"));
const ContactPage = lazy(() => import("./pages/Contact.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));

import generateSemesterList from "./functions/semesters.js";
import {
  setStudentId,
  setCompareStudentId,
  resetResults,
  calculateSummary,
  fetchStudentProfile,
  fetchSemesterData,
} from "./store/features/studentSlice";

// Loading component for lazy routes
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
  </div>
);

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    studentId,
    compareStudentId,
    profile,
    results,
    compareResults,
    isProfileLoading,
    isResultsLoading,
    averageCgpa,
    totalCreditsCompleted,
    totalSemestersCompleted,
    retake,
    retakeCourses,
  } = useSelector((state) => state.student);

  // Memoized callbacks to prevent unnecessary re-renders
  const handleSetStudentId = useCallback((id) => {
    dispatch(setStudentId(id));
  }, [dispatch]);

  const handleSetCompareStudentId = useCallback((id) => {
    dispatch(setCompareStudentId(id));
  }, [dispatch]);

  const handleResetResults = useCallback(() => {
    dispatch(resetResults());
  }, [dispatch]);

  // Handle fetching results for the main student
  const handleFetchResults = useCallback(async () => {
    if (!studentId) {
      toast.error("Please enter a valid Student ID.", {
        position: "top-center",
        duration: 4000,
      });
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

      const semesterResults = await Promise.all(fetchPromises);
      
      // Count successful semester fetches
      const successfulResults = semesterResults.filter(result => 
        result.payload && result.payload.data && result.payload.data.length > 0
      );

      await dispatch(calculateSummary());

      // Check actual fetched results instead of state
      if (successfulResults.length === 0) {
        toast.error("No data found for the provided Student ID.", {
          position: "top-center",
          duration: 4000,
        });
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
    }
  }, [studentId, dispatch, navigate]);

  const handleCompareResults = useCallback(async () => {
    if (!compareStudentId) {
      toast.error("Please enter a valid second Student ID.", {
        position: "top-center",
        duration: 4000,
      });
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
      }
    } catch (error) {
      toast.error(error.message || "Failed to fetch comparison results. Please try again.", {
        position: "top-center",
        duration: 4000,
      });
    }
  }, [compareStudentId, dispatch, navigate, compareResults.length]);

  // Memoized route guard condition
  const canAccessProtectedRoutes = useMemo(() => {
    return results && profile;
  }, [results, profile]);

  return (
    <div>
      <Toaster />
      <Navbar profile={profile} resetResults={handleResetResults} />

      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                studentId={studentId}
                setStudentId={handleSetStudentId}
                handleFetchResults={handleFetchResults}
                profile={profile}
                averageCgpa={averageCgpa}
                totalCreditsCompleted={totalCreditsCompleted}
                totalSemestersCompleted={totalSemestersCompleted}
                results={results}
                compareResults={compareResults}
                isProfileLoading={isProfileLoading}
                isResultsLoading={isResultsLoading}
                retake={retake}
                retakeCourses={retakeCourses}
              />
            }
          />

          <Route
            path="/filter"
            element={
              canAccessProtectedRoutes ? (
                <MarksheetFilter results={results} averageCgpa={averageCgpa} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/compare"
            element={
              canAccessProtectedRoutes ? (
                <Compare
                  results={results}
                  compareStudentId={compareStudentId}
                  setCompareStudentId={handleSetCompareStudentId}
                  handleCompareResults={handleCompareResults}
                  compareResults={compareResults}
                  isResultsLoading={isResultsLoading}
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
      </Suspense>
      <Footer />
    </div>
  );
};

export default App;
