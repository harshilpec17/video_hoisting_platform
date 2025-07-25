import { useDispatch, useSelector } from "react-redux";
import { duration } from "../../utils/duration";
import { timeAgo } from "../../utils/timeAgo";
import { fetchVideoById } from "../../store/videoSlice";
import { setVideoId } from "../../store/videoSlice";
import { useNavigate } from "react-router";

const WatchHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const channelVideos = useSelector((state) => state.channel.channelVideos);

  return (
    <>
      {channelVideos.length !== 0 ? (
        <div class="h-screen overflow-auto bg-[#121212] text-white">
          <div class="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
            <section class="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
              <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 p-4">
                {channelVideos &&
                  channelVideos.map((video, index) => (
                    <div class="w-full">
                      <div class="relative mb-2 w-full pt-[56%]">
                        <div class="absolute inset-0">
                          <img
                            onClick={() => {
                              navigate("/video");
                              window.scrollTo(0, 0);
                              dispatch(fetchVideoById(video?._id));
                              dispatch(setVideoId(video?._id));
                              console.log("Video ID:", video?._id);
                            }}
                            src={video?.thumbnail}
                            alt="JavaScript Fundamentals: Variables and Data Types"
                            class="h-full w-full"
                          />
                        </div>
                        <span class="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                          {duration(video?.duration)}
                        </span>
                      </div>
                      <div class="flex gap-x-2">
                        <div class="h-10 w-10 shrink-0">
                          <img
                            src={video?.owner[0]?.avatar}
                            alt="codemaster"
                            class="h-full w-full rounded-full"
                          />
                        </div>
                        <div class="w-full">
                          <h6 class="mb-1 font-semibold">{video?.title}</h6>
                          <p class="flex text-sm text-gray-200">
                            {video?.views} Views · {timeAgo(video?.createdAt)}
                          </p>
                          <p class="text-sm text-gray-200">
                            {video?.owner[0]?.userName}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center pb-80 min-h-screen">
          <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2 p-10">
            <div class="w-full max-w-sm text-center">
              <p class="mb-3 w-full">
                <span class="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                    ></path>
                  </svg>
                </span>
              </p>
              <h5 class="mb-2 font-semibold">No videos uploaded</h5>
              <p>
                This page has yet to upload a video. Search another page in
                order to find more videos.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WatchHistory;
