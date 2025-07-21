import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./createVideoSlice";
import likeReducer from "./LikeSlice";
import watchHistoryReducer from "./WatchHistorySlice";
import ChannelReducer from "./ChannelSlice";
import playlistReducer from "./PlaylistSlice";
import subscriberSlice from "./SubscriberSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    like: likeReducer,
    watchHistory: watchHistoryReducer,
    channel: ChannelReducer,
    playlist: playlistReducer,
    subscriber: subscriberSlice,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
