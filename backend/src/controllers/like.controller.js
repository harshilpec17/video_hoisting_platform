import mongoose, { isValidObjectId, Types } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  //TODO: toggle like on video
  const { reactionType } = req.body;

  if (!["like", "dislike"].includes(reactionType)) {
    throw new ApiErrors(400, "Please send the like or dislike value only");
  }

  const isValidObject = isValidObjectId(videoId);

  if (!isValidObject) {
    throw new ApiErrors(400, "Provide the correct User or Video ID");
  }

  const user = await User.findById(req.user?._id).select("_id userName avatar");

  const userObjectId = new mongoose.Types.ObjectId(user._id);
  const videoObjectId = new mongoose.Types.ObjectId(videoId);

  const existingReaction = await Like.findOne({
    video: videoObjectId,
    likedBy: userObjectId,
  });

  if (existingReaction) {
    if (existingReaction.reaction === reactionType) {
      await Like.findByIdAndDelete(existingReaction);
      return res
        .status(200)
        .json(new ApiResponse(200, `User ${reactionType} has been removed`));
    } else {
      const updatedReaction = await Like.findByIdAndUpdate(
        existingReaction._id,
        {
          $set: {
            reaction: reactionType,
          },
        },
        {
          new: true,
        }
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedReaction,
            `User updated the comment reaction from ${existingReaction.reaction} to ${reactionType}`
          )
        );
    }
  }

  const newReaction = await Like.create({
    video: videoId,
    likedBy: user._id,
    reaction: reactionType,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, `User ${reactionType} this Video`));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment

  const { reactionType } = req.body;

  if (!["like", "dislike"].includes(reactionType)) {
    throw new ApiErrors(400, "Please send the like or dislike value only");
  }

  const isValidObject = isValidObjectId(commentId);

  if (!isValidObject) {
    throw new ApiErrors(400, "Provide the correct User or Video ID");
  }

  const user = await User.findById(req.user?._id).select("_id userName avatar");

  const userObjectId = new mongoose.Types.ObjectId(user._id);
  const commentObjectId = new mongoose.Types.ObjectId(commentId);

  const existingReaction = await Like.findOne({
    comment: commentObjectId,
    likedBy: userObjectId,
  });

  if (existingReaction) {
    if (existingReaction.reaction === reactionType) {
      await Like.findByIdAndDelete(existingReaction);
      return res
        .status(200)
        .json(new ApiResponse(200, `user ${reactionType} has been removed`));
    } else {
      const updatedReaction = await Like.findByIdAndUpdate(
        existingReaction._id,
        {
          $set: {
            reaction: reactionType,
          },
        },
        {
          new: true,
        }
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedReaction,
            `User updated the comment reaction from ${existingReaction.reaction} to ${reactionType}`
          )
        );
    }
  }

  const newLike = await Like.create({
    comment: commentId,
    likedBy: user._id,
    reaction: reactionType,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newLike, `User ${reactionType} this comment`));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet

  const { reactionType } = req.body;

  if (!["like", "dislike"].includes(reactionType)) {
    throw new ApiErrors(400, "Please send the like or dislike value only");
  }

  const isValidObject = isValidObjectId(tweetId);

  if (!isValidObject) {
    throw new ApiErrors(400, "Provide the correct User or Tweet ID");
  }

  const user = await User.findById(req.user?._id).select("_id userName avatar");

  const userObjectId = new mongoose.Types.ObjectId(user._id);
  const tweetObjectId = new mongoose.Types.ObjectId(tweetId);

  const existingReaction = await Like.findOne({
    tweet: tweetObjectId,
    likedBy: userObjectId,
  });

  if (existingReaction) {
    if (existingReaction.reaction === reactionType) {
      await Like.findByIdAndDelete(existingReaction);
      return res
        .status(200)
        .json(new ApiResponse(200, `User ${reactionType} has been removed`));
    } else {
      const updatedReaction = await Like.findByIdAndUpdate(
        existingReaction._id,
        {
          $set: {
            reaction: reactionType,
          },
        },
        {
          new: true,
        }
      );

      return res
        .status(200)
        .json(
          new ApiResponse(
            200,
            updatedReaction,
            `User updated the tweet reaction from ${existingReaction.reaction} to ${reactionType}`
          )
        );
    }
  }

  const newLike = await Like.create({
    tweet: tweetId,
    likedBy: user._id,
    reaction: reactionType,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newLike, `User ${reactionType} this Tweet`));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos

  const { userId, videoType } = req.params;

  if (!userId) {
    throw new ApiErrors(400, "UserId does not exist");
  }

  const { ObjectId } = Types;

  const userLikedVideo = await Like.aggregate([
    {
      $match: { likedBy: new ObjectId(userId) },
    },
    {
      $match: {
        video: { $exists: true, $ne: null },
        reaction: videoType,
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "video",
        foreignField: "_id",
        as: "likedVideoByUser",
      },
    },
    {
      $unwind: {
        path: "$likedVideoByUser",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "likedBy",
        foreignField: "_id",
        as: "owner",
      },
    },
    {
      $unwind: {
        path: "$owner",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $project: {
        _id: 1,
        reaction: 1,

        owner: {
          _id: 1,
          userName: 1,
          avatar: 1,
        },
        likedVideoByUser: {
          _id: 1,
          videoFile: 1,
          thumbnail: 1,
          title: 1,
          description: 1,
          duration: 1,
          views: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
    },
  ]);

  if (userLikedVideo?.length === 0) {
    throw new ApiErrors(404, `User does not ${videoType} any Video`);
  }

  console.log(userLikedVideo);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        userLikedVideo,
        "User Liked video fetched successfully"
      )
    );
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
