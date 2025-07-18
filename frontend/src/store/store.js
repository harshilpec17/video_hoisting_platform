import { configureStore } from "@reduxjs/toolkit";
import videoReducer from "./createVideoSlice";
import likeReducer from "./LikeSlice";
import watchHistoryReducer from "./WatchHistorySlice";
import ChannelReducer from "./ChannelSlice";
import playlistReducer from "./PlaylistSlice";

export const store = configureStore({
  reducer: {
    video: videoReducer,
    like: likeReducer,
    watchHistory: watchHistoryReducer,
    channel: ChannelReducer,
    playlist: playlistReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
