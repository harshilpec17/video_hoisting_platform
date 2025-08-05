import { createSlice, createAsyncThunk, current } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

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

export const deleteVideoById = createAsyncThunk(
  "video/deleteVideoById",
  async (videoId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/video/${videoId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      console.error("Error deleting video:", error);
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
  },
  reducers: {
    setVideoList: (state, action) => {
      state.videoList = action.payload;
    },
    setVideoId: (state, action) => {
      state.videoId = action.payload; // update videoId in store
    },

    setVideoLike: (state, action) => {
      state.isLiked = action.payload;
    },

    setVideoLikeCount: (state, action) => {
      state.likeCount = action.payload;
    },

    setVideoDisLike: (state, action) => {
      state.isDisliked = action.payload;
    },

    setVideoDisLikeCount: (state, action) => {
      state.disLikeCount = action.payload;
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
    builder.addCase(deleteVideoById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteVideoById.fulfilled, (state, action) => {
      state.loading = false;
      state.currentVideo = null;
    });
    builder.addCase(deleteVideoById.rejected, (state, action) => {
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
  setVideoLike,
  setVideoLikeCount,
  setVideoDisLike,
  setVideoDisLikeCount,
} = videoSlice.actions;
export default videoSlice.reducer;
