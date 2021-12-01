import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  오늘의감정: {
    행복: [],
    분노: [],
    슬픔: [],
    두려움: [],
  },
  checked: {
    행복: 0,
    분노: 0,
    슬픔: 0,
    두려움: 0,
  },
  arr: [],
};

export const postList = createAsyncThunk("POST_LIST", async (state) => {
  console.log(state);
  const res = await axios.post(
    "http://192.168.0.129:3000/add/send",
    state.data.오늘의감정
  );
  return res;
});

export const getList = createAsyncThunk("GET_LIST", async () => {
  const res = await axios.get("http://192.168.0.61:3001/add/send");
  return res.data;
});
export const todayEmotionSlice = createSlice({
  name: "todayEmotion",
  initialState,
  reducers: {
    add: (state, action) => {
      const emotion = Object.keys(action.payload.value)[0];
      const value = action.payload.value[emotion];
      state.오늘의감정[emotion].push(value);
    },
    edit: (state, action) => {
      const emotion = action.payload.emotion;
      const result = action.payload.result[emotion];
      state.오늘의감정[emotion] = [...result];
    },
    filterData: (state, action) => {
      const { label, emotion, val: value } = action.payload;

      const result = state.오늘의감정[emotion].filter(
        (m) => m.label !== label || (m.label === label && m.value !== value)
      );
      state.checked[emotion] = result.length;
      state.오늘의감정[emotion] = [...result];
    },
    addCheck: (state, action) => {
      const emotion = action.payload.emotion;
      state.checked[emotion] = action.payload.len;
    },
  },
  extraReducers: {
    [getList.fulfilled]: (state, { payload }) => {
      state.arr = payload;
    },
    [postList.fulfilled]: (state, { payload }) => {
      console.log(payload);
    },
  },
});

export const { add, edit, filterData, addCheck } = todayEmotionSlice.actions;

export const selectData = (state) => state.data.오늘의감정;

export const postData = (state) => state.data;

export const getChecked = (state) => state.data.checked;

export default todayEmotionSlice.reducer;
