import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  isStart: false,
  user: {
    nickname: null,
  },
  cookie: {
    accessToken: "",
    refreshToken: "",
  },
};

export const getUser = createAsyncThunk("GET_USER", async () => {
  const res = await axios.get("/api/send/user").then((res) => {
    return res;
  });
  return res.data;
});

export const ToggleSlice = createSlice({
  name: "ToggleState",
  initialState,
  reducers: {
    toggleLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    editUser: (state, action) => {
      state.user = action.payload;
    },
    checkLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    checkStart: (state, action) => {
      console.log(action.payload);
      state.isStart = action.payload;
    },
    changeImage: (state, { payload }) => {
      state.user.img = payload;
    },
    changeNickname: (state, { payload }) => {
      state.user.nickname = payload;
    },
    editError: (state, { payload }) => {
      state.errorMessage = payload;
    },
  },
  extraReducers: {
    [getUser.fulfilled]: (state, { payload }) => {
      state.user = payload.user;
    },
  },
});

export const getError = (state) => state.toggle.errorMessage;

export const {
  toggleLogin,
  editUser,
  checkLoading,
  checkStart,
  changeImage,
  changeNickname,
  editError,
} = ToggleSlice.actions;

export default ToggleSlice.reducer;
