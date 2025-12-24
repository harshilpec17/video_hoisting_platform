import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

export const fetchWatchHistory = createAsyncThunk(
  "watchHistory/fetchWatchHistory",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/${API_BASE_URL}/history/${userId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log("Watch history fetched successfully:", response.data);

      return response.data.data;
    } catch (error) {
      console.error("Error fetch the watch History", error);
      return rejectWithValue(error.message);
    }
  }
);

const watchHistorySlice = createSlice({
  name: "watchHistory",
  initialState: {
    watchHistory: [],
    loading: false,
    error: null,
  },
  reducers: {
    setWatchHistory: (state, action) => {
      state.watchHistory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchWatchHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWatchHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.watchHistory = action.payload;
    });
    builder.addCase(fetchWatchHistory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setWatchHistory } = watchHistorySlice.actions;
export default watchHistorySlice.reducer;
