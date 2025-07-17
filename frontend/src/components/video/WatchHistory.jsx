import React from "react";
import SideBar from "../layout/SideBar";
import { useDispatch, useSelector } from "react-redux";
import { duration } from "../../utils/duration";
import { timeAgo } from "../../utils/timeAgo";
import { fetchVideoById } from "../../store/createVideoSlice";
import { setVideoId } from "../../store/createVideoSlice";
import { useNavigate } from "react-router";

const WatchHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const watchHistory = useSelector((state) => state.watchHistory.watchHistory);

  return (
    <>
      <div class="h-screen overflow-y-auto bg-[#121212] text-white">
        <div class="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <section class="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
              {watchHistory &&
                watchHistory.map((watch, index) => (
                  <div class="w-full">
                    <div class="relative mb-2 w-full pt-[56%]">
                      <div class="absolute inset-0">
                        <img
                          onClick={() => {
                            navigate("/video");
                            window.scrollTo(0, 0);
                            dispatch(fetchVideoById(watch?._id));
                            dispatch(setVideoId(watch?._id));
                            console.log("Video ID:", watch?._id);
                          }}
                          src={watch?.thumbnail}
                          alt="JavaScript Fundamentals: Variables and Data Types"
                          class="h-full w-full"
                        />
                      </div>
                      <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                        {duration(watch?.duration)}
                      </span>
                    </div>
                    <div class="flex gap-x-2">
                      <div class="h-10 w-10 shrink-0">
                        <img
                          src={watch?.owner[0]?.avatar}
                          alt="codemaster"
                          class="h-full w-full rounded-full"
                        />
                      </div>
                      <div class="w-full">
                        <h6 class="mb-1 font-semibold">{watch?.title}</h6>
                        <p class="flex text-sm text-gray-200">
                          {watch?.views} Views · {timeAgo(watch?.createdAt)}
                        </p>
                        <p class="text-sm text-gray-200">
                          {watch?.owner[0]?.userName}
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

export default WatchHistory;
