import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {};

export const getCalendar = createAsyncThunk(
  "Calendar/fetchCalendar",
  async () => {
    const res = await axios.get("/send/calendar");
    return res.data.calendar;
  }
);

export const CalendarSlice = createSlice({
  name: "Calendar",
  initialState,
  reducers: {},
  extraReducers: {
    [getCalendar.fulfilled]: (state, { payload }) => {
      state.Calendar = payload;
    },
  },
});

export const getCalendarList = (state) => {
  return state.Calendar;
};

export default CalendarSlice.reducer;
