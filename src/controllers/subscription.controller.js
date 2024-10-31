import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
// import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params[start];

  const user = await User.findByIdAndUpdate(
    req._id,
    {
      $set: {
        Subscription: channelId,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "subscribed successfully"));

  // TODO: toggle subscription
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  console.log(channelId);

  const user = await Subscription.findByIdAndUpdate(
    req._id,
    {
      $set: {
        Subscription: channelId,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, user, "subscribed successfully"));
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const user = await Subscription.findOne(req._id);

  console.log(user);
  return res.json(new ApiResponse(200, user));
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
