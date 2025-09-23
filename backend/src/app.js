import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const envOrigins = (process.env.CORS_ORIGIN || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

const allowList = [
  "https://videoplatform-fullstack.vercel.app",
  "http://localhost:5173",
  ...envOrigins,
];

const corsOptions = {
  origin: (origin, cb) => {
    // allow server-to-server/no-origin (curl, health checks)
    if (!origin) return cb(null, true);
    try {
      const host = new URL(origin).hostname;
      const isVercelPreview = /\.vercel\.app$/.test(host);
      if (allowList.includes(origin) || isVercelPreview) return cb(null, true);
    } catch {}
    return cb(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  optionsSuccessStatus: 204,
  maxAge: 86400,
};

// CORS must be before routes and auth
app.use(cors(corsOptions));
// Handle preflight for all routes
app.options("*", cors(corsOptions));

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
