import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

export const togglePublishVideo = createAsyncThunk(
  "dashboard/togglePublishVideo",
  async ({ toggleValue, videoId }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/toggle/publish/${videoId}`,
        {
          toggleValue,
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchChannelDashboard = createAsyncThunk(
  "dashboard/fetchChannelDashboard",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/dashboard/stats/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: {
    dashboardData: null,
    loading: false,
    error: null,
    toggleData: null,
  },
  reducers: {
    setDashboardData: (state, action) => {
      state.dashboardData = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelDashboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchChannelDashboard.fulfilled, (state, action) => {
        state.dashboardData = action.payload;
        state.loading = false;
      })
      .addCase(fetchChannelDashboard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(togglePublishVideo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(togglePublishVideo.fulfilled, (state, action) => {
        state.toggleData = action.payload;
        state.loading = false;
      })
      .addCase(togglePublishVideo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDashboardData } = dashboardSlice.actions;
export default dashboardSlice.reducer;
