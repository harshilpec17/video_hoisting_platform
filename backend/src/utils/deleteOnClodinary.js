import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const deleteOnCloudinary = async (oldImageId, resource_type = "image") => {
  try {
    await cloudinary.uploader.destroy(oldImageId, {
      resource_type: resource_type,
    });
  } catch (error) {
    (error) => console.error(error);
  }
};
export { deleteOnCloudinary };
