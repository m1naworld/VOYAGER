import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { isLoading: false, error: null, showMention: false };

export const getCalendar = createAsyncThunk(
  "Calendar/fetchCalendar",
  async (date) => {
    let result = date;
    if (typeof date === "object") {
      result = `${date.getFullYear()}-${date.getMonth() + 1}`;
    }
    const res = await axios.post("/api/send/calendar", { date: result });
    return res.data.sendcalendar;
  }
);

export const postDailyDiary = createAsyncThunk(
  "Calendar/postCalendar",
  async (data) => {
    const res = await axios.post("/api/data/addDiary", data);
  }
);

export const CalendarSlice = createSlice({
  name: "Calendar",
  initialState,
  reducers: {
    changeLastDiary: (state, { payload }) => {
      const data = state.lastDiary.filter((m) => {
        return m.date !== payload.date;
      });
      data.push(payload);
      state.lastDiary = data;
    },
    clickedDay: (state, { payload }) => {
      state.clickedDay = payload;
    },
    editMention: (state, { payload }) => {
      state.showMention = payload;
    },
  },
  extraReducers: {
    [getCalendar.fulfilled]: (state, { payload }) => {
      state.Calendar = payload;
    },
    [postDailyDiary.pending]: (state, { payload }) => {
      state.isLoading = true;
    },
    [postDailyDiary.fulfilled]: (state, { payload }) => {
      state.isLoading = false;
      state.Calendar = payload;
    },
    [postDailyDiary.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.error;
    },
  },
});

export const { changeLastDiary, clickedDay, editMention } =
  CalendarSlice.actions;

export const getCalendarList = (state) => {
  return state.Calendar.Calendar;
};

export const getCurrentDiary = (state, date) => {
  return state.Calendar?.Calendar?.filter(
    (m) => m.date.substring(0, 10) === date
  );
};

export default CalendarSlice.reducer;
