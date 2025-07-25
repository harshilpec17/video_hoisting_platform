import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import { fetchUserChannelProfile } from "./ChannelSlice";

export const subscriptionToggle = createAsyncThunk(
  "subscribers/subscriptionToggle",
  async (
    { channelId, loggedInUserId, userName },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await axios.post(
        `url/ch/${channelId}`,
        { loggedInUserId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("subscribed status", response.data);
        toast.success(response.data.message);
        await dispatch(fetchUserChannelProfile(userName));
        return response.data;
      }
    } catch (error) {
      console.error("Error toggling subscription:", error);
      toast.error("Failed to toggle subscription");
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSubscriberList = createAsyncThunk(
  "subscribers/fetchSubscriberList",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/url/u/${channelId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log("subscriberList", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSubscribedList = createAsyncThunk(
  "subscribers/fetchSubscribedList",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await axios.get(`/url/ch/${channelId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log("subscribedList", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const subscriberSlice = createSlice({
  name: "subscriber",
  initialState: {
    subscriberList: [],
    subscribedList: [],
    isSubscribed: null,
    subscribedData: null,
  },

  reducers: {
    setSubscriberList: (state, action) => {
      state.subscriberList = action.payload;
    },
    setSubscribedList: (state, action) => {
      state.subscribedList = action.payload;
    },
    setIsSubscribed: (state, action) => {
      state.isSubscribed = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSubscriberList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSubscriberList.fulfilled, (state, action) => {
      state.loading = false;
      state.subscriberList = action.payload;
    });
    builder.addCase(fetchSubscriberList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(fetchSubscribedList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSubscribedList.fulfilled, (state, action) => {
      state.loading = false;
      state.subscribedList = action.payload;
    });
    builder.addCase(fetchSubscribedList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(subscriptionToggle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(subscriptionToggle.fulfilled, (state, action) => {
      state.loading = false;
      state.subscribedData = action.payload;
    });
    builder.addCase(subscriptionToggle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setSubscribedList, setSubscriberList, setIsSubscribed } =
  subscriberSlice.actions;
export default subscriberSlice.reducer;
