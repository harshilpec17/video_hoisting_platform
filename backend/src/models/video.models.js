import mongoose from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new mongoose.Schema(
  {
    videoFile: {
      type: String, // cloudinary URL
      required: true,
    },
    thumbnail: {
      type: String, // cloudinary URL
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String, // cloudinary URL
      required: true,
    },
    duration: {
      type: Number, // cloudinary URL
      default: 0,
    },
    views: {
      type: Number, // cloudinary URL
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    likeCount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
        default: [],
      },
    ],
    dislikeCount: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
