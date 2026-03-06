import express from "express";
import cookieParser from "cookie-parser";

const app = express();

// Custom CORS middleware with explicit method handling
const customCorsMiddleware = (req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "http://localhost:5173", // Vite dev server
    "http://localhost:3000", // Alternative dev port
    "https://videoplatform-fullstack.vercel.app", // Production
  ];

  if (req.path.startsWith("/api/v1/")) {
    // Check if origin is allowed
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    } else {
      res.header("Access-Control-Allow-Origin", allowedOrigins[2]); // Default to production
    }
    res.header(
      "Access-Control-Allow-Methods",
      "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
    );
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
  } else {
    res.header("Access-Control-Allow-Origin", "*");
  }

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
};

app.use(customCorsMiddleware);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//routes import

import userRouter from "./router/user.routes.js";
import subscriptionRouter from "./router/subscription.routes.js";
import tweetRouter from "./router/tweet.routes.js";
import videoRouter from "./router/video.routes.js";
import commentRouter from "./router/comment.routes.js";
import playlistRouter from "./router/playlist.routes.js";
import dashboardRouter from "./router/dashboard.routes.js";
import healthcheckRouter from "./router/healthcheck.routes.js";
// ignore this error
import likeRouter from "./router/like.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

// routes declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users/", userRouter);
app.use("/api/v1/users/", subscriptionRouter);
app.use("/api/v1/users/tweets", tweetRouter);
app.use("/api/v1/users/", videoRouter);
app.use("/api/v1/users/comment", commentRouter);
app.use("/api/v1/users/like", likeRouter);
app.use("/api/v1/users/playlist", playlistRouter);
app.use("/api/v1/users/dashboard", dashboardRouter);

app.use(errorHandler);
export { app };
