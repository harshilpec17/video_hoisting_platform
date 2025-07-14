import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchVideoById = createAsyncThunk(
  "video/fetchVideoById",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/url/video/${videoId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      return response.data.data[0];
    } catch (error) {
      console.error("Error fetching video:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const videoSlice = createSlice({
  name: "video",
  initialState: {
    videoId: null,
    currentVideo: null,
    likeCount: 0,
    isLiked: false,
    disLikeCount: 0,
    isDisliked: false,
    videoList: [],
    // video: { data: null },
    // newVideo: null,
    // videoId: null,
    // videoList: [],
    // id: null,
    // loading: false,
    // currentVideo: null,
    // error: null,
    // likeCount: 0,
    // isLiked: false,
    // disLikeCount: 0,
    // isDisliked: false,
  },
  reducers: {
    setVideo: (state, action) => {
      state.video = action.payload;
    },
    setWatchVideo: (state, action) => {
      state.newVideo = action.payload;
    },

    setVideoList: (state, action) => {
      state.videoList = action.payload;
    },
    setVideoId: (state, action) => {
      state.videoId = action.payload; // update videoId in store
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchVideoById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload; // Set the video data
      // Add these lines to update all relevant state
      state.likeCount = action.payload.likeCount;
      state.isLiked = action.payload.isLiked;
      state.disLikeCount = action.payload.dislikeCount;
      state.isDisliked = action.payload.isDisliked;
    });
    builder.addCase(fetchVideoById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload; // Set the error
    });
  },
});

export const {
  setVideo,
  clearVideo,
  getVideoById,
  setVideoList,
  setWatchVideo,
  setVideoId,
} = videoSlice.actions;
export default videoSlice.reducer;
