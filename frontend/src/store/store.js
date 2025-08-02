import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./videoSlice.js";
import likeSlice from "./likeSlice.js";
import watchHistorySlice from "./watchHistorySlice.js";
import channelSlice from "./channelSlice.js";
import playlistSlice from "./playlistSlice.js";
import subscriberSlice from "./subscriberSlice.js";
import tweetSlice from "./tweetSlice.js";
import loaderSlice from "./loaderSlice.js";
import dashboardSlice from "./dashboardSlice.js";

export const store = configureStore({
  reducer: {
    video: videoSlice,
    like: likeSlice,
    watchHistory: watchHistorySlice,
    channel: channelSlice,
    playlist: playlistSlice,
    subscriber: subscriberSlice,
    tweet: tweetSlice,
    dashboard: dashboardSlice,
    loader: loaderSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
