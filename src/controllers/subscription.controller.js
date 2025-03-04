import mongoose, { isValidObjectId } from "mongoose";
import { User } from "../models/user.models.js";
import { Subscription } from "../models/subscription.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { response } from "express";

const toggleSubscription = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  // TODO: toggle subscription

  if (!channelId) {
    throw new ApiErrors(400, "channelId is not available");
  }

  const channelIdNew = new mongoose.Types.ObjectId(channelId);
  const userIdNew = new mongoose.Types.ObjectId(req.user?._id);

  const existingSubscriber = await Subscription.findOne({
    subscription: userIdNew,
    channel: channelIdNew,
  });

  if (existingSubscriber) {
    await Subscription.findByIdAndDelete(existingSubscriber);

    return res
      .status(200)
      .json(new ApiResponse(200, "User unsubscribe the channel"));
  }

  const createSubscription = await Subscription.create({
    subscription: req.user?._id,
    channel: channelId,
  });

  if (!createSubscription) {
    throw new ApiErrors(500, "something went wrong while susbscribing");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, createSubscription, "user subscribed this channel")
    );
});

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
  const { channelId } = req.params;
  console.log(channelId);

  if (!channelId) {
    throw new ApiErrors(400, "channelId is not available");
  }

  const subscriber = await Subscription.aggregate([
    {
      $match: {
        channel: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "subscription",
        foreignField: "_id",
        as: "subscriber",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channel",
              as: "subscribedToSubscriber",
            },
          },
          {
            $addFields: {
              subscribedToSubscriber: {
                $cond: {
                  if: {
                    $in: [channelId, "$subscribedToSubscriber"],
                  },
                  then: true,
                  else: false,
                },
              },
              subscriberCount: {
                $size: "$subscribedToSubscriber",
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscriber",
    },
    {
      $project: {
        _id: 0,
        subscriber: {
          _id: 1,
          username: 1,
          fullName: 1,
          avatar: 1,
          subscribedToSubscriber: 1,
          subscribersCount: 1,
        },
      },
    },
  ]);
  if (!subscriber?.length) {
    throw new ApiErrors(400, "No subscribers found");
  }

  const subscribersList = subscriber.map((item) => item.subscriber);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        subscribersList,
        "List of subscribers fetched successfully"
      )
    );
});

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
  const { channelId } = req.params;

  if (!isValidObjectId(channelId)) {
    throw new ApiErrors(400, "Invalid subscriber ID");
  }

  const channel = await Subscription.aggregate([
    {
      $match: {
        subscription: new mongoose.Types.ObjectId(channelId),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "channel",
        foreignField: "_id",
        as: "subscribedChannel",
        pipeline: [
          {
            $lookup: {
              from: "videos",
              localField: "_id",
              foreignField: "owner",
              as: "allVideos",
            },
          },
          {
            $addFields: {
              latestVideo: {
                $last: "$allVideos",
              },
            },
          },
        ],
      },
    },
    {
      $unwind: "$subscribedChannel",
    },
    {
      $project: {
        _id: 0,
        subscribedChannel: {
          _id: 1,
          userName: 1,
          fullName: 1,
          avatar: 1,
          latestVideo: {
            videoFile: 1,
            thumbnail: 1,
            title: 1,
            description: 1,
          },
        },
      },
    },
  ]);

  console.log(channel);

  if (!channel?.length) {
    throw new ApiErrors(400, "No subscribed channel found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel, "List of channel fetxhed successfully ")
    );
});

export { toggleSubscription, getUserChannelSubscribers, getSubscribedChannels };
