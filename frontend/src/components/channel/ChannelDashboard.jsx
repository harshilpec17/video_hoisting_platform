import axios from "axios";
import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";

const ChannelDashboard = () => {
  const dispatch = useDispatch();
  const userChannel = useSelector((state) => state.channel.channelProfile);

  const channelVideos = useSelector((state) => state.channel.channelVideos);
  const dashboardData = useSelector((state) => state.dashboard.dashboardData);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;
  const loggedUserName = loggedInUser?.user?.userName;

  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/3532545/pexels-photo-3532545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/3532552/pexels-photo-3532552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/3532549/pexels-photo-3532549.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/2522659/pexels-photo-2522659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/2519823/pexels-photo-2519823.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/2519812/pexels-photo-2519812.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1739942/pexels-photo-1739942.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1739856/pexels-photo-1739856.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1144257/pexels-photo-1144257.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1144261/pexels-photo-1144261.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1144268/pexels-photo-1144268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1144269/pexels-photo-1144269.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1144275/pexels-photo-1144275.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1144277/pexels-photo-1144277.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1144270/pexels-photo-1144270.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1144235/pexels-photo-1144235.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1144232/pexels-photo-1144232.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1115822/pexels-photo-1115822.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
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
                <button class="inline-flex items-center gap-x-2 bg-[#ae7aff] px-3 py-2 font-semibold text-black">
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
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex justify-center">
                              <label
                                for="vid-pub-1"
                                class="relative inline-block w-12 cursor-pointer overflow-hidden"
                              >
                                <input
                                  type="checkbox"
                                  id="vid-pub-1"
                                  class="peer sr-only"
                                  checked=""
                                />
                                <span class="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
                              </label>
                            </div>
                          </td>
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex justify-center">
                              <span class="inline-block rounded-2xl border px-1.5 py-0.5 border-green-600 text-green-600">
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
                                  handleDeleteComment(comment._id);
                                }}
                                className="text-2xl font-bold hover:bg-red-500 p-0.5 h-7 rounded"
                              >
                                <MdOutlineDeleteOutline />
                              </div>
                            </div>
                          </td>
                        </tr>
                        {/* <tr class="group border">
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex justify-center">
                              <label
                                for="vid-pub-2"
                                class="relative inline-block w-12 cursor-pointer overflow-hidden"
                              >
                                <input
                                  type="checkbox"
                                  id="vid-pub-2"
                                  class="peer sr-only"
                                />
                                <span class="inline-block h-6 w-full rounded-2xl bg-gray-200 duration-200 after:absolute after:bottom-1 after:left-1 after:top-1 after:h-4 after:w-4 after:rounded-full after:bg-black after:duration-200 peer-checked:bg-[#ae7aff] peer-checked:after:left-7"></span>
                              </label>
                            </div>
                          </td>
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex justify-center">
                              <span class="inline-block rounded-2xl border px-1.5 py-0.5 border-orange-600 text-orange-600">
                                Unpublished
                              </span>
                            </div>
                          </td>
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex items-center gap-4">
                              <img
                                class="h-10 w-10 rounded-full"
                                src="https://images.pexels.com/photos/3532552/pexels-photo-3532552.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                alt="React Ninja"
                              />
                              <h3 class="font-semibold">
                                React Hooks Explained: useState and useEffect
                              </h3>
                            </div>
                          </td>
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex justify-center gap-4">
                              <span class="inline-block rounded-xl bg-green-200 px-1.5 py-0.5 text-green-700">
                                2520 likes
                              </span>
                              <span class="inline-block rounded-xl bg-red-200 px-1.5 py-0.5 text-red-700">
                                279 dislikes
                              </span>
                            </div>
                          </td>
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            9/21/2023
                          </td>
                          <td class="border-collapse border-b border-gray-600 px-4 py-3 group-last:border-none">
                            <div class="flex gap-4">
                              <button class="h-5 w-5 hover:text-[#ae7aff]">
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
                                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                  ></path>
                                </svg>
                              </button>
                              <button class="h-5 w-5 hover:text-[#ae7aff]">
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
                                    d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                                  ></path>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr> */}
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
