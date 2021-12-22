import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  feedLoading: false,
  error: "",
  feeds: {},
  success: false,
};

export const getFeeds = createAsyncThunk("Feed/getFeed", async (count) => {
  const res = await axios.post("/api/send/feed", { count });
  return res.data;
});

export const FeedSlice = createSlice({
  name: "Feed",
  initialState,
  reducers: {
    addPeed: (state, { payload }) => {
      state.feeds = payload;
    },
  },
  extraReducers: {
    [getFeeds.pending]: (state, action) => {
      state.feedLoading = true;
    },
    [getFeeds.fulfilled]: (state, { payload }) => {
      state.feeds = payload.sendfeed;
      state.success = payload.success;
      state.feedLoading = false;
    },
    [getFeeds.rejected]: (state, action) => {
      // state.error = action.payload.response.data;
      state.feedLoading = false;
    },
  },
});

export const { addFeed } = FeedSlice.actions;

export default FeedSlice.reducer;
