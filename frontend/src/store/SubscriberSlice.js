import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchSubscriberList = createAsyncThunk(
  "subscribers/fetchSubscriberList",
  async (channelId, { rejectedValue }) => {
    try {
      const response = await axios.get(`/url/u/${channelId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log("subscriberList", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectedValue(error.message);
    }
  }
);

export const fetchSuscribedList = createAsyncThunk(
  "subscribers/fetchSubscribedList",
  async (channelId, { rejectedValue }) => {
    try {
      const response = await axios.get(`/url/ch/${channelId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log("subscribedList", response.data.data);
      return response.data.data;
    } catch (error) {
      return rejectedValue(error.message);
    }
  }
);

const SubscriberSlice = createSlice({
  name: "subscriber",
  initialState: {
    subscriberList: [],
    subscribedList: [],
    isSubscribed: false,
  },

  reducers: {
    setSubsriberList: (state, action) => {
      state.subscriberList = action.payload;
    },
    setSubscribedList: (state, action) => {
      state.subscribedList = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSubscriberList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchSubscriberList.fulfilled, (state, action) => {
      state.loading = false;
      state.watchHistory = action.payload;
    });
    builder.addCase(fetchSubscriberList.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
  },
});

export const { setSubscribedList, setSubsriberList } = SubscriberSlice.actions;
export default SubscriberSlice.reducer;
