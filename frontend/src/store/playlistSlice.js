import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";

// Fetch all playlists for a user
export const fetchPlaylists = createAsyncThunk(
  "playlist/fetchPlaylists",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/playlist/get-playlist/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      return response.data.data || [];
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add a new playlist
export const addPlaylist = createAsyncThunk(
  "playlist/addPlaylist",
  async ({ name, description }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/playlist`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Delete a playlist
export const deletePlaylist = createAsyncThunk(
  "playlist/deletePlaylist",
  async (playlistId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_BASE_URL}/playlist/${playlistId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      return playlistId;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update playlist title and description
export const updatePlaylist = createAsyncThunk(
  "playlist/updatePlaylist",
  async ({ playlistId, name, description }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/playlist/${playlistId}`,
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const playlistSlice = createSlice({
  name: "playlist",
  initialState: {
    playlists: [],
    loading: false,
    error: null,
  },
  reducers: {
    setPlaylists: (state, action) => {
      state.playlists = action.payload;
    },
    clearPlaylists: (state) => {
      state.playlists = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchPlaylists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPlaylists.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = action.payload || [];
      })
      .addCase(fetchPlaylists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.playlists = [];
      })
      // Add
      .addCase(addPlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addPlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists.push(action.payload);
      })
      .addCase(addPlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deletePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        state.playlists = state.playlists.filter(
          (playlist) => playlist._id !== action.payload
        );
      })
      .addCase(deletePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updatePlaylist.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePlaylist.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.playlists.findIndex(
          (playlist) => playlist._id === action.payload._id
        );
        if (idx !== -1) {
          state.playlists[idx] = action.payload;
        }
      })
      .addCase(updatePlaylist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setPlaylists, clearPlaylists } = playlistSlice.actions;
export default playlistSlice.reducer;
