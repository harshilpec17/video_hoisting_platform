import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_BASE_URL } from "../utils/constant";
import { toast } from "react-toastify";

const TWEETS_LIMIT = 10;

// Fetch all tweets (paginated)
export const fetchAllTweets = createAsyncThunk(
  "tweets/fetchAllTweets",
  async ({ page = 1, limit = TWEETS_LIMIT }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/tweets?page=${page}&limit=${limit}`,
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

// Fetch tweets for a specific user
export const fetchUserTweets = createAsyncThunk(
  "tweets/fetchUserTweets",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/tweets/user/${userId}`,
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

// Create a new tweet
export const createTweet = createAsyncThunk(
  "tweets/createTweet",
  async (tweetText, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/tweets/create`,
        { tweetText },
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

// Update a tweet
export const updateTweet = createAsyncThunk(
  "tweets/updateTweet",
  async ({ tweetId, newTweet }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/tweets/${tweetId}`,
        { newTweet },
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

// Delete a tweet
export const deleteTweet = createAsyncThunk(
  "tweets/deleteTweet",
  async (tweetId, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/tweets/${tweetId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const handleLikeTweet = createAsyncThunk(
  "tweets/handleLikeTweet",
  async (tweetId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/like/toggle/t/${tweetId}`,
        {
          reactionType: "like",
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success("Tweet liked successfully!");

      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const handleDislikeTweet = createAsyncThunk(
  "tweets/handleDislikeTweet",
  async (tweetId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/like/toggle/t/${tweetId}`,
        {
          reactionType: "dislike",
        },
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

const tweetSlice = createSlice({
  name: "tweets",
  initialState: {
    tweets: [],
    userTweets: [],
    loading: false,
    error: null,
    hasMore: true,
    page: 1,
  },
  reducers: {
    resetTweets: (state) => {
      state.tweets = [];
      state.page = 1;
      state.hasMore = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllTweets.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload && action.payload.length < TWEETS_LIMIT) {
          state.hasMore = false;
        }
        state.tweets = action.payload || [];
      })
      .addCase(fetchAllTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.hasMore = false;
      })
      .addCase(fetchUserTweets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserTweets.fulfilled, (state, action) => {
        state.loading = false;
        state.userTweets = action.payload || [];
      })
      .addCase(fetchUserTweets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = [action.payload, ...state.tweets];
      })
      .addCase(createTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(updateTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = state.tweets.map((tweet) =>
          tweet._id === action.payload._id ? action.payload : tweet
        );
      })
      .addCase(updateTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTweet.fulfilled, (state, action) => {
        state.loading = false;
        state.tweets = state.tweets.filter(
          (tweet) => tweet._id !== action.payload._id
        );
      })
      .addCase(deleteTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(handleLikeTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleLikeTweet.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTweets = state.tweets.map((tweet) =>
          tweet._id === action.payload._id ? action.payload : tweet
        );
        state.tweets = updatedTweets;
      })
      .addCase(handleLikeTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(handleDislikeTweet.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(handleDislikeTweet.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTweets = state.tweets.map((tweet) =>
          tweet._id === action.payload._id ? action.payload : tweet
        );
        state.tweets = updatedTweets;
      })
      .addCase(handleDislikeTweet.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetTweets } = tweetSlice.actions;
export default tweetSlice.reducer;
