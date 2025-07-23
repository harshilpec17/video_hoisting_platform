import React, { use, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeAgo } from "../../utils/timeAgo";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { BiDislike, BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import {
  setVideoDisLike,
  setVideoDisLikeCount,
  setVideoId,
  setVideoLike,
  setVideoLikeCount,
} from "../../store/createVideoSlice";
import { fetchVideoById, setWatchVideo } from "../../store/createVideoSlice";
import SideBar from "../layout/SideBar";
import { duration } from "../../utils/duration";
import {
  fetchChannelVideo,
  fetchUserChannelProfile,
} from "../../store/ChannelSlice";
import {
  setIsSubscribed,
  subscriptionToggle,
} from "../../store/SubscriberSlice";

const VideoDetailPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const video = useSelector((state) => state.video.currentVideo);
  const likeCount = useSelector((state) => state.video.likeCount);
  const isLiked = useSelector((state) => state.video.isLiked);
  const disLikeCount = useSelector((state) => state.video.disLikeCount);
  const isDisliked = useSelector((state) => state.video.isDisliked);

  const videoId = useSelector((state) => state.video.videoId);

  const videoList = useSelector((state) => state.video.videoList);

  const channelData = useSelector((state) => state.channel.channelProfile);

  const isSubscribed = useSelector(
    (state) => state.channel.channelProfile?.isSubscribed
  );

  console.log("channelData", channelData);

  const [comments, setComments] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [commentId, setCommentId] = useState(null);
  const [editingCommentText, setEditingCommentText] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;

  const handleLike = async () => {
    if (isLiked) {
      // If already liked, remove the like
      dispatch(setVideoLike(false));
      dispatch(setVideoLikeCount(likeCount - 1));
      toast.success("Like removed");
    } else {
      dispatch(setVideoLikeCount(likeCount + 1));
      dispatch(setVideoLike(true));
      toast.success("Video liked");
      if (isDisliked) {
        // If previously disliked, remove the dislike
        dispatch(setVideoDisLike(false));
        dispatch(setVideoDisLikeCount(likeCount - 1));
      }
    }

    const response = await axios.post(
      "/url/like/toggle/v/" + videoId,
      {
        reactionType: "like",
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success(response.data.data);
    } else {
      toast.error(response.data.data);
    }
  };

  const handleDisLike = async () => {
    if (isDisliked) {
      // If already liked, remove the like
      dispatch(setVideoDisLike(false));
      dispatch(setVideoDisLikeCount(disLikeCount - 1));
      toast.success("DisLike removed");
    } else {
      dispatch(setVideoDisLikeCount(disLikeCount + 1));
      dispatch(setVideoDisLike(true));
      toast.success("Video Disliked");
      if (isLiked) {
        // If previously disliked, remove the dislike
        dispatch(setVideoLike(false));
        dispatch(setVideoLikeCount(likeCount - 1));
      }
    }

    const response = await axios.post(
      "/url/like/toggle/v/" + videoId,
      {
        reactionType: "dislike",
      },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      }
    );
    if (response.status === 200) {
      toast.success(response.data.data);
    } else {
      toast.error(response.data.data);
    }
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
  //       console.log("subscribed status", response.data);
  //       toast.success(response.data.message);
  //       dispatch(fetchUserChannelProfile(userName));
  //     }
  //   } catch (error) {
  //     console.error("Error fetching comments:", error);
  //   }
  // };

  const getAllComments = async () => {
    try {
      const response = await axios.get(`/url/comment/${videoId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      if (response.status === 200) {
        console.log("Comments fetched successfully:", response.data);
        setComments(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const addComment = async (commentText) => {
    try {
      if (commentText.trim() === "") {
        toast.error("Please add some text");
        return;
      }

      const response = await axios.post(
        `/url/comment/${videoId}`,
        { commentText },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Comment added successfully");
        console.log("Comment added:", response.data);

        getAllComments();
      } else {
        toast.error(response.data.data);
      }
    } catch (error) {
      console.error("Error adding comment:", error);
      toast.error("Failed to add comment");
    }
  };

  const updateComment = async (commentId, updatedText) => {
    try {
      if (updatedText.trim() === "") {
        toast.error("Please add some text");
        return;
      }

      const response = await axios.patch(
        `/url/comment/${commentId}`,
        { newCommentText: updatedText },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success("Comment updated successfully");
        console.log("Comment updated:", response.data);
        setEditingCommentId(null);
        getAllComments();
      } else {
        toast.error(response.data.data);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
      toast.error("Failed to update comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    console.log("Deleting comment with ID:", commentId);

    try {
      const response = await axios.delete(
        `/url/comment/${commentId}`,
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        },
        {
          commentId: commentId,
        }
      );

      if (response.status === 200) {
        toast.success("Comment deleted successfully");
        console.log("Comment deleted:", response.data);
        getAllComments();
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast.error("Failed to delete comment");
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    if (commentText.trim() !== "") {
      addComment(commentText);
      setCommentText(""); // Clear the input field after submitting
    }
  };

  useEffect(() => {
    getAllComments();
  }, [videoId]);

  return (
    <>
      <div className="h-screen overflow-y-auto bg-[#121212] text-white">
        <div className="flex min-h-[calc(100vh-66px)] sm:min-h-[calc(100vh-82px)]">
          <SideBar />

          <section className="w-full pb-[70px] sm:mx-[0px] sm:pb-0">
            <div className="flex w-full flex-wrap gap-4 p-4 lg:flex-nowrap">
              <div className="col-span-12 w-full">
                <div className="relative mb-4 w-full pt-[56%]">
                  <div className="absolute inset-0">
                    {video?.videoFile && (
                      <video
                        key={video?.videoFile}
                        className="h-full w-full"
                        controls
                        autoPlay
                        muted
                      >
                        <source src={video?.videoFile} type="video/mp4" />
                      </video>
                    )}
                  </div>
                </div>
                <div
                  className="group mb-4 w-full rounded-lg border p-4 duration-200 hover:bg-white/5 focus:bg-white/5"
                  role="button"
                  tabIndex="0"
                >
                  <div className="flex flex-wrap gap-y-2">
                    <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                      <h1 className="text-lg font-bold">{video?.title}</h1>
                      <p className="flex text-sm text-gray-200">
                        {video?.views} Views ·{" "}
                        {video?.createdAt ? timeAgo(video.createdAt) : null}{" "}
                      </p>
                    </div>
                    <div className="w-full md:w-1/2 lg:w-full xl:w-1/2">
                      <div className="flex items-center justify-between gap-x-4 md:justify-end lg:justify-between xl:justify-end">
                        <div className="flex overflow-hidden rounded-lg border">
                          <button
                            onClick={() => {
                              handleLike();
                            }}
                            className="group/btn flex items-center gap-x-2 border-r border-gray-700 px-4 py-1.5 after:content-[attr(data-like)] hover:bg-white/10 focus:after:content-[attr(data-like-alt)]"
                          >
                            <span
                              style={{ color: "white", fontSize: "1.5rem" }}
                            >
                              {isLiked ? <BiSolidLike /> : <BiLike />}
                            </span>

                            <span className="text-xl text-gray-200">
                              {likeCount}
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              handleDisLike();
                            }}
                            className="group/btn flex items-center gap-x-2 px-4 py-1.5 hover:bg-white/10 "
                          >
                            <span
                              style={{ color: "white", fontSize: "1.5rem" }}
                            >
                              {isDisliked ? <BiSolidDislike /> : <BiDislike />}
                            </span>
                            <span className="text-xl text-gray-200">
                              {disLikeCount}
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {channelData && (
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center gap-x-4">
                        <div className="mt-2 h-12 w-12 shrink-0">
                          <img
                            onClick={() => {
                              dispatch(
                                fetchUserChannelProfile(channelData?.userName)
                              );
                              dispatch(fetchChannelVideo(channelData?._id));
                              navigate("/channel");
                            }}
                            src={
                              channelData?.avatar ||
                              "https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                            }
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop in case fallback also fails
                              e.target.src =
                                "https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";
                            }}
                            className="h-full w-full rounded-full cursor-pointer"
                          />
                        </div>
                        <div
                          onClick={() => {
                            dispatch(
                              fetchUserChannelProfile(channelData?.userName)
                            );
                            dispatch(fetchChannelVideo(channelData?._id));
                            navigate("/channel");
                          }}
                          className="block cursor-pointer"
                        >
                          <p className="text-gray-200 hover:underline cursor-pointer">
                            {channelData?.userName}
                          </p>
                          <p className="text-sm font-bold text-gray-400">
                            {channelData?.subscribersCount} subscriber
                          </p>
                        </div>
                      </div>
                      <div className="block">
                        {isSubscribed ? (
                          <button
                            onClick={() => {
                              dispatch(
                                subscriptionToggle({
                                  loggedInUserId: loggedInUserId,
                                  channelId: channelData?._id,
                                  userName: channelData?.userName,
                                })
                              );
                            }}
                            type="button"
                            className="text-white hover:text-red-700 border border-red-800 hover:border-red-700 bg-red-800 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:text-white dark:hover:text-red-500 dark:hover:bg-transparent dark:focus:ring-red-900"
                          >
                            Subscribed
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              dispatch(
                                subscriptionToggle({
                                  loggedInUserId: loggedInUserId,
                                  channelId: channelData?._id,
                                  userName: channelData?.userName,
                                })
                              );
                            }}
                            type="button"
                            className="text-white hover:text-purple-700 border border-purple-800 hover:border-purple-700 bg-purple-800 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-purple-500 dark:text-white dark:hover:text-purple-400 dark:hover:bg-transparent dark:focus:ring-purple-900"
                          >
                            Subscribe
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  <hr className="my-4 border-white" />
                  <div className="h-5 overflow-hidden group-focus:h-auto">
                    <p className="text-sm">{video?.description}</p>
                  </div>
                </div>
                <button className="peer w-full rounded-lg border p-4 text-left duration-200 hover:bg-white/5 focus:bg-white/5 sm:hidden">
                  <h6 className="font-semibold">Comments</h6>
                </button>
                <div className="fixed inset-x-0 top-full z-[60] h-[calc(100%-69px)] overflow-auto rounded-lg border bg-[#121212] p-4 duration-200 hover:top-[67px] peer-focus:top-[67px] sm:static sm:h-auto sm:max-h-[500px] lg:max-h-none">
                  <div className="block">
                    <h6 className="mb-4 font-semibold">Comments</h6>
                    <form
                      className="mb-4 w-full"
                      onSubmit={handleCommentSubmit}
                    >
                      <div className="relative flex w-full">
                        <input
                          type="text"
                          value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}
                          // onKeyDown={handleCommentSubmit}
                          autoFocus
                          required
                          className="w-full rounded-lg border bg-transparent px-2 py-1 pr-24 placeholder-white"
                          placeholder="Add a Comment"
                        />
                        <button
                          type="submit"
                          onClick={handleCommentSubmit}
                          className="absolute right-0 top-1/2 border-white cursor-grab  -translate-y-1/2 rounded-lg bg-[#ae7aff] px-4 py-1 text-black"
                        >
                          Submit
                        </button>
                      </div>
                    </form>
                  </div>
                  <hr className="my-4 border-white" />

                  {comments &&
                    comments.length > 0 &&
                    comments.map((comment) => (
                      <>
                        <div key={comment._id} className="flex justify-between">
                          <div className="flex gap-x-4">
                            <div className="mt-2 h-11 w-11 shrink-0">
                              <img src={comment?.user_info?.avatar} />
                            </div>
                            <div className="block">
                              <p className="flex items-center text-gray-500">
                                {comment?.user_info?.fullName || "Anonymous"}{" "}
                                <span className="text-sm ml-3 text-gray-300">
                                  {" "}
                                  {timeAgo(comment?.createdAt)}{" "}
                                </span>
                              </p>
                              <p className="text-sm text-gray-200">
                                @{comment?.user_info?.userName || "anonymous"}
                              </p>
                              <div className="flex justify-between w-max">
                                {editingCommentId === comment._id ? (
                                  <div className="flex items-center justify-between ">
                                    <input
                                      className="flex-1 text-sm font-bold md:w-96 max-w-md mt-3 text-white border-0 border-b border-gray-500 focus:border-[#ae7aff] outline-none transition-all duration-150"
                                      value={editingCommentText}
                                      onChange={(e) =>
                                        setEditingCommentText(e.target.value)
                                      }
                                      autoFocus
                                      style={{ minWidth: 0 }}
                                    />
                                  </div>
                                ) : (
                                  <p className="mt-3 text-sm font-bold text-white">
                                    {comment?.content}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-y-4">
                            <div className="flex items-top gap-x-2">
                              {comment?.user_info?._id === loggedInUserId && (
                                <>
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
                                </>
                              )}
                            </div>
                            {editingCommentId === comment._id &&
                              comment?.user_info?._id === loggedInUserId && (
                                <div className="pt-2 md:pt-0">
                                  <button
                                    className="text-[#ae7aff] text-sm font-semibold px-2 py-1 rounded hover:bg-[#ae7aff]/10 transition"
                                    onClick={() =>
                                      updateComment(
                                        comment._id,
                                        editingCommentText
                                      )
                                    }
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="text-gray-400 text-sm  font-semibold px-2 py-1 rounded hover:bg-gray-700/30 transition"
                                    onClick={() => setEditingCommentId(null)}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              )}
                          </div>
                        </div>
                        <hr className="my-4 border-white" />
                      </>
                    ))}
                  <div className="flex gap-x-4">
                    <div className="mt-2 h-11 w-11 shrink-0">
                      <img
                        src="https://images.pexels.com/photos/18148932/pexels-photo-18148932/free-photo-of-woman-reading-book-on-a-bench.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                        alt="sarahjv"
                        className="h-full w-full rounded-full"
                      />
                    </div>
                    <div className="block">
                      <p className="flex items-center text-gray-200">
                        Sarah Johnson
                        <span className="text-sm">17 hour ago</span>
                      </p>
                      <p className="text-sm text-gray-200">@sarahjv</p>
                      <p className="mt-3 text-sm">
                        This series is exactly what I&#x27;ve been looking
                        htmlFor! Excited to dive into these advanced React
                        patterns. Thanks htmlFor putting this together!
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-span-12 flex w-full shrink-0 flex-col gap-3 lg:w-[350px] xl:w-[400px]">
                {videoList &&
                  videoList.length > 0 &&
                  videoList
                    .filter((video) => video._id !== videoId)
                    .map((video) => (
                      <div className="w-full gap-x-2 border pr-2 md:flex">
                        <div className="relative mb-2 w-full md:mb-0 md:w-5/12">
                          <div className="w-full pt-[56%]">
                            <div className="absolute inset-0">
                              <img
                                onClick={() => {
                                  dispatch(setVideoId(video._id));
                                  dispatch(
                                    fetchUserChannelProfile(
                                      video?.owner?.userName
                                    )
                                  );
                                  dispatch(fetchVideoById(video._id));
                                }}
                                src={
                                  video?.thumbnail ||
                                  "https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man"
                                }
                                alt="JavaScript Fundamentals: Variables and Data Types"
                                className="h-full w-full cursor-grab"
                              />
                            </div>
                            <span className="absolute bottom-1 right-1 inline-block rounded bg-black px-1.5 text-sm">
                              {duration(video?.duration)}
                            </span>
                          </div>
                        </div>
                        <div className="flex gap-x-2 px-2 pb-4 pt-1 md:w-7/12 md:px-0 md:py-0.5">
                          <div className="h-12 w-12 shrink-0 md:hidden">
                            <img
                              src="https://images.pexels.com/photos/18264716/pexels-photo-18264716/free-photo-of-man-people-laptop-internet.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                              alt="reactpatterns"
                              className="h-full w-full rounded-full"
                            />
                          </div>
                          <div className="w-full pt-1 md:pt-0">
                            <h6 className="mb-1 text-sm font-semibold">
                              {video?.title ||
                                "JavaScript Fundamentals: Variables and Data Types"}
                            </h6>
                            <p className="mb-0.5 mt-2 text-sm text-gray-200">
                              {video?.owner.userName || "reactpatterns"}
                            </p>
                            <p className="flex text-sm text-gray-200">
                              {video?.views} Views · {timeAgo(video?.createdAt)}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
              </div>
            </div>
          </section>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default VideoDetailPage;
