import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

export const fetchLikedVideos = createAsyncThunk(
  "like/fetchLikedVideos",
  async ({ userId, reaction }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/like/videos/${reaction}/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      console.error("Error fetching liked videos:", error);
      return rejectWithValue(error.response.data);
    }
  }
);

const likeSlice = createSlice({
  name: "like",
  initialState: {
    likedVideo: [],
    loading: false,
    error: null,
  },

  reducers: {
    setLikedVideo: (state, action) => {
      state.likedVideo = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchLikedVideos.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLikedVideos.fulfilled, (state, action) => {
      state.likedVideo = action.payload;
      state.loading = false;
    });
    builder.addCase(fetchLikedVideos.rejected, (state, action) => {
      state.loading = false;
      console.error("Failed to fetch liked videos:", action.payload);
    });
  },
});
export const { setLikedVideo } = likeSlice.actions;
export default likeSlice.reducer;
