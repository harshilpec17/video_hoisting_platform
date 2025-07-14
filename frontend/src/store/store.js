import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./createVideoSlice";
import { thunk } from "redux-thunk";

export const store = configureStore({
  reducer: {
    video: videoReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
