import React from "react";
import SideBar from "../layout/SideBar";
import { timeAgo } from "../../utils/timeAgo";
import { useDispatch, useSelector } from "react-redux";
import { duration } from "../../utils/duration";
import { useNavigate } from "react-router";
import { fetchVideoById, setVideoId } from "../../store/videoSlice.js";

const LikedVideoPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;

  const likedVideos = useSelector((state) => state.like.likedVideo);

  console.log("Liked Videos:", likedVideos);

  console.log(loggedInUserId);

  return (
    <>
      <div class="h-screen overflow-y-auto bg-[#121212] text-white">
        <div class="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <section class="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
              {likedVideos &&
                likedVideos.map((video, index) => (
                  <div class="w-full">
                    <div class="relative mb-2 w-full pt-[56%]">
                      <div class="absolute inset-0">
                        <img
                          onClick={() => {
                            navigate("/video");
                            dispatch(
                              fetchVideoById(video?.likedVideoByUser?._id)
                            );
                            dispatch(setVideoId(video?.likedVideoByUser?._id));
                            window.scrollTo(0, 0);
                          }}
                          src={video?.likedVideoByUser?.thumbnail}
                          alt="JavaScript Fundamentals: Variables and Data Types"
                          class="h-full w-full"
                        />
                      </div>
                      <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                        {duration(video?.likedVideoByUser?.duration)}
                      </span>
                    </div>
                    <div class="flex gap-x-2">
                      <div class="h-10 w-10 shrink-0">
                        <img
                          src={video?.owner?.avatar}
                          alt="codemaster"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full">
                        <h6 class="mb-1 font-semibold">
                          {video?.likedVideoByUser?.title}
                        </h6>
                        <p class="flex text-sm text-gray-200">
                          {video?.likedVideoByUser?.views} Views ·{" "}
                          {timeAgo(video?.likedVideoByUser?.createdAt)}
                        </p>
                        <p class="text-sm text-gray-200">
                          {video?.owner?.userName}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LikedVideoPage;
