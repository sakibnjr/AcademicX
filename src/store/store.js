import { configureStore } from '@reduxjs/toolkit';
import studentReducer from './features/studentSlice';

export const store = configureStore({
  reducer: {
    student: studentReducer,
  },
});