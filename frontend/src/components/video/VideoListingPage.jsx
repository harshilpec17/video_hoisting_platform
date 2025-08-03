import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchVideoById,
  setVideo,
  setVideoId,
} from "../../store/videoSlice.js";
import { setVideoList } from "../../store/videoSlice.js";

import { timeAgo } from "../../utils/timeAgo";
import SideBar from "../layout/SideBar";
import { duration } from "../../utils/duration";
import { fetchUserChannelProfile } from "../../store/channelSlice";
import { fetchPlaylists } from "../../store/playlistSlice";
import Loader from "../../utils/Loader.jsx";

const VideoListingPage = () => {
  const [videoData, setVideoData] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const videoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/url/video", {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        });

        if (response.status === 200) {
          setVideoData(response.data.data);
          dispatch(setVideoList(response.data.data));
        }
      } catch (error) {
        console.error("Error fetching video data:", error);
      } finally {
        setLoading(false);
      }
    };

    videoData();
  }, []);
  const handleVideoClick = async (video) => {
    setLoading(true);
    try {
      await dispatch(fetchVideoById(video._id));
      dispatch(setVideoId(video._id));
      await dispatch(fetchUserChannelProfile(video?.owner?.userName));
      await dispatch(fetchPlaylists(video?.owner?._id));
      navigate("/video");
      window.scrollTo(0, 0);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <Loader />}
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />

          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
              {videoData && videoData.length > 0 ? (
                videoData
                  .filter((video) => video.isPublished === true)
                  .map((video, index) => (
                    <>
                      <div className="w-full">
                        <div
                          key={video._id || index}
                          className="relative mb-2 w-full pt-[56%]"
                        >
                          <div
                            onClick={() => {
                              handleVideoClick(video);
                            }}
                            className="absolute inset-0"
                          >
                            <img
                              src={video.thumbnail}
                              alt="JavaScript Fundamentals: Variables and Data Types"
                              className="h-full w-full cursor-pointer"
                            />
                          </div>
                          <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                            {duration(video.duration)}
                          </span>
                        </div>
                        <div className="flex gap-x-2">
                          <div className="h-10 w-10 shrink-0">
                            <img
                              src={video.owner.avatar}
                              alt="codemaster"
                              className="h-full w-full rounded-full"
                            />
                          </div>
                          <div className="w-full">
                            <h6 className="mb-1 font-semibold">
                              {video.title}
                            </h6>
                            <p className="flex text-sm text-gray-200">
                              {video.views} Views · {timeAgo(video.createdAt)}
                            </p>
                            <p className="text-sm text-gray-200">
                              {video.owner.userName}
                            </p>
                          </div>
                        </div>
                      </div>
                    </>
                  ))
              ) : (
                <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0 pt-20">
                  <div className="flex h-full items-center justify-center">
                    <div className="w-full max-w-sm text-center">
                      <p className="mb-3 w-full">
                        <span className="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            aria-hidden="true"
                            className="w-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                            ></path>
                          </svg>
                        </span>
                      </p>
                      <h5 className="mb-2 font-semibold">
                        No videos available
                      </h5>
                      <p>
                        There are no videos here available. Please try to search
                        some thing else.
                      </p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default VideoListingPage;
