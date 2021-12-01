import { configureStore } from "@reduxjs/toolkit";
import TodayEmotionReducer from "./redux/reducer/TodayEmotion";
import ToggleReducer from "./redux/reducer/ToggleReducer";

import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    toggle: ToggleReducer,
    data: TodayEmotionReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
