import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./videoSlice.js";
import likeSlice from "./likeSlice.js";
import watchHistorySlice from "./watchHistorySlice.js";
import channelSlice from "./channelSlice_temp.js";
import playlistSlice from "./playlistSlice_temp.js";
import subscriberSlice from "./subscriberSlice_temp.js";
import tweetSlice from "./tweetSlice_temp.js";
import loaderSlice from "./loaderSlice.js";

export const store = configureStore({
  reducer: {
    video: videoSlice,
    like: likeSlice,
    watchHistory: watchHistorySlice,
    channel: channelSlice,
    playlist: playlistSlice,
    subscriber: subscriberSlice,
    tweet: tweetSlice,
    loader: loaderSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
