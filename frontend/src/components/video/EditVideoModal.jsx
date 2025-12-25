import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../utils/constant";
import { useDispatch } from "react-redux";
import axios from "axios";
import { fetchChannelVideo } from "../../store/channelSlice";
import { motion } from "motion/react";
import { toast, ToastContainer } from "react-toastify";

const EditVideoModal = ({
  open,
  onClose,
  video, // { thumbnail, title, description }
  onSubmit, // function to handle submit
}) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(video?.title || "");
  const [description, setDescription] = useState(video?.description || "");
  const [thumbnail, setThumbnail] = useState(null); // new file
  const [previewThumb, setPreviewThumb] = useState(video?.thumbnail || "");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;
  const loggedUserName = loggedInUser?.user?.userName;

  useEffect(() => {
    setTitle(video?.title || "");
    setDescription(video?.description || "");
    setPreviewThumb(video?.thumbnail || "");
    setThumbnail(null);
    setMessage("");
  }, [video, open]);

  if (!open) return null;

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    if (file) {
      setPreviewThumb(URL.createObjectURL(file));
    } else {
      setPreviewThumb(video?.thumbnail || "");
    }
    // if (file && file.size > 2 * 1024 * 1024) {
    //   // 2MB limit
    //   setMessage("Thumbnail size should not exceed 2MB.");
    // } else {
    //   setMessage("");
    // }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Check if any changes made
    const isTitleChanged = title !== video.title;
    const isDescChanged = description !== video.description;
    const isThumbChanged = !!thumbnail;

    if (!isTitleChanged && !isDescChanged && !isThumbChanged) {
      setMessage("No changes made.");
      return;
    }

    setMessage("");
    // Call parent handler with changed data
    const changes = new FormData();
    if (isTitleChanged) changes.append("newTitle", title);
    if (isDescChanged) changes.append("newDescription", description);
    if (isThumbChanged) changes.append("newThumbnail", thumbnail);

    setIsLoading(true);
    try {
      const response = await axios.patch(
        `${API_BASE_URL}/video/${video._id}`,
        changes,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      setThumbnail(null);
      setPreviewThumb("");
      setMessage("Thumbnail updated successfully.");
      dispatch(fetchChannelVideo(loggedInUserId));
      setIsLoading(false);
      onClose();
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute inset-0 z-50 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
      <div className="h-max overflow-auto border bg-[#121212] p-6 max-w-md max-h-screen mx-auto relative">
        <button
          className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4 text-white">Edit Video</h2>
        {message && <p className="text-red-500 text-sm mb-4">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Thumbnail</label>
            <img
              src={previewThumb}
              alt="Current Thumbnail"
              className="mb-2 w-full h-full object-cover rounded"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full file:cursor-pointer rounded p-1 file:mr-4 file:rounded file:border-none file:bg-amber-600 file:px-3 file:py-1.5 bg-neutral-900 text-white"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 rounded bg-zinc-700"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Edit video title"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-1">Description</label>
            <textarea
              className="w-full px-3 py-2 rounded bg-zinc-700"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Edit video description"
            />
          </div>
          <button
            type="submit"
            className={`w-full cursor-pointer ${
              isLoading ? "bg-stone-950" : "bg-amber-600"
            }  text-white  font-semibold py-2 rounded`}
            onClick={handleSubmit}
          >
            {isLoading ? (
              <div className="font-sans font-bold [--shadow-color:var(--color-neutral-500)] dark:[--shadow-color:var(--color-neutral-100)]">
                {"uploading...".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{
                      scale: [1, 1.1, 1],
                      textShadow: [
                        "0 0 0 var(--shadow-color)",
                        "0 0 1px var(--shadow-color)",
                        "0 0 0 var(--shadow-color)",
                      ],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: i * 0.05,
                      ease: "easeInOut",
                      repeatDelay: 0.5,
                    }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
              </div>
            ) : (
              <span className="font-semibold">Upload</span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditVideoModal;
