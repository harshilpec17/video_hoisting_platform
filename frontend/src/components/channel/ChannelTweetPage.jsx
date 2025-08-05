import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import { timeAgo } from "../../utils/timeAgo";
import SideBar from "../layout/SideBar";
import { BiDislike, BiLike, BiSolidDislike, BiSolidLike } from "react-icons/bi";
import {
  handleLikeTweet,
  handleDislikeTweet,
  fetchAllTweets,
  resetTweets,
  createTweet,
  updateTweet,
  deleteTweet,
  fetchUserTweets,
} from "../../store/tweetSlice.js";
import Loader from "../../utils/Loader";
import { startLoading, stopLoading } from "../../store/loaderSlice";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import DeleteConfirmationModal from "../../utils/DeleteConfirmationModal.jsx";

const ChannelTweetPage = () => {
  const dispatch = useDispatch();
  const page = useSelector((state) => state.tweet.page);
  const userTweets = useSelector((state) => state.tweet.userTweets);
  const isLoading = useSelector((state) => state.loader.isLoading);

  const [tweetText, setTweetText] = useState("");
  const [tweetWarning, setTweetWarning] = useState("");
  const [editingTweetId, setEditingTweetId] = useState(null);
  const [editingTweetText, setEditingTweetText] = useState("");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [tweetToDelete, setTweetToDelete] = useState(null);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;

  // Handler for like
  const handleLike = async (tweetId) => {
    try {
      dispatch(startLoading());
      await dispatch(handleLikeTweet(tweetId));
      await dispatch(fetchAllTweets({ page, limit: 10 }));
      toast.success("Tweet liked successfully!");
    } catch (error) {
      console.error("Error liking tweet:", error);
      toast.error("Failed to like tweet.");
    } finally {
      dispatch(stopLoading());
    }
  };

  // Handler for dislike
  const handleDislike = async (tweetId) => {
    try {
      dispatch(startLoading());
      await dispatch(handleDislikeTweet(tweetId));
      // Reset tweets to ensure the latest state is fetched
      await dispatch(fetchAllTweets({ page, limit: 10 }));
      toast.success("Tweet disliked successfully!");
    } catch (error) {
      console.error("Error disliking tweet:", error);
      toast.error("Failed to dislike tweet.");
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleCreateTweet = async () => {
    if (!tweetText.trim()) {
      toast.error("Tweet cannot be empty.");
      return;
    }
    try {
      dispatch(startLoading());
      // Assuming there's an action to create a tweet
      await dispatch(createTweet(tweetText));
      setTweetText("");
      toast.success("Tweet created successfully!");
      await dispatch(fetchUserTweets(loggedInUserId));
    } catch (error) {
      console.error("Error creating tweet:", error);
      toast.error("Failed to create tweet.");
    } finally {
      dispatch(stopLoading());
    }
  };

  const handleTweetInputChange = (e) => {
    const text = e.target.value;
    setTweetText(text);
    const wordCount = text.trim().split(/\s+/).length;
    if (wordCount > 10) {
      setTweetWarning("You can only tweet up to 10 words.");
    } else {
      setTweetWarning("");
    }
  };
  const isMyChannel = loggedInUserId === "your-channel-id"; // Replace with actual channel ID logic

  return (
    <>
      <ToastContainer />
      <section className="w-full pb-[70px] pt-4">
        <div className="max-w-xl mx-auto px-2 sm:px-0">
          <DeleteConfirmationModal
            open={deleteModalOpen}
            item={"tweet"}
            onClose={() => {
              setDeleteModalOpen(false);
              setTweetToDelete(null);
            }}
            onDelete={async () => {
              try {
                dispatch(startLoading());
                await dispatch(deleteTweet(tweetToDelete));
                await dispatch(fetchUserTweets(loggedInUserId));

                toast.success("Tweet deleted successfully!");
              } catch (error) {
                console.error(error);
              } finally {
                dispatch(stopLoading());
                setDeleteModalOpen(false);
                setTweetToDelete(null);
              }
            }}
          />

          <h2 className="text-xl sm:text-2xl font-bold p-3">Tweets</h2>
          {/* Tweet input box */}
          <div className="mt-2 border pb-2">
            <textarea
              onChange={handleTweetInputChange}
              value={tweetText}
              className="mb-2 h-10 w-full resize-none border-none bg-transparent px-3 pt-2 outline-none"
              placeholder="What's happening?"
            ></textarea>
            <div className="flex items-center justify-end gap-x-3 px-3">
              <button
                onClick={handleCreateTweet}
                disabled={tweetWarning !== ""}
                className={`px-3 py-2 font-semibold cursor-pointer text-black ${
                  tweetWarning !== ""
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#ae7aff]"
                }`}
              >
                Send
              </button>
            </div>
          </div>
          {tweetWarning && (
            <div className="text-red-400 text-sm">{tweetWarning}</div>
          )}
          {userTweets.map((tweet, index) => (
            <div
              className="flex gap-3 border-b border-white py-4 last:border-b-transparent"
              key={tweet._id}
            >
              <div className="h-14 w-14 shrink-0">
                <img
                  src={tweet?.user_info?.avatar}
                  alt="React Patterns"
                  className="h-full w-full rounded-full"
                />
              </div>
              <div className="w-full">
                <div className="flex gap-1">
                  <h4 className="mb-1 flex items-center gap-x-2">
                    <span className="font-semibold text-gray-500">
                      {tweet?.user_info?.fullName}
                    </span>
                    <span className="inline-block text-sm text-gray-400">
                      {timeAgo(tweet?.createdAt)}
                    </span>
                  </h4>
                </div>
                {editingTweetId === tweet._id ? (
                  <div className="flex items-centerjustify-between">
                    <input
                      className="flex-1 text-md font-bold md:w-96 max-w-md text-white border-0 border-b border-gray-500 focus:border-[#ae7aff] outline-none transition-all duration-150"
                      value={editingTweetText}
                      onChange={(e) => setEditingTweetText(e.target.value)}
                      autoFocus
                      style={{ minWidth: 0 }}
                    />
                  </div>
                ) : (
                  <p className="mb-2 text-md">{tweet?.content}</p>
                )}

                {editingTweetId === tweet._id &&
                  tweet?.owner === loggedInUserId && (
                    <div className="pt-2 md:pt-0">
                      <button
                        className="text-[#ae7aff] text-sm font-semibold px-2 py-1 rounded hover:bg-[#ae7aff]/10 transition"
                        onClick={async () => {
                          try {
                            dispatch(startLoading());
                            if (!editingTweetText.trim()) {
                              toast.error("Tweet cannot be empty.");
                              return;
                            }
                            await dispatch(
                              updateTweet({
                                tweetId: tweet._id,
                                newTweet: editingTweetText,
                              })
                            );
                            toast.success("Tweet updated successfully!");
                            await dispatch(fetchUserTweets(loggedInUserId));
                            setEditingTweetId(null);
                            setEditingTweetText("");
                          } catch (error) {
                            console.error("Failed to update tweet:", error);
                          } finally {
                            dispatch(stopLoading());
                          }
                        }}
                      >
                        Update
                      </button>
                      <button
                        className="text-gray-400 text-sm  font-semibold px-2 py-1 rounded hover:bg-gray-700/30 transition"
                        onClick={() => setEditingTweetId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  )}
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex gap-3 ">
                  <button
                    onClick={() => handleLike(tweet._id)}
                    className="group/btn flex cursor-pointer items-center gap-x-2 border-gray-700 after:content-[attr(data-like)] focus:after:content-[attr(data-like-alt)]"
                  >
                    <span style={{ color: "white", fontSize: "1.3rem" }}>
                      {tweet?.isLiked ? <BiSolidLike /> : <BiLike />}
                    </span>
                    <span className="text-md text-gray-200">
                      {tweet.likeCount}
                    </span>
                  </button>
                  <button
                    onClick={() => handleDislike(tweet._id)}
                    className="group/btn cursor-pointer flex items-center gap-x-2 border-gray-700 after:content-[attr(data-like)]  focus:after:content-[attr(data-like-alt)] "
                  >
                    <span style={{ color: "white", fontSize: "1.3rem" }}>
                      {tweet?.isDisliked ? <BiSolidDislike /> : <BiDislike />}
                    </span>
                    <span className="text-md text-gray-200">
                      {tweet?.dislikeCount}
                    </span>
                  </button>
                </div>
                {tweet?.owner === loggedInUserId && (
                  <div className="flex gap-2 relative ml-auto border px-2 py-0.5 mb-1 bg-neutral-800 rounded-lg">
                    <div
                      onClick={() => {
                        setEditingTweetId(tweet._id);
                        setEditingTweetText(tweet.content);
                      }}
                      className="text-xl font-bold hover:bg-orange-500 h-7 py-1  rounded"
                    >
                      <RiEditLine />
                    </div>
                    <div
                      onClick={() => {
                        setDeleteModalOpen(true);
                        setTweetToDelete(tweet._id);
                      }}
                      className="text-xl font-bold hover:bg-red-500 h-7 py-1  rounded"
                    >
                      <MdOutlineDeleteOutline />
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default ChannelTweetPage;
