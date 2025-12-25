import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/user.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Types } from "mongoose";

const createTweet = asyncHandler(async (req, res) => {
  //TODO: create tweet
  const { tweetText } = req.body;

  if (tweetText.trim() === "") {
    throw new ApiErrors(400, "Please add some text");
  }

  const user = await User.findById(req.user?._id).select("_id userName avatar");

  const newTweet = await Tweet.create({
    content: tweetText,
    owner: user,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, newTweet, "Tweet added to the database"));
});

const getUserTweets = asyncHandler(async (req, res) => {
  // TODO: get user tweets
  const { userId } = req.params;

  if (!userId) {
    throw new ApiErrors(400, "UserId does not exist");
  }

  const { ObjectId } = Types;

  const userTweet = await Tweet.aggregate([
    [
      {
        $match: {
          owner: new ObjectId(userId),
        },
      },

      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "user_info",
        },
      },
      {
        $addFields: {
          user_info: {
            $arrayElemAt: ["$user_info", 0],
          },
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "tweet",
          as: "likes",
        },
      },
      {
        $addFields: {
          likes: { $ifNull: ["$likes", []] },
        },
      },
      {
        $addFields: {
          likeCount: {
            $size: {
              $filter: {
                input: "$likes",
                as: "like",
                cond: { $eq: ["$$like.reaction", "like"] },
              },
            },
          },
          dislikeCount: {
            $size: {
              $filter: {
                input: "$likes",
                as: "dislike",
                cond: { $eq: ["$$dislike.reaction", "dislike"] },
              },
            },
          },
          isLiked: {
            $gt: [
              {
                $size: {
                  $filter: {
                    input: "$likes",
                    as: "like",
                    cond: {
                      $and: [
                        { $eq: ["$$like.reaction", "like"] },
                        {
                          $eq: [
                            "$$like.likedBy",
                            new mongoose.Types.ObjectId(req.user?._id),
                          ],
                        },
                      ],
                    },
                  },
                },
              },
              0,
            ],
          },
          isDisliked: {
            $gt: [
              {
                $size: {
                  $filter: {
                    input: "$likes",
                    as: "dislike",
                    cond: {
                      $and: [
                        { $eq: ["$$dislike.reaction", "dislike"] },
                        {
                          $eq: [
                            "$$dislike.likedBy",
                            new mongoose.Types.ObjectId(req.user?._id),
                          ],
                        },
                      ],
                    },
                  },
                },
              },
              0,
            ],
          },
        },
      },

      {
        $project: {
          content: 1,
          owner: 1,
          user_info: {
            userName: 1,
            fullName: 1,
            avatar: 1,
          },
          createdAt: 1,
          likeCount: 1,
          dislikeCount: 1,
          isLiked: 1,
          isDisliked: 1,
        },
      },
    ],
  ]);

  if (!userTweet?.length === 0) {
    throw new ApiErrors(404, "userTweet does not exist");
  }

  res
    .status(200)
    .json(new ApiResponse(200, userTweet, "User tweet fetched successfully"));
});

const updateTweet = asyncHandler(async (req, res) => {
  //TODO: update tweet

  const paramsId = req.params.tweetId;

  const isIdObjectValid = isValidObjectId(paramsId);

  if (!isIdObjectValid) {
    throw new ApiErrors(400, "Please provide a true Id");
  }

  const { newTweet } = req.body;

  if (newTweet === "") {
    throw new ApiErrors(400, "Please add some text");
  }

  const updateTweet = await Tweet.findByIdAndUpdate(
    paramsId,
    {
      $set: {
        content: newTweet,
      },
    },
    {
      new: true,
    }
  );

  if (updateTweet === null) {
    throw new ApiErrors(400, "Tweet could not be found");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updateTweet, "Account Details Update Successfully")
    );
});

const deleteTweet = asyncHandler(async (req, res) => {
  //TODO: delete tweet

  const paramsId = req.params.tweetId;

  const isIdObjectValid = mongoose.isValidObjectId(paramsId);

  if (!isIdObjectValid) {
    throw new ApiErrors(400, "Please provide a true Id");
  }

  const deleteTweet = await Tweet.findByIdAndDelete(paramsId);

  if (deleteTweet === null) {
    throw new ApiErrors(400, "There are no tweet available to delete");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, deleteTweet, "Tweet deleted successfully"));
});

const getAllTweets = asyncHandler(async (req, res) => {
  // Get page and limit from query, set defaults
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const tweets = await Tweet.aggregate([
    { $sort: { createdAt: -1 } },
    { $skip: skip },
    { $limit: limit },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "user_info",
      },
    },
    { $addFields: { user_info: { $arrayElemAt: ["$user_info", 0] } } },

    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "tweet",
        as: "likes",
      },
    },
    {
      $addFields: {
        likes: { $ifNull: ["$likes", []] },
      },
    },
    {
      $addFields: {
        likeCount: {
          $size: {
            $filter: {
              input: "$likes",
              as: "like",
              cond: { $eq: ["$$like.reaction", "like"] },
            },
          },
        },
        dislikeCount: {
          $size: {
            $filter: {
              input: "$likes",
              as: "dislike",
              cond: { $eq: ["$$dislike.reaction", "dislike"] },
            },
          },
        },
        isLiked: {
          $gt: [
            {
              $size: {
                $filter: {
                  input: "$likes",
                  as: "like",
                  cond: {
                    $and: [
                      { $eq: ["$$like.reaction", "like"] },
                      {
                        $eq: [
                          "$$like.likedBy",
                          new mongoose.Types.ObjectId(req.user?._id),
                        ],
                      },
                    ],
                  },
                },
              },
            },
            0,
          ],
        },
        isDisliked: {
          $gt: [
            {
              $size: {
                $filter: {
                  input: "$likes",
                  as: "dislike",
                  cond: {
                    $and: [
                      { $eq: ["$$dislike.reaction", "dislike"] },
                      {
                        $eq: [
                          "$$dislike.likedBy",
                          new mongoose.Types.ObjectId(req.user?._id),
                        ],
                      },
                    ],
                  },
                },
              },
            },
            0,
          ],
        },
      },
    },
    {
      $project: {
        content: 1,
        owner: 1,
        createdAt: 1,
        user_info: { userName: 1, fullName: 1, avatar: 1 },
        likeCount: 1,
        dislikeCount: 1,
        isLiked: 1,
        isDisliked: 1,
      },
    },
  ]);

  res
    .status(200)
    .json(new ApiResponse(200, tweets, "All tweets fetched successfully"));
});

export { createTweet, getUserTweets, updateTweet, deleteTweet, getAllTweets };
