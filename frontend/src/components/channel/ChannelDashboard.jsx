import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { startLoading, stopLoading } from "../../store/loaderSlice";
import { togglePublishVideo } from "../../store/dashboardSlice";
import Loader from "../../utils/Loader";
import { fetchChannelVideo } from "../../store/channelSlice";
import { useState } from "react";
import UploadVideoModal from "../video/UploadVideoModal";
import { deleteVideoById } from "../../store/videoSlice";
import DeleteConfirmationModal from "../../utils/DeleteConfirmationModal";

const ChannelDashboard = () => {
  const dispatch = useDispatch();
  const userChannel = useSelector((state) => state.channel.channelProfile);
  const isLoading = useSelector((state) => state.loader.isLoading);

  const channelVideos = useSelector((state) => state.channel.channelVideos);
  const dashboardData = useSelector((state) => state.dashboard.dashboardData);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;
  const loggedUserName = loggedInUser?.user?.userName;

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [videoToDelete, setVideoToDelete] = useState(null);
  return (
    <>
      {isLoading && <Loader />}

      <div class="h-screen overflow-y-auto bg-[#121212] text-white">
        <div class="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <div class="mx-auto flex w-full max-w-7xl flex-col gap-y-6 px-4 py-8">
            <div class="flex flex-wrap justify-between gap-4">
              {userChannel && (
                <>
                  <div class="">
                    <h1 class=" flex justify-end w-max gap-x-3 items-center text-2xl font-bold bg-purple-400 text-black pl-2 rounded">
                      Welcome Back{" "}
                      <span className="bg-orange-300 font-bold text-black px-2 py-1 rounded">
                        {userChannel.userName}
                      </span>
                    </h1>
                    <p class="text-sm text-gray-300">
                      Seamless Video Management, Elevated Results.
                    </p>
                  </div>
                </>
              )}

              <div class="block">
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  class="inline-flex cursor-pointer items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="2"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="h-5 w-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M12 4.5v15m7.5-7.5h-15"
                    ></path>
                  </svg>{" "}
                  Upload video
                </button>
              </div>
            </div>
            <UploadVideoModal
              open={isUploadModalOpen}
              onClose={() => setIsUploadModalOpen(false)}
            />
            <DeleteConfirmationModal
              open={deleteModalOpen}
              item={"video "}
              onClose={() => {
                setDeleteModalOpen(false);
                setVideoToDelete(null);
              }}
              onDelete={async () => {
                try {
                  dispatch(startLoading());
                  await dispatch(deleteVideoById(videoToDelete));
                  await dispatch(fetchChannelVideo(loggedInUserId));
                } catch (error) {
                  console.error(error);
                } finally {
                  dispatch(stopLoading());
                  setDeleteModalOpen(false);
                  setVideoToDelete(null);
                }
              }}
            />

            {dashboardData &&
              dashboardData.map((stat, index) => (
                <div
                  key={index}
                  class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4"
                >
                  <div class="border p-4">
                    <div class="mb-4 block">
                      <span class="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                          ></path>
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <h6 class="text-gray-300">Total views</h6>
                    <p class="text-3xl font-semibold">{stat.totalVideoViews}</p>
                  </div>
                  <div class="border p-4">
                    <div class="mb-4 block">
                      <span class="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <h6 class="text-gray-300">Total subscribers</h6>
                    <p class="text-3xl font-semibold">
                      {stat.totalSubscribers}
                    </p>
                  </div>
                  <div class="border p-4">
                    <div class="mb-4 block">
                      <span class="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <h6 class="text-gray-300">Total subscriptions</h6>
                    <p class="text-3xl font-semibold">
                      {stat.totalSubsriptions}
                    </p>
                  </div>
                  <div class="border p-4">
                    <div class="mb-4 block">
                      <span class="inline-block h-7 w-7 rounded-full bg-[#E4D3FF] p-1 text-[#ae7aff]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                          ></path>
                        </svg>
                      </span>
                    </div>
                    <h6 class="text-gray-300">Total likes</h6>
                    <p class="text-3xl font-semibold">{stat.totalLikes}</p>
                  </div>
                </div>
              ))}
            <div class="w-full overflow-auto">
              <table class="w-full min-w-[1200px] border-collapse border text-white">
                <thead>
                  <tr>
                    <th class="border-collapse border-b p-4 bg-purple-500">
                      Status
                    </th>
                    <th class="border-collapse border-b bg-purple-600 p-4">
                      Status
                    </th>
                    <th class="border-collapse border-b bg-purple-500 p-4">
                      Uploaded
                    </th>
                    <th class="border-collapse border-b bg-purple-600 p-4">
                      Views
                    </th>
                    <th class="border-collapse border-b bg-purple-500 p-4">
                      Rating
                    </th>
                    <th class="border-collapse border-b bg-purple-600 p-4">
                      Date uploaded
                    </th>
                    <th class="border-collapse border-b bg-purple-500 p-4"></th>
                  </tr>
                </thead>

                <tbody>
                  {channelVideos &&
                    channelVideos.map((video) => (
                      <>
                        <tr key={video._id} class="group border">
                          <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div className="flex justify-center">
                              <input
                                type="checkbox"
                                className="peer sr-only opacity-0"
                                id={`toggle-${video._id}`}
                                checked={video.isPublished}
                                onChange={async () => {
                                  try {
                                    dispatch(startLoading());
                                    await dispatch(
                                      togglePublishVideo({
                                        toggleValue: video?.isPublished
                                          ? false
                                          : true,
                                        videoId: video._id,
                                      })
                                    ),
                                      await dispatch(
                                        fetchChannelVideo(loggedInUserId)
                                      );
                                  } catch (error) {
                                    console.error(error);
                                  } finally {
                                    dispatch(stopLoading());
                                  }
                                }}
                              />
                              <label
                                htmlFor={`toggle-${video._id}`}
                                className={`relative flex h-6 w-11 cursor-pointer items-center rounded-full ${
                                  video.isPublished
                                    ? "bg-green-500"
                                    : "bg-gray-400"
                                } px-0.5 outline-gray-400 transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 ${
                                  video.isPublished
                                    ? "before:translate-x-full"
                                    : ""
                                } peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500`}
                              >
                                <span className="sr-only">Enable</span>
                              </label>
                            </div>
                          </td>
                          {/* ...rest of your columns... */}
                          <td className="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div className="flex justify-center">
                              <span
                                className={`inline-block rounded-2xl border px-1.5 py-0.5 ${
                                  video.isPublished
                                    ? "border-green-600 text-green-600"
                                    : "border-orange-600 text-orange-600"
                                }`}
                              >
                                {video.isPublished
                                  ? "Published"
                                  : "Unpublished"}
                              </span>
                            </div>
                          </td>
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex justify-start items-center gap-4">
                              <img
                                class="h-10 w-10 rounded-full"
                                src={video.owner[0].avatar}
                                alt="Code Master"
                              />
                              <h3 class="font-semibold">{video.title}</h3>
                            </div>
                          </td>
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex justify-center gap-4">
                              <span class="inline-block font-semibold rounded-xl bg-blue-200 px-1.5 py-0.5 text-black">
                                {video.views} views
                              </span>
                            </div>
                          </td>

                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex justify-center gap-4">
                              <span class="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                                {video.likeCount} likes
                              </span>
                              <span class="inline-block rounded-xl bg-red-200 px-1.5 py-0.5 text-red-700">
                                {video.dislikeCount} dislikes
                              </span>
                            </div>
                          </td>
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex justify-center">
                              <span>
                                {new Date(video.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </td>
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex gap-4 justify-center">
                              <div
                                onClick={() => {
                                  setEditingCommentId(comment._id);
                                  setEditingCommentText(comment.content);
                                }}
                                className="text-2xl font-bold hover:bg-orange-500 p-0.5 h-7 rounded"
                              >
                                <RiEditLine />
                              </div>
                              <div
                                onClick={() => {
                                  setVideoToDelete(video._id);
                                  setDeleteModalOpen(true);
                                }}
                                className="text-2xl cursor-pointer font-bold hover:bg-red-500 p-0.5 h-7 rounded"
                              >
                                <MdOutlineDeleteOutline />
                              </div>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChannelDashboard;
