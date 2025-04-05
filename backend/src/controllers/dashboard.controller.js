import mongoose from "mongoose";
import { Video } from "../models/video.models.js";
// import { Subscription } from "../models/subscription.model.js";
// import { Like } from "../models/like.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.

  const userId = req?.user?._id;

  const channelStats = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "_id",
        foreignField: "owner",
        as: "videoDocument",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "likedBy",
        as: "likeDocument",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscription",
        as: "subscriberDocument",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "channelDocument",
      },
    },
    {
      $addFields: {
        totalVideos: { $size: "$videoDocument" },
        totalVideoViews: { $sum: "$videoDocument.views" },
        totalSubscribers: { $size: "$subscriberDocument" },
        totalSubsriptions: { $size: "$channelDocument" },
        totalLikes: { $size: "$likeDocument" },
      },
    },

    {
      $project: {
        totalVideos: 1,
        totalSubscribers: 1,
        totalSubsriptions: 1,
        subscriberDocument: 1,
        totalLikes: 1,
        totalVideoViews: 1,
      },
    },
  ]);

  if (!channelStats.length) {
    throw new ApiErrors(400, "No videos found for this channel");
  }
  console.log(channelStats);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        channelStats,
        "All channel stats fetched successfully"
      )
    );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel

  const userId = req?.user?._id;

  if (!userId) {
    throw new ApiErrors(400, "userId is not available");
  }

  const videos = await Video.aggregate([
    {
      $match: {
        owner: new mongoose.Types.ObjectId(userId),
      },
    },
  ]);

  if (!videos.length) {
    throw new ApiErrors(400, "No videos found");
  }

  return res.status(200).json(new ApiResponse(200, videos, "Channel videos"));
});

export { getChannelStats, getChannelVideos };
