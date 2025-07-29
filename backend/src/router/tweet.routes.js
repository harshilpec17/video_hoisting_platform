import { Router } from "express";
import {
  createTweet,
  deleteTweet,
  getAllTweets,
  getUserTweets,
  updateTweet,
} from "../controllers/tweet.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/create").post(createTweet);
router.route("/user/:userId").get(getUserTweets);
router.route("/:tweetId").patch(updateTweet).delete(deleteTweet);
router.route("/").get(getAllTweets); // Assuming you want to get all tweets for the authenticated user

export default router;
