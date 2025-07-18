import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  fetchVideoById,
  setVideo,
  setVideoId,
} from "../../store/createVideoSlice";
import { setVideoList } from "../../store/createVideoSlice";

import { timeAgo } from "../../utils/timeAgo";
import SideBar from "../layout/SideBar";
import { duration } from "../../utils/duration";
import { fetchUserChannelProfile } from "../../store/ChannelSlice";
import { fetchPlaylists } from "../../store/PlaylistSlice";

const VideoListingPage = () => {
  const [videoData, setVideoData] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const videoData = async () => {
      try {
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
      }
    };

    videoData();
  }, []);

  return (
    <>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />

          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
              {videoData &&
                videoData.map((video, index) => (
                  <>
                    <div key={video._id || index} className="w-full">
                      <div className="relative mb-2 w-full pt-[56%]">
                        <div
                          onClick={() => {
                            navigate("/video");
                            dispatch(fetchVideoById(video._id));
                            dispatch(setVideoId(video._id));
                            dispatch(
                              fetchUserChannelProfile(video?.owner?.userName)
                            );
                            dispatch(fetchPlaylists(video?.owner?._id));
                            window.scrollTo(0, 0);
                          }}
                          className="absolute inset-0"
                        >
                          <img
                            src={video.thumbnail}
                            alt="JavaScript Fundamentals: Variables and Data Types"
                            className="h-full w-full"
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
                          <h6 className="mb-1 font-semibold">{video.title}</h6>
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
                ))}
              <div className="w-full">
                <div className="relative mb-2 w-full pt-[56%]">
                  <div className="absolute inset-0">
                    <img
                      src="https://images.pexels.com/photos/3561339/pexels-photo-3561339.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="JavaScript Fundamentals: Variables and Data Types"
                      className="h-full w-full"
                    />
                  </div>
                  <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                    20:45
                  </span>
                </div>
                <div className="flex gap-x-2">
                  <div className="h-10 w-10 shrink-0">
                    <img
                      src="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt="codemaster"
                      className="h-full w-full rounded-full"
                    />
                  </div>
                  <div className="w-full">
                    <h6 className="mb-1 font-semibold">
                      JavaScript Fundamentals: Variables and Data Types
                    </h6>
                    <p className="flex text-sm text-gray-200">
                      10.3k Views · 44 minutes ago
                    </p>
                    <p className="text-sm text-gray-200">Code Master</p>
                  </div>
                </div>
              </div>
              ``{" "}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default VideoListingPage;
