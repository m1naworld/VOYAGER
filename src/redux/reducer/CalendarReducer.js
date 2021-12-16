import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import myAxios from "../../hooks/myAxios";

const initialState = {};

export const getCalendar = createAsyncThunk(
  "Calendar/fetchCalendar",
  async () => {
    const res = await axios.get("/api/send/calendar");
    return res.data.calendar;
  }
);

export const postDailyDiary = createAsyncThunk(
  "Calendar/postCalendar",
  async (data) => {
    const res = myAxios("/api/data/addDiary", data);
    return res.data;
  }
);

export const CalendarSlice = createSlice({
  name: "Calendar",
  initialState,
  reducers: {
    changeLastDiary: (state, { payload }) => {
      const data = state.lastDiary.filter((m) => {
        console.log(m.date === payload.date);
        return m.date !== payload.date;
      });
      data.push(payload);
      state.lastDiary = data;
    },
    // getDiary: (state, { payload }) => {
    //   const data = state.lastDiary.filter((m) => m.date === payload);
    // },
    clickedDay: (state, { payload }) => {
      console.log(payload);
      state.clickedDay = payload;
    },
  },
  extraReducers: {
    [getCalendar.fulfilled]: (state, { payload }) => {
      state.Calendar = payload;
    },
    [postDailyDiary.pending]: (state, { payload }) => {
      state.Calendar.isLoading = true;
    },
    [postDailyDiary.fulfilled]: (state, { payload }) => {
      state.Calendar.lastDiary = payload;
    },
    [postDailyDiary.rejected]: (state, { payload }) => {
      state.Calendar.lastDiary.error = payload;
    },
  },
});

export const { changeLastDiary, clickedDay } = CalendarSlice.actions;

export const getCalendarList = (state) => {
  return state.Calendar.Calendar.diary.data;
};

export const getCurrentDiary = (state, date) => {
  return state.Calendar.Calendar.diary.data.filter(
    (m) => m.date.substring(0, 10) === date
  );
};

export default CalendarSlice.reducer;
