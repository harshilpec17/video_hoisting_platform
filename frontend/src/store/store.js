import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./videoSlice";
import likeSlice from "./likeSlice";
import watchHistorySlice from "./watchHistorySlice";
import channelSlice from "./channelSlice";
import playlistSlice from "./playlistSlice";
import subscriberSlice from "./subscriberSlice";

export const store = configureStore({
  reducer: {
    video: videoSlice,
    like: likeSlice,
    watchHistory: watchHistorySlice,
    channel: channelSlice,
    playlist: playlistSlice,
    subscriber: subscriberSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
