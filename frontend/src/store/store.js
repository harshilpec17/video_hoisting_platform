import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./createVideoSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
  },
});
