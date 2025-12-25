import mongoose, { isValidObjectId, Types } from "mongoose";
import { Playlist } from "../models/playlist.model.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { Video } from "../models/video.models.js";

const createPlaylist = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  if (
    (name.length === 0 || name.trim() === "") &&
    (description.length === 0 || description.trim() === "")
  ) {
    throw new ApiErrors(
      400,
      "Please provide the Playlist name and Description"
    );
  }

  const user = await User.findById(req.user?._id);

  const userObjectId = new mongoose.Types.ObjectId(user._id);

  const createdPlaylist = await Playlist.create({
    name: name,
    description: description,
    videos: [],
    owner: userObjectId,
  });

  if (createPlaylist.length === null) {
    throw new ApiErrors(400, "There is no playlist to be created");
  }

  res
    .status(200)
    .json(new ApiResponse(200, createdPlaylist, "Playlist has been created"));
  //TODO: create playlist
});

const getUserPlaylists = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  //TODO: get user playlists

  if (!userId) {
    throw new ApiErrors(400, "Please provide the userId");
  }

  const { ObjectId } = Types;

  const playlist = await Playlist.aggregate([
    {
      $match: {
        owner: new ObjectId(userId),
      },
    },
  ]);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        playlist,
        "User playlist has been fetched successfully"
      )
    );
});

const getPlaylistById = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  //TODO: get playlist by id

  if (!playlistId) {
    throw new ApiErrors(400, "Please provide the userId");
  }

  const playlistById = await Playlist.findById(playlistId);

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        playlistById,
        "User successfully fetched the playlist"
      )
    );
});

const addVideoToPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;

  if (!playlistId && !videoId) {
    throw new ApiErrors(400, "Please provide the playlist and videoId");
  }

  const videoToBeAdded = await Video.findById(videoId).select("_id");

  const playlistVideo = await Playlist.findById(playlistId);

  playlistVideo.videos.push(videoToBeAdded);

  const videoObjectIds = playlistVideo.videos.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  const finalPlaylistVideos = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set: { videos: videoObjectIds },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json(new ApiResponse(200, finalPlaylistVideos, "video has been added"));
});

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
  const { playlistId, videoId } = req.params;
  // TODO: remove video from playlist

  if (!playlistId && !videoId) {
    throw new ApiErrors(400, "Please provide the playlist and videoId");
  }

  //   const videoToBeDeleted = await Video.findById(videoId).select("_id");

  const videoFromPlaylist = await Playlist.findById(playlistId);

  const isItAdded = await videoFromPlaylist.videos?.includes(videoId);

  if (!isItAdded) {
    throw new ApiErrors(400, "Video is not present inside the playlist");
  }

  const filteredVideo = videoFromPlaylist.videos.filter(
    (id) => id.toString() !== videoId
  );

  const videoObjectIds = filteredVideo.map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  const deleteVideoFromPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set: { videos: videoObjectIds },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        deleteVideoFromPlaylist,
        "video has been deleted from playlist"
      )
    );
});

const deletePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  // TODO: delete playlist

  const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId);

  if (deletedPlaylist === null) {
    throw new ApiErrors(400, "There are no playlist to be deleted");
  }

  res
    .status(200)
    .json(new ApiResponse(200, deletedPlaylist, "Playlist has been deleted"));
});

const updatePlaylist = asyncHandler(async (req, res) => {
  const { playlistId } = req.params;
  const { name, description } = req.body;

  if (!playlistId) {
    throw new ApiErrors(400, "Please provide the playlist Id");
  }

  if (
    name.length === 0 ||
    name.trim() === "" ||
    description.length === 0 ||
    description.trim() === ""
  ) {
    throw new ApiErrors(
      400,
      "Please provide the Playlist name and Description"
    );
  }

  const updatedPlaylist = await Playlist.findByIdAndUpdate(
    playlistId,
    {
      $set: {
        name: name,
        description: description,
      },
    },
    {
      new: true,
    }
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedPlaylist, "Playlist has been updated"));
});

export {
  createPlaylist,
  getUserPlaylists,
  getPlaylistById,
  addVideoToPlaylist,
  removeVideoFromPlaylist,
  deletePlaylist,
  updatePlaylist,
};
