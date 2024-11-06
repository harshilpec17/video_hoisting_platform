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

const getAllVideos = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query;
  //TODO: get all videos based on query, sort, pagination

  const videoByTitle = await Video.find(query.title);

  console.log(videoByTitle);

  return res.status(200);
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

  const video = await Video.findById(videoId);

  if (video === null || video === undefined) {
    throw new ApiErrors(400, "video does not exist");
  }

  res
    .status(200)
    .json(new ApiResponse(200, video, "Video has been found successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  //TODO: update video details like title, description, thumbnail

  // get all the fields from the body and form
  const videoId = req.params.videoId;

  const isIdObjectValid = isValidObjectId(videoId);

  if (!isIdObjectValid) {
    throw new ApiErrors(400, "Please provide a true Id");
  }

  const { newTitle, newDescription } = req.body;
  let newThumbnail = req.file.path;

  const oldVideo = await Video.findById(videoId);

  const updateFields = {};

  // check the Title is same or empty or undefined

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

  // check the thumbnail data as it is empty array
  if (
    req.files &&
    Array.isArray(req.files?.newThumbnail) &&
    req.files?.newThumbnail.length > 0
  ) {
    newThumbnail = req.files?.newThumbnail[0]?.path;
  }

  //get the thumbnail data and upload on the cloudinary
  const newUpdatedThumbnail = await uploadOnCloudinary(newThumbnail);

  updateFields.thumbnail = newUpdatedThumbnail.url;

  // get all the data inside the object and updated the database
  const updatedVideoDetails = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: updateFields,
    },
    {
      new: true,
    }
  );

  // delete the old thumbnail from the database
  const oldThumbnailUrl = oldVideo?.thumbnail;

  if (updatedVideoDetails && oldThumbnailUrl) {
    await deleteFromCloudinary(oldThumbnailUrl);
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedVideoDetails, "Details updated Successfully")
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

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
