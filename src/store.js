import { configureStore } from "@reduxjs/toolkit";
import TodayEmotionReducer from "./redux/reducer/TodayEmotion";
import ToggleReducer from "./redux/reducer/ToggleReducer";
import DailyQsReducer from "./redux/reducer/DailyQsReducer";
import CalendarReducer from "./redux/reducer/CalendarReducer";

import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    toggle: ToggleReducer,
    data: TodayEmotionReducer,
    dailyQuestions: DailyQsReducer,
    Calendar: CalendarReducer,
  },
  middleware:
    process.env.NODE_ENV !== "production"
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : "",
  // devTools: process.env.NODE_ENV !== "production",
  devTools: true,
});
