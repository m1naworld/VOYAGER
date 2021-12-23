import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  qsLoading: false,
  color: null,
  id: null,
  qs: {
    questions: "",
    answer: [],
    qsList: [],
  },
  daily: {
    qs: [],
    answer: [],
  },
};

export const getSurveyQs = createAsyncThunk(
  "dailyQuestions/fetchSurveyQs",
  async () => {
    const res = await axios.get("/api/send/surveyQuestion");
    return res.data.question;
  }
);

export const getDailyQs = createAsyncThunk(
  "dailyQuestions/fetchDailyQs",
  async () => {
    const res = await axios.get("/api/send/dailyQuestion");
    return res.data.question;
  }
);

export const postDailyQs = createAsyncThunk(
  "dailyQuestions/postDailyQs",
  async (data) => {
    const res = await axios.post("/api/data/addDaily", data);
    return res.data;
  }
);

export const postSurveyQs = createAsyncThunk(
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
      return res.data;
    } catch (err) {
      return err.response;
    }
  }
);

export const DailyQsSlice = createSlice({
  name: "dailyQuestions",
  initialState,
  reducers: {
    addAnswer: (state, { payload }) => {
      const data = state.daily.answer.filter((m) => m.label !== payload.label);
      data.push(payload);
      state.daily.answer = data;
    },
    addTextAnswer: (state, { payload }) => {
      const data = state.qs.answer.filter((m) => m.index !== payload.index);
      data.push(payload);
      state.qs.answer = data;
    },
  },
  extraReducers: {
    [getDailyQs.pending]: (state, { payload }) => {
      state.qsLoading = true;
    },
    [getDailyQs.fulfilled]: (state, { payload }) => {
      state.qs.question = payload._id;
      state.qs.qsList = payload.data;
      state.qsLoading = false;
    },
    [getDailyQs.rejected]: (state, { payload }) => {
      state.qsLoading = false;
    },
    [getSurveyQs.pending]: (state, { payload }) => {
      state.qsLoading = true;
    },
    [getSurveyQs.fulfilled]: (state, { payload }) => {
      state.daily.qs = payload;
      state.qsLoading = false;
    },
    [getSurveyQs.rejected]: (state, { payload }) => {
      state.qsLoading = false;
    },
    [postSurveyQs.pending]: (state, action) => {
      state.qsLoading = true;
    },
    [postSurveyQs.fulfilled]: (state, { payload }) => {
      state.qsLoading = false;
      state.color = payload.data.color;
    },
    [postSurveyQs.rejected]: (state, action) => {
      state.qsLoading = false;
    },
    [postDailyQs.pending]: (state, action) => {
      state.qsLoading = true;
    },
    [postDailyQs.fulfilled]: (state, { payload }) => {
      state.qsLoading = false;
    },
    [postDailyQs.rejected]: (state, { payload }) => {
      state.qsLoading = false;
    },
  },
});

export const { addAnswer, addTextAnswer } = DailyQsSlice.actions;

export default DailyQsSlice.reducer;
