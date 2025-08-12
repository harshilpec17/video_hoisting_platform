import React, { useState } from "react";
import SideBar from "../layout/SideBar";
import { useDispatch, useSelector } from "react-redux";
import ChannelVideo from "./ChannelVideo";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { fetchUserChannelProfile } from "../../store/channelSlice";
import ChannelSubscribedPage from "./ChannelSubscribedPage";
import ChannelSubscriberPage from "./ChannelSubscriberPage";
import {
  fetchSubscribedList,
  fetchSubscriberList,
  subscriptionToggle,
} from "../../store/subscriberSlice";
import { useLocation } from "react-router";
import ChannelTweetPage from "./ChannelTweetPage";
import { startLoading, stopLoading } from "../../store/loaderSlice";

const ChannelPage = () => {
  const dispatch = useDispatch();

  const location = useLocation();
  const isMyChannel = location.state?.isMyChannel ?? true; // default true

  const channelData = useSelector((state) => state.channel.channelProfile);

  const isSubscribed = useSelector(
    (state) => state.channel.channelProfile?.isSubscribed
  );

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;
  const loggedInUserName = loggedInUser?.user?.userName;

  // Add state for active tab
  const [activeTab, setActiveTab] = useState("videos");

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  // const subscriptionToggle = async (channelId) => {
  //   try {
  //     const response = await axios.post(
  //       `url/ch/${channelId}`,
  //       { loggedInUserId },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
  //         },
  //       }
  //     );
  //     if (response.status === 200) {
  //       console.log("subscribers status", response.data);
  //       toast.success(response.data.message);
  //       dispatch(fetchUserChannelProfile(userName));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // };

  // Function to render content based on active tab
  const renderTabContent = () => {
    switch (activeTab) {
      case "videos":
        return <ChannelVideo />;

      case "tweets":
        return isMyChannel ? <ChannelTweetPage /> : null;

      case "subscriptions":
        return isMyChannel ? <ChannelSubscribedPage /> : null;

      case "subscribers":
        return isMyChannel ? <ChannelSubscriberPage /> : null;

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
      <div className="h-screen no-scrollbar overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <section className="w-full pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            {channelData && typeof channelData === "object" ? (
              <>
                <div className="relative min-h-[150px] w-full pt-[16.28%]">
                  <div className="absolute inset-0 overflow-hidden">
                    <img src={channelData?.coverImage} alt="cover-photo" />
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <div className="flex flex-wrap gap-4 pb-4 pt-6">
                    <span className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-2">
                      <img
                        src={channelData?.avatar}
                        alt="Channel"
                        className="h-full w-full"
                      />
                    </span>
                    <div className="mr-auto inline-block">
                      <h1 className="font-bolg text-xl">
                        {channelData?.fullName}
                      </h1>
                      <p className="text-sm text-gray-400">
                        {channelData?.userName}
                      </p>
                      <div className="flex gap-3">
                        <p className="text-sm text-gray-400">
                          {channelData?.subscribersCount} Subscribers
                        </p>
                        <p className="text-sm text-gray-400">
                          {channelData?.channelSubscribedToCount} Subscribed
                        </p>
                      </div>
                    </div>
                    <div className="inline-block">
                      <div className="inline-flex min-w-[145px] justify-end">
                        <div className="block">
                          {isSubscribed ? (
                            <button
                              onClick={async () => {
                                await dispatch(
                                  subscriptionToggle({
                                    loggedInUserId: loggedInUserId,
                                    channelId: channelData._id,
                                    userName: loggedInUserName,
                                  })
                                );
                                dispatch(fetchSubscribedList(loggedInUserId));
                              }}
                              type="button"
                              className="text-white hover:text-red-700 border border-red-800 hover:border-red-700 bg-red-800 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:text-white dark:hover:text-red-500 dark:hover:bg-transparent dark:focus:ring-red-900"
                            >
                              Subscribed
                            </button>
                          ) : (
                            <button
                              onClick={async () => {
                                await dispatch(
                                  subscriptionToggle({
                                    loggedInUserId: loggedInUserId,
                                    channelId: channelData._id,
                                    userName: loggedInUserName,
                                  })
                                );
                                dispatch(fetchSubscribedList(loggedInUserId));
                              }}
                              type="button"
                              className="text-white hover:text-purple-700 border border-purple-800 hover:border-purple-700 bg-purple-800 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-purple-500 dark:text-white dark:hover:text-purple-400 dark:hover:bg-transparent dark:focus:ring-purple-900"
                            >
                              Subscribe
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-gray-400 bg-[#121212] py-2 sm:top-[82px]">
                      <li className="w-full">
                        <button
                          onClick={() => handleTabChange("videos")}
                          className={`w-full border-b-2 px-3 py-1.5 transition-colors cursor-pointer ${
                            activeTab === "videos"
                              ? "border-[#ae7aff] bg-purple-500 text-white"
                              : "border-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          Videos
                        </button>
                      </li>

                      <li className="w-full">
                        <button
                          onClick={async () => {
                            try {
                              dispatch(startLoading());
                              await handleTabChange("tweets");
                            } catch (error) {
                              console.error("Error fetching tweets:", error);
                              toast.error("Failed to fetch tweets");
                            } finally {
                              dispatch(stopLoading());
                            }
                          }}
                          className={`w-full border-b-2 px-3 py-1.5 cursor-pointer transition-colors ${
                            activeTab === "tweets"
                              ? "border-[#ae7aff] bg-purple-500 text-white"
                              : "border-transparent text-gray-400 hover:text-white"
                          }`}
                        >
                          Tweets
                        </button>
                      </li>
                      {isMyChannel && (
                        <>
                          <li className="w-full">
                            <button
                              onClick={() => {
                                handleTabChange("subscriptions");
                                dispatch(fetchSubscribedList(loggedInUserId));
                              }}
                              className={`w-full border-b-2 px-3 py-1.5 cursor-pointer transition-colors ${
                                activeTab === "subscriptions"
                                  ? "border-[#ae7aff] bg-purple-500 text-white"
                                  : "border-transparent text-gray-400 hover:text-white"
                              }`}
                            >
                              Subscriptions
                            </button>
                          </li>
                          <li className="w-full">
                            <button
                              // onClick={() => handleTabChange("subscribers")}
                              onClick={() => {
                                handleTabChange("subscribers");
                                dispatch(fetchSubscriberList(loggedInUserId));
                              }}
                              className={`w-full border-b-2 px-3 py-1.5  cursor-pointer transition-colors ${
                                activeTab === "subscribers"
                                  ? "border-[#ae7aff] bg-purple-500 text-white"
                                  : "border-transparent text-gray-400 hover:text-white"
                              }`}
                            >
                              Subscribers
                            </button>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  {renderTabContent()}
                </div>
              </>
            ) : null}
          </section>
        </div>
      </div>
    </>
  );
};

export default ChannelPage;
