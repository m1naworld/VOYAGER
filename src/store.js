import { configureStore } from "@reduxjs/toolkit";
import TodayEmotionReducer from "./redux/reducer/TodayEmotion";
import ToggleReducer from "./redux/reducer/ToggleReducer";
import DailyQsReducer from "./redux/reducer/DailyQsReducer";

import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    toggle: ToggleReducer,
    data: TodayEmotionReducer,
    dailyQuestions: DailyQsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== "production",
});
