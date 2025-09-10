import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/authentication/Login.jsx";
import Register from "./components/authentication/Register.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes.jsx";
import VideoListingPage from "./components/video/VideoListingPage.jsx";
import VideoDetailPage from "./components/video/VideoDetailPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import LikedVideoPage from "./components/video/LikedVideoPage.jsx";
import WatchHistory from "./components/video/WatchHistory.jsx";
import ChannelVideo from "./components/channel/ChannelVideo.jsx";
import ChannelPage from "./components/channel/ChannelPage.jsx";
import TweetHomePage from "./components/tweet/TweetHomePage.jsx";
import Loader from "./utils/Loader.jsx";
import ChannelDashboard from "./components/channel/ChannelDashboard.jsx";
import EditPersonalInfo from "./components/userAccount/EditPersonalInfo.jsx";
import Contact from "./components/static/Contact.jsx";
import Terms from "./components/static/Terms.jsx";
import Home from "./components/layout/Home.jsx";

const root = createRoot(document.getElementById("root"));
// window.onbeforeunload = function () {
//   localStorage.removeItem("refreshToken");
//   sessionStorage.removeItem("accessToken");
//   localStorage.removeItem("user");
//   return "";
// };

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        // Protected Route
        <Route
          path="videolistingpage"
          element={
            <ProtectedRoutes>
              <VideoListingPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="video"
          element={
            <ProtectedRoutes>
              <VideoDetailPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="video/likedVideos"
          element={
            <ProtectedRoutes>
              <LikedVideoPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="video/watchHistory"
          element={
            <ProtectedRoutes>
              <WatchHistory />
            </ProtectedRoutes>
          }
        />
        <Route
          path="channel/channelVideos"
          element={
            <ProtectedRoutes>
              <ChannelVideo />
            </ProtectedRoutes>
          }
        />
        <Route
          path="channel"
          element={
            <ProtectedRoutes>
              <ChannelPage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="tweet"
          element={
            <ProtectedRoutes>
              <TweetHomePage />
            </ProtectedRoutes>
          }
        />
        <Route
          path="loader"
          element={
            <ProtectedRoutes>
              <Loader />
            </ProtectedRoutes>
          }
        />
        <Route
          path="channel/dashboard"
          element={
            <ProtectedRoutes>
              <ChannelDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="userinfo"
          element={
            <ProtectedRoutes>
              <EditPersonalInfo />
            </ProtectedRoutes>
          }
        />
        <Route path="contact" element={<Contact />} />
        <Route path="terms" element={<Terms />} />
      </Route>
    </>
  )
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
