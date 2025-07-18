import React, { useState } from "react";
import SideBar from "../layout/SideBar";
import { useDispatch, useSelector } from "react-redux";
import ChannelVideo from "./ChannelVideo";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { fetchUserChannelProfile } from "../../store/ChannelSlice";

const ChannelPage = () => {
  const dispatch = useDispatch();
  const channelData = useSelector((state) => state.channel.channelProfile);

  const userName = channelData.userName;
  const channelVideos = useSelector((state) => state.channel.channelVideos);

  const [isSubscribed, setIsSubscribed] = useState(channelData.isSubscribed);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;
  // Add state for active tab
  const [activeTab, setActiveTab] = useState("videos");

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const subscriptionToggle = async (channelId) => {
    try {
      const response = await axios.post(
        `url/ch/${channelId}`,
        { loggedInUserId },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      if (response.status === 200) {
        console.log("subscribed status", response.data);
        toast.success(response.data.message);
        dispatch(fetchUserChannelProfile(userName));
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "videos":
        return (
          <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
            {channelVideos.length > 0 ? (
              <ChannelVideo />
            ) : (
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
            )}
          </div>
        );

      case "tweets":
        return (
          <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
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
                      d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                    ></path>
                  </svg>
                </span>
              </p>
              <h5 class="mb-2 font-semibold">No tweets posted</h5>
              <p>
                This channel hasn't posted any tweets yet. Follow them to see
                their latest updates.
              </p>
            </div>
          </div>
        );

      case "subscribed":
        return (
          <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2">
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
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    ></path>
                  </svg>
                </span>
              </p>
              <h5 class="mb-2 font-semibold">No subscriptions</h5>
              <p>
                This channel hasn't subscribed to any other channels yet. Their
                subscriptions will appear here.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1092424/pexels-photo-1092424.jpeg?auto=compress"
      />
      <link
        rel="preload"
        as="image"
        href="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
      />
      <div class="h-screen overflow-y-auto bg-[#121212] text-white">
        <div class="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <section class="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            {channelData && typeof channelData === "object" ? (
              <>
                <div class="relative min-h-[150px] w-full pt-[16.28%]">
                  <div class="absolute inset-0 overflow-hidden">
                    <img src={channelData?.coverImage} alt="cover-photo" />
                  </div>
                </div>
                <div class="px-4 pb-4">
                  <div class="flex flex-wrap gap-4 pb-4 pt-6">
                    <span class="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                      <img
                        src={channelData?.avatar}
                        alt="Channel"
                        class="h-full w-full"
                      />
                    </span>
                    <div class="mr-auto inline-block">
                      <h1 class="font-bolg text-xl">{channelData?.fullName}</h1>
                      <p class="text-sm text-gray-400">
                        {channelData?.userName}
                      </p>
                      <div className="flex gap-3">
                        <p class="text-sm text-gray-400">
                          {channelData?.subscribersCount} Subscribers
                        </p>
                        <p className="text-sm text-gray-400">
                          {channelData?.channelSubscribedToCount} Subscribed
                        </p>
                      </div>
                    </div>
                    <div class="inline-block">
                      <div class="inline-flex min-w-[145px] justify-end">
                        <button
                          onClick={() => {
                            setIsSubscribed(!isSubscribed);
                            subscriptionToggle(channelData?._id);
                          }}
                          className="group/btn mr-1 flex w-full items-center gap-x-2 bg-[#ae7aff] px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                        >
                          <span className="inline-block w-5">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth="2"
                              stroke="currentColor"
                              aria-hidden="true"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                              ></path>
                            </svg>
                          </span>
                          {isSubscribed ? "Subscribed" : "Subscribe"}
                        </button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ul class="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
                      <li class="w-full">
                        <button
                          onClick={() => handleTabChange("videos")}
                          class={`w-full border-b-2 px-3 py-1.5 transition-colors ${
                            activeTab === "videos"
                              ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                              : "border-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          Videos
                        </button>
                      </li>

                      <li class="w-full">
                        <button
                          onClick={() => handleTabChange("tweets")}
                          class={`w-full border-b-2 px-3 py-1.5 transition-colors ${
                            activeTab === "tweets"
                              ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                              : "border-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          Tweets
                        </button>
                      </li>
                      <li class="w-full">
                        <button
                          onClick={() => handleTabChange("subscribed")}
                          class={`w-full border-b-2 px-3 py-1.5 transition-colors ${
                            activeTab === "subscribed"
                              ? "border-[#ae7aff] bg-white text-[#ae7aff]"
                              : "border-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          Subscribed
                        </button>
                      </li>
                    </ul>
                  </div>
                  {renderTabContent()}
                </div>
              </>
            ) : null}
          </section>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default ChannelPage;
