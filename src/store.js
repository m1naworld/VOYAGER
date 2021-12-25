import { configureStore } from "@reduxjs/toolkit";
import ToggleReducer from "./redux/reducer/ToggleReducer";
import DailyQsReducer from "./redux/reducer/DailyQsReducer";
import CalendarReducer from "./redux/reducer/CalendarReducer";
import FeedReducer from "./redux/reducer/FeedReducer";

import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    toggle: ToggleReducer,
    dailyQuestions: DailyQsReducer,
    Calendar: CalendarReducer,
    Feed: FeedReducer,
  },
  middleware:
    process.env.NODE_ENV !== "production"
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : (getDefaultMiddleware) => getDefaultMiddleware(),
  devTools: process.env.NODE_ENV !== "production",
  // devTools: true,
});
