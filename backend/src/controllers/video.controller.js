import mongoose, { isValidObjectId } from "mongoose";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { Types } from "mongoose";
import { Like } from "../models/like.model.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query,
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;

  const filter = {};

  // If a query is provided, filter by title
  if (query) {
    filter.title = { $regex: query, $options: "i" }; // Case-insensitive search
  }

  // If a userId is provided, filter by owner
  if (userId) {
    filter.owner = new Types.ObjectId(userId);
  }

  const sortOrder = sortType === "asc" ? 1 : -1;
  const sort = { [sortBy]: sortOrder };

  const skip = (page - 1) * limit;

  // Fetch videos based on filters, sort, and pagination
  const videos = await Video.find(filter)
    .sort(sort)
    .skip(skip)
    .limit(parseInt(limit))
    .populate("owner", "userName avatar"); // Populate owner details

  const total = await Video.countDocuments(filter);

  return res.status(200).json(
    new ApiResponse(200, videos, {
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
    })
  );
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video

  if (!title.trim() === "") {
    throw new ApiErrors(400, "Video Title Required");
  }

  if (!description.trim() === "") {
    throw new ApiErrors(400, "Video Description Required");
  }

  let videoFileLocalPath;

  if (
    req.files &&
    Array.isArray(req.files?.videoFile) &&
    req.files?.videoFile.length > 0
  ) {
    videoFileLocalPath = req.files?.videoFile[0]?.path;
  }

  if (!videoFileLocalPath) {
    throw new ApiErrors(400, "video file is required");
  }

  let thumbnailLocalPath;

  if (
    req.files &&
    Array.isArray(req.files?.thumbnail) &&
    req.files?.thumbnail.length > 0
  ) {
    thumbnailLocalPath = req.files?.thumbnail[0]?.path;
  }

  if (!thumbnailLocalPath) {
    throw new ApiErrors(400, "thumbnail file is required");
  }

  const user = await User.findById(req.user?._id).select("_id userName avatar");

  const video = await uploadOnCloudinary(videoFileLocalPath);
  const thumbnail = await uploadOnCloudinary(thumbnailLocalPath);

  const newVideo = await Video.create({
    videoFile: video.url,
    thumbnail: thumbnail.url,
    description: description,
    title: title,
    duration: video.duration,
    isPublished: true,
    owner: user,
    views: 0,
  });

  console.log(video);

  return res
    .status(200)
    .json(new ApiResponse(200, newVideo, "Video uploaded successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  //TODO: get video by id
  const videoId = req.params.videoId;

  const isIdObjectValid = isValidObjectId(videoId);

  if (!isIdObjectValid) {
    throw new ApiErrors(400, "Please provide a true Id");
  }

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(videoId),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "video",
        as: "likes",
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
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "subscribedTo",
              as: "subscribers",
            },
          },
          {
            $addFields: {
              subscriberCount: {
                $size: "$subscribers",
              },
              isSubscribed: {
                $cond: {
                  if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                  then: true,
                  else: false,
                },
              },
            },
          },

          {
            $project: {
              _id: 1,
              userName: 1,
              avatar: 1,
              subscriberCount: 1,
              isSubscribed: 1,
            },
          },
        ],
      },
    },
    // {
    //   $addFields: {
    //     likeCount: {
    //       $size: "$likes",
    //     },
    //     owner: {
    //       $first: "$owner",
    //     },
    //     isLiked: {
    //       $cond: {
    //         if: { $in: [req.user?._id, "$likes.likedBy"] },
    //         then: true,
    //         else: false,
    //       },
    //     },
    //   },
    // },

    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        videoFile: 1,
        thumbnail: 1,
        duration: 1,
        views: 1,
        isPublished: 1,
        createdAt: 1,
        updatedAt: 1,
        likeCount: 1,
        dislikeCount: 1,
        owner: 1,
        isLiked: 1,
        isDisliked: 1,
      },
    },
  ]);

  if (video === null || video === undefined) {
    throw new ApiErrors(400, "video does not exist");
  }

  await Video.findByIdAndUpdate(
    videoId,
    {
      $inc: {
        views: 1,
      },
    },
    {
      new: true,
    }
  );

  const watch = await User.findByIdAndUpdate(
    req.user._id,
    {
      $addToSet: {
        watchHistory: videoId,
      },
    },
    {
      new: true,
    }
  ).select("watchHistory");

  console.log(watch);

  res
    .status(200)
    .json(new ApiResponse(200, video, "Video has been found successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;

  // Validate video ID
  if (!isValidObjectId(videoId)) {
    return res.status(400).json(new ApiResponse(400, null, "Invalid video ID"));
  }

  // Fetch existing video
  const oldVideo = await Video.findById(videoId);
  if (!oldVideo) {
    return res.status(404).json(new ApiResponse(404, null, "Video not found"));
  }

  const { newTitle, newDescription } = req.body;
  const updateFields = {};

  // Title validation
  if (newTitle && newTitle.trim() !== "" && newTitle !== oldVideo.title) {
    updateFields.title = newTitle;
  }

  //check the description is same or empty or undefined
  if (
    newDescription &&
    newDescription.trim() !== "" &&
    newDescription !== oldVideo.description
  ) {
    updateFields.description = newDescription;
  }

  // Thumbnail update
  let newThumbnailPath;
  if (req.file) {
    newThumbnailPath = req.file.path;
    try {
      const newUpdatedThumbnail = await uploadOnCloudinary(newThumbnailPath);
      if (!newUpdatedThumbnail?.url) {
        return res
          .status(500)
          .json(new ApiResponse(500, null, "Cloudinary upload failed"));
      }
      updateFields.thumbnail = newUpdatedThumbnail.url;
    } catch (err) {
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Cloudinary upload error"));
    }
  }

  // If no changes
  if (Object.keys(updateFields).length === 0) {
    return res
      .status(400)
      .json(new ApiResponse(400, null, "No changes detected"));
  }

  // Update video
  let updatedVideoDetails;
  try {
    updatedVideoDetails = await Video.findByIdAndUpdate(
      videoId,
      { $set: updateFields },
      { new: true }
    );
  } catch (err) {
    return res
      .status(500)
      .json(new ApiResponse(500, null, "Database update failed"));
  }

  // Delete old thumbnail from Cloudinary if updated
  if (updateFields.thumbnail && oldVideo?.thumbnail) {
    try {
      await deleteFromCloudinary(oldVideo.thumbnail);
    } catch (err) {
      // Log error but don't fail the request
      console.error("Failed to delete old thumbnail from Cloudinary:", err);
    }
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedVideoDetails, "Details updated successfully")
    );
});

const deleteVideo = asyncHandler(async (req, res) => {
  //TODO: delete video
  const videoId = req.params.videoId;

  const isObjectIdValid = isValidObjectId(videoId);

  if (!isObjectIdValid) {
    throw new ApiErrors(400, "Please provide the right ID");
  }

  const deleteVideo = await Video.findByIdAndDelete(videoId);

  if (deleteVideo === null) {
    throw new ApiErrors(400, "No video found to be deleted");
  }

  console.log(deleteVideo);

  return res
    .status(200)
    .json(new ApiResponse(200, deleteVideo, "Video deleted Successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;

  const isObjectIdValid = isValidObjectId(videoId);

  if (!isObjectIdValid) {
    throw new ApiErrors(400, "Please provide the right ID");
  }

  const { toggleValue } = req.body;

  let statusMessage;

  if (toggleValue === "true") {
    statusMessage = "Video has been published";
  } else {
    statusMessage = "Video has been removed from public";
  }

  const publishVideoStatusUpdate = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        isPublished: toggleValue,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, publishVideoStatusUpdate, statusMessage));
});

const getVideoLikes = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;

  const isObjectIdValid = isValidObjectId(videoId);

  if (!isObjectIdValid) {
    throw new ApiErrors(400, "Please provide the right ID");
  }

  const video = await Like.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
        reaction: "like",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "likeCount",
        foreignField: "video",
        as: "likeCount",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "owner",
        foreignField: "likedBy",
        as: "owner",
      },
    },
    {
      $group: {
        _id: "$video", // Group by video ID
        likeCount: { $sum: 1 }, // Count the number of likes
      },
    },

    {
      $project: {
        _id: 0,
        videoId: "$_id",
        likeCount: 1,
      },
    },
  ]);

  if (!video) {
    throw new ApiErrors(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video likes retrieved successfully"));
});

const getVideoDisLikes = asyncHandler(async (req, res) => {
  const videoId = req.params.videoId;

  const isObjectIdValid = isValidObjectId(videoId);

  if (!isObjectIdValid) {
    throw new ApiErrors(400, "Please provide the right ID");
  }

  const video = await Like.aggregate([
    {
      $match: {
        video: new mongoose.Types.ObjectId(videoId),
        reaction: "dislike",
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "dislikeCount",
        foreignField: "video",
        as: "dislikeCount",
      },
    },
    {
      $group: {
        _id: "$video", // Group by video ID
        dislikeCount: { $sum: 1 }, // Count the number of likes
      },
    },

    {
      $project: {
        _id: 0,
        videoId: "$_id",
        dislikeCount: 1,
      },
    },
  ]);

  if (!video) {
    throw new ApiErrors(404, "Video not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video disLikes retrieved successfully"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
  getVideoLikes,
  getVideoDisLikes,
};
