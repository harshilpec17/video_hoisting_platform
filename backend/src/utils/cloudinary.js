import { v2 as cloudinary } from "cloudinary";
import { response } from "express";
import fs from "fs";

// Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
      overwrite: "true",
      quality: "auto",
      auto: "eco",
    });

    fs.unlinkSync(localFilePath);

    let oldPublicId = response.public_id;

    return response;
  } catch (error) {
    fs.unlinkSync(localFilePath); // remove the temporary saved file
    return null;
  }
};

const deleteFromCloudinary = async (url, resourceType = "image") => {
  try {
    const publicId = url.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  } catch (error) {
    console.error(
      `The following error occurred during deleting the file from cloudinary : ${error}`
    );
  }
};

export { uploadOnCloudinary, deleteFromCloudinary };
