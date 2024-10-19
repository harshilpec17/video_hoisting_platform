import { Router } from "express";
import {
  changeCurrentPassword,
  loginUser,
  logoutUser,
  refreshAccessToken,
  registerUser,
  updateAccountDetail,
  updateUserAvatar,
  updateUserCoverImage,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/login").post(loginUser);

router
  .route("/login/update-avatar")
  .post(upload.single("avatar"), updateUserAvatar);

router
  .route("/login/update-cover-image")
  .post(upload.single("coverImage"), updateUserCoverImage);

router.route("/login/update-account-details").post(updateAccountDetail);

// secure routes

router.route("/logout").post(verifyJWT, logoutUser);

router.route("/refresh-token").post(refreshAccessToken);

router.route("/change-password").post(changeCurrentPassword);

export default router;
