import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js";
import { Types } from "mongoose";

const getVideoComments = asyncHandler(async (req, res) => {
  //TODO: get all comments for a video
  const { videoId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  if (!videoId) {
    throw new ApiErrors(400, "Video Id does not exist");
  }

  const { ObjectId } = Types;
  const comment = await Comment.aggregate([
    [
      {
        $match: {
          video: new ObjectId(videoId),
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
        $project: {
          content: 1,
          owner: 1,
          user_info: {
            userName: 1,
            fullName: 1,
            avatar: 1,
            createdAt: 1,
            _id: 1,
          },
          createdAt: 1,
          updatedAt: 1,
          _id: 1,
          video: 1,
        },
      },
      {
        $skip: (page - 1) * limit,
      },
      {
        $limit: parseInt(limit),
      },
    ],
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        comment,
        "All the comments for this video fetched successfully"
      )
    );
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video

  const { videoId } = req.params;

  const { commentText } = req.body;

  if (commentText.trim === "") {
    throw new ApiErrors(400, "please add some text");
  }

  const user = await User.findById(req.user?._id).select("_id userName avatar");

  const currentVideo = await Video.findById(videoId).select("_id");

  const newComment = await Comment.create({
    content: commentText,
    owner: user,
    video: currentVideo,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, newComment, "comment has been added to the video")
    );
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment

  const { commentId } = req.params;

  const { newCommentText } = req.body;

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      $set: { content: newCommentText },
    },
    {
      new: true,
    }
  );

  if (updatedComment === null) {
    throw new ApiErrors(400, "Something went wrong");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, updatedComment, "Comment updated successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const commentId = req.params.commentId;

  const isValidObjectId = mongoose.isValidObjectId(commentId);

  if (!isValidObjectId) {
    throw new ApiErrors(400, "Comment Id is not valid");
  }

  const deleteComment = await Comment.findByIdAndDelete(commentId);

  if (deleteComment === null) {
    throw new ApiErrors(400, "There is no comment to be delete");
  }

  res
    .status(200)
    .json(200, new ApiResponse("Comment has been successfully deleted"));
});

export { getVideoComments, addComment, updateComment, deleteComment };
