import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import generateSemesterList from "../../functions/semesters";

// Async thunks
export const fetchStudentProfile = createAsyncThunk(
  "student/fetchProfile",
  async (studentId) => {
    const response = await axios.get(
      `/api/result/studentInfo?studentId=${studentId}`,
    );
    return response.data;
  },
);

export const fetchSemesterData = createAsyncThunk(
  "student/fetchSemesterData",
  async ({ semesterId, studentId, semesterName, isComparison = false }) => {
    const response = await axios.get(
      `/api/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`,
    );
    return { data: response.data, semesterName, isComparison };
  },
);

const initialState = {
  studentId: "",
  compareStudentId: "",
  profile: null,
  results: [],
  compareResults: [],
  averageCgpa: null,
  totalCreditsCompleted: null,
  totalSemestersCompleted: 0,
  retake: false,
  retakeCourses: 0,
  isProfileLoading: false,
  isResultsLoading: false,
  pendingRequests: 0,
};

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    setStudentId: (state, action) => {
      state.studentId = action.payload;
    },
    setCompareStudentId: (state, action) => {
      state.compareStudentId = action.payload;
    },
    resetResults: (state) => {
      state.studentId = "";
      state.results = [];
      state.profile = null;
      state.compareResults = [];
      state.averageCgpa = null;
      state.totalCreditsCompleted = null;
      state.totalSemestersCompleted = 0;
      state.retake = false;
      state.retakeCourses = 0;
      state.isProfileLoading = false;
      state.isResultsLoading = false;
      state.pendingRequests = 0;
    },
    calculateSummary: (state) => {
      const semesters = state.results;
      if (!semesters.length) return;

      // Flatten all courses across semesters
      const allCourses = semesters.flatMap((semester) =>
        semester.data.map((course) => ({
          ...course,
          semesterName: semester.semesterName,
        })),
      );

      let isRetaken = false;
      let retakeCount = 0;

      // Create a map to track the highest CGPA for each course title
      const uniqueCourses = allCourses.reduce((map, course) => {
        const existingCourse = map.get(course.courseTitle);

        if (existingCourse) {
          isRetaken = true;
          retakeCount++;
        }

        if (
          !existingCourse ||
          course.pointEquivalent > existingCourse.pointEquivalent
        ) {
          map.set(course.courseTitle, course);
        }

        return map;
      }, new Map());

      // Calculate weighted CGPA and total credits
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

      const avgCgpa = totalCredits > 0 ? weightedCgpaSum / totalCredits : 0;

      state.averageCgpa = avgCgpa.toFixed(2);
      state.totalCreditsCompleted = totalCredits;
      state.totalSemestersCompleted = semesters.length;
      state.retake = isRetaken;
      state.retakeCourses = retakeCount;
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetchStudentProfile
      .addCase(fetchStudentProfile.pending, (state) => {
        state.isProfileLoading = true;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.isProfileLoading = false;
        state.profile = action.payload;
      })
      .addCase(fetchStudentProfile.rejected, (state) => {
        state.isProfileLoading = false;
      })
      // Handle fetchSemesterData
      .addCase(fetchSemesterData.pending, (state) => {
        state.pendingRequests += 1;
        state.isResultsLoading = true;
      })
      .addCase(fetchSemesterData.fulfilled, (state, action) => {
        state.pendingRequests -= 1;
        if (state.pendingRequests <= 0) {
          state.isResultsLoading = false;
          state.pendingRequests = 0;
        }

        if (action.payload.data && action.payload.data.length > 0) {
          const semesterData = {
            semesterName: action.payload.semesterName,
            cgpa: action.payload.data[0]?.cgpa,
            totalCredits: action.payload.data.reduce(
              (total, course) => total + course.totalCredit,
              0,
            ),
            data: action.payload.data,
          };
          if (action.payload.isComparison) {
            state.compareResults.push(semesterData);
          } else {
            state.results.push(semesterData);
          }
        }
      })
      .addCase(fetchSemesterData.rejected, (state) => {
        state.pendingRequests -= 1;
        if (state.pendingRequests <= 0) {
          state.isResultsLoading = false;
          state.pendingRequests = 0;
        }
      });
  },
});

export const {
  setStudentId,
  setCompareStudentId,
  resetResults,
  calculateSummary,
} = studentSlice.actions;

export default studentSlice.reducer;
