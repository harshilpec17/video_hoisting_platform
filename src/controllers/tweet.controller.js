import mongoose, { isValidObjectId } from "mongoose";
import { Tweet } from "../models/tweet.models.js";
import { User } from "../models/user.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

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

  const userTweet = await Tweet.aggregate([
    {
      $match: {
        owner: userId,
      },
    },
  ]);

  console.log(userTweet);

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
      $unset: {
        content: 1,
      },
    },
    {
      new: true,
    }
  );

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

export { createTweet, getUserTweets, updateTweet, deleteTweet };
