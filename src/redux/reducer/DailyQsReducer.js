import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  qsLoading: false,

  qs: [],
  answer: [],
};

export const getDailyQs = createAsyncThunk(
  "dailyQuestions/fetchQs",
  async () => {
    const res = await axios.get("/api/send/surveyQuestion");
    return res.data.question;
  }
);

export const postDailyQs = createAsyncThunk(
  "dailyQuestions/postQs",
  async (data) => {
    let target = 0;
    let result = {};
    const emotion = ["happy", "sad", "joy", "anger"];
    let num = 0;
    for (let i = 0; i < data.length; i++) {
      target = target + data[i].answer;
      if (i % 3 === 2) {
        result[emotion[num]] = target;
        target = 0;
        num++;
      }
    }
    try {
      const res = await axios.post("/api/data/addColor", result);
      return res;
    } catch (err) {
      return err;
    }
  }
);

export const DailyQsSlice = createSlice({
  name: "dailyQuestions",
  initialState,
  reducers: {
    addAnswer: (state, { payload }) => {
      const data = state.answer.filter((m) => m.label !== payload.label);
      data.push(payload);
      state.answer = data;
    },
  },
  extraReducers: {
    [getDailyQs.pending]: (state, { payload }) => {
      state.qsLoading = true;
    },
    [getDailyQs.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.qs = payload;
      state.qsLoading = false;
    },
    [getDailyQs.rejected]: (state, { payload }) => {
      state.qsLoading = false;
    },
    [postDailyQs.pending]: (state, action) => {
      console.log(action);
    },
    [postDailyQs.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
    [postDailyQs.rejected]: (state, action) => {
      console.log(action);
    },
  },
});

export const { addAnswer } = DailyQsSlice.actions;

export default DailyQsSlice.reducer;
