import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = { isLoading: false, error: null, showMention: false };

export const getCalendar = createAsyncThunk(
  "Calendar/fetchCalendar",
  async (date) => {
    let result = date;
    if (typeof date === "object") {
      result = `${date.getFullYear()}-${date.getMonth() + 1}`;
      console.log(result);
    }
    const res = await axios.post("/api/send/calendar", { date: result });
    console.log(res);
    return res.data.sendcalendar;
  }
);

export const postDailyDiary = createAsyncThunk(
  "Calendar/postCalendar",
  async (data) => {
    console.log(data);
    const res = await axios.post("/api/data/addDiary", data);
    console.log(res);
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
      console.log(action);
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
  // return state.Calendar;
  return state.Calendar?.Calendar?.filter(
    (m) => m.date.substring(0, 10) === date
  );
};

export default CalendarSlice.reducer;
