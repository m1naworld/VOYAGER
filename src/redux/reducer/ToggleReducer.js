import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  isLoading: true,
  isStart: false,
  user: {
    id: "",
  },
  cookie: {
    accessToken: "",
    refreshToken: "",
  },
};

export const ToggleSlice = createSlice({
  name: "ToggleState",
  initialState,
  reducers: {
    toggleLogin: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    editUser: (state, action) => {
      state.user.id = action.payload;
    },
    checkLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    checkStart: (state, action) => {
      console.log(action.payload);
      state.isStart = action.payload;
    },
  },
});

export const { toggleLogin, editUser, checkLoading, checkStart } =
  ToggleSlice.actions;

export default ToggleSlice.reducer;
