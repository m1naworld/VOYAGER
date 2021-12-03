import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  DailyQuestions: {
    qs: [],
    answer: [],
  },
};

export const getDailyQs = createAsyncThunk(
  "dailyQuestions/fetchQs",
  async () => {
    const res = await axios.get("/send/dailyQ");
    return res.data.data;
  }
);

export const DailyQsSlice = createSlice({
  name: "dailyQuestions",
  initialState,
  reducers: {},
  extraReducers: {
    [getDailyQs.fulfilled]: (state, { payload }) => {
      state.DailyQuestions.qs = payload;
    },
  },
});

export default DailyQsSlice.reducer;
