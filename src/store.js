import { configureStore } from "@reduxjs/toolkit";

import DailyQsReducer from "./DailyQsReducer";

import logger from "redux-logger";

export const store = configureStore({
  reducer: {
    dailyQuestions: DailyQsReducer,
  },
  middleware:
    process.env.NODE_ENV !== "production"
      ? (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
      : "",
  devTools: true,
});
