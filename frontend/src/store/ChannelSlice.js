import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchChannelVideo = createAsyncThunk(
  "fetchChannelVideo",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/url/dashboard/videos/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log(response.data.data);

      return response.data.data;
    } catch (error) {
      console.error("Error fetching channel videos:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchUserChannelProfile = createAsyncThunk(
  "fetchUserChannelProfile",
  async (userName, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/url/c/${userName}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching channel data:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const ChannelSlice = createSlice({
  name: "channel",
  initialState: {
    channelVideos: [],
    channelProfile: [],
    loading: false,
    error: null,
  },
  reducers: {
    setChannelVideos: (state, action) => {
      state.channelVideos = action.payload;
    },

    setChannelProfile: (state, action) => {
      state.channelProfile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChannelVideo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchChannelVideo.fulfilled, (state, action) => {
      state.channelVideos = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchChannelVideo.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.error("Failed to fetch channel videos:", action.payload);
    });

    builder.addCase(fetchUserChannelProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserChannelProfile.fulfilled, (state, action) => {
      state.channelProfile = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchUserChannelProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      console.error("Failed to fetch channel videos:", action.payload);
    });
  },
});

export const { setChannelVideos, setChannelProfile } = ChannelSlice.actions;
export default ChannelSlice.reducer;
