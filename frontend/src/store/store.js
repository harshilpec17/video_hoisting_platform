import { configureStore } from "@reduxjs/toolkit";
import videoSlice from "./createVideoSlice";
import likeSlice from "./LikeSlice";
import watchHistorySlice from "./WatchHistorySlice";
import channelSlice from "./ChannelSlice";
import playlistSlice from "./PlaylistSlice";
import subscriberSlice from "./SubscriberSlice";

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
