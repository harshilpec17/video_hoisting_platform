import React, { useState } from "react";
import SideBar from "../layout/SideBar";
import EditAccountDetail from "./EditAccountDetail";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChannelVideo,
  fetchUserChannelProfile,
} from "../../store/channelSlice";
import {
  fetchSubscribedList,
  fetchSubscriberList,
} from "../../store/subscriberSlice";
import { fetchUserTweets } from "../../store/tweetSlice";
import { startLoading, stopLoading } from "../../store/loaderSlice";
import ChangePassword from "./ChangePassword";
import ChangeAvatar from "./ChangeAvatar";

const EditPersonalInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const channelInfo = useSelector((state) => state.channel.channelProfile);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;
  const loggedInUserName = loggedInUser?.user?.userName;

  const [activeTab, setActiveTab] = useState("Personal Information");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const [changeAvatarModalOpen, setChangeAvatarModalOpen] = useState(false);
  const [imageType, setImageType] = useState("avatar");

  const renderTabContent = () => {
    switch (activeTab) {
      case "Personal Information":
        return <EditAccountDetail />;

      case "Change Password":
        return <ChangePassword />;
    }
  };
  return (
    <>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />
          <section className="w-full relative pb-[70px] sm:ml-[70px] sm:pb-0 lg:ml-0">
            <div className="relative min-h-[150px] w-full pt-[16.28%]">
              <div className="absolute inset-0 overflow-hidden">
                <img src={channelInfo?.coverImage} alt="cover-photo" />
              </div>
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <label
                  htmlFor="cover-image"
                  className="inline-block h-10 w-10 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
                >
                  <svg
                    onClick={() => {
                      setChangeAvatarModalOpen(true);
                      setImageType("cover");
                    }}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                    ></path>
                  </svg>
                </label>
              </div>
              <ChangeAvatar
                open={changeAvatarModalOpen}
                onClose={() => setChangeAvatarModalOpen(false)}
                currentImage={
                  imageType === "cover"
                    ? channelInfo?.coverImage
                    : channelInfo?.avatar
                }
                type={imageType}
                onSuccess={(data) => {}}
              />
            </div>
            <div className="px-4 pb-4">
              <div className="flex flex-wrap gap-4 pb-4 pt-6">
                <div className="relative -mt-12 inline-block h-28 w-28 shrink-0 overflow-hidden rounded-full border-stone-600 border-2">
                  <img
                    src={channelInfo.avatar}
                    alt="Channel"
                    className="h-full w-full"
                  />
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <label
                      htmlFor="profile-image"
                      className="inline-block h-8 w-8 cursor-pointer rounded-lg bg-white/60 p-1 text-[#ae7aff] hover:bg-white"
                    >
                      <svg
                        onClick={() => {
                          setChangeAvatarModalOpen(true);
                          setImageType("avatar");
                        }}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                        ></path>
                      </svg>
                    </label>
                  </div>
                </div>
                <div className="mr-auto inline-block">
                  <h1 className="font-bolg text-xl">{channelInfo.fullName}</h1>
                  <p className="text-sm text-gray-400">
                    @{channelInfo.userName}
                  </p>
                </div>
                <div className="inline-block">
                  <button
                    onClick={async () => {
                      try {
                        dispatch(startLoading());
                        await navigate("/channel");
                        await dispatch(fetchChannelVideo(loggedInUserId));
                        await dispatch(
                          fetchUserChannelProfile(loggedInUserName)
                        );
                        await dispatch(fetchSubscriberList(loggedInUserId));
                        await dispatch(fetchSubscribedList(loggedInUserId));
                        await dispatch(fetchUserTweets(loggedInUserId));
                      } catch {
                        console.error("Failed to update page:", error);
                        toast.error("Failed to update page");
                      } finally {
                        dispatch(stopLoading());
                      }
                    }}
                    className="bg-purple-500 py-2 px-6 cursor-pointer hover:bg-purple-700 rounded text-white shadow-2xl"
                  >
                    View channel
                  </button>
                </div>
              </div>
              <ul className="no-scrollbar sticky top-[66px] z-[2] flex flex-row gap-x-2 overflow-auto border-b-2 border-stone-300 bg-[#121212] py-2 sm:top-[82px]">
                <li className="w-full">
                  <button
                    onClick={() => {
                      handleTabChange("Personal Information");
                    }}
                    className={`w-full ${
                      activeTab === "Personal Information"
                        ? "border-black border-b-2 bg-purple-500"
                        : "border-transparent"
                    } px-3 py-1.5 text-white cursor-pointer`}
                  >
                    Personal Information
                  </button>
                </li>

                <li className="w-full">
                  <button
                    onClick={() => {
                      handleTabChange("Change Password");
                    }}
                    className={`w-full ${
                      activeTab === "Change Password"
                        ? "border-black border-b-2 bg-purple-500"
                        : "border-transparent"
                    } px-3 py-1.5 text-white cursor-pointer`}
                  >
                    Change Password
                  </button>
                </li>
              </ul>
            </div>
            {renderTabContent()}
          </section>
        </div>
      </div>
    </>
  );
};

export default EditPersonalInfo;
