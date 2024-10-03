import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiErrors } from "../utils/ApiErrors.js";
import { User } from "../models/user.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  // get the data from the  USER
  const { email, password, fullName, userName } = req.body;

  // Validate the data is not empty

  if (
    [email, password, fullName, userName].some((field) => field.trim() == "")
  ) {
    throw new ApiErrors(400, "All fields are required");
  }

  // check is user already exist by userName and email

  const existedUser = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (existedUser) {
    throw new ApiErrors(409, "User with email and password already exist");
  }

  // check image for avatar

  let avatarLocalFilePath;

  if (
    req.files &&
    Array.isArray(req.files?.avatar) &&
    req.files?.avatar.length > 0
  ) {
    avatarLocalFilePath = req.files?.avatar[0]?.path;
  }

  if (!avatarLocalFilePath) {
    throw new ApiErrors(400, "avatar file is required");
  }

  // check image for coverImage
  let coverImageLocalFilePath;

  if (
    req.files &&
    Array.isArray(req.files?.coverImage) &&
    req.files?.coverImage.length > 0
  ) {
    coverImageLocalFilePath = req.files?.coverImage[0]?.path;
  }

  // upload them on the cloudinary

  const avatar = await uploadOnCloudinary(avatarLocalFilePath);
  const coverImage = await uploadOnCloudinary(coverImageLocalFilePath);

  if (!avatar) {
    throw new ApiErrors(500, "error while uploading to the server");
  }

  // connect to db

  const newUser = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || " ",
    email,
    password,
    userName: userName.toLowerCase(),
  });

  const createdUser = await User.findById(newUser._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiErrors(500, "something went wrong while creating new user");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "user registered successfully"));
});

export { registerUser };
