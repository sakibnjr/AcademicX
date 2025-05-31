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
  async ({ semesterId, studentId }) => {
    const response = await axios.get(
      `/api/result?grecaptcha=&semesterId=${semesterId}&studentId=${studentId}`,
    );
    return response.data;
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
  loading: false,
  error: null,
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
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
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
      state.error = null;
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
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // Handle fetchSemesterData
      .addCase(fetchSemesterData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSemesterData.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length > 0) {
          const semesterData = {
            semesterName: action.meta.arg.semesterName,
            cgpa: action.payload[0]?.cgpa,
            totalCredits: action.payload.reduce(
              (total, course) => total + course.totalCredit,
              0,
            ),
            data: action.payload,
          };
          if (action.meta.arg.isComparison) {
            state.compareResults.push(semesterData);
          } else {
            state.results.push(semesterData);
          }
        }
      })
      .addCase(fetchSemesterData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const {
  setStudentId,
  setCompareStudentId,
  resetResults,
  calculateSummary,
  setError,
} = studentSlice.actions;

export default studentSlice.reducer;
