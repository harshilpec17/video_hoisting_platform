import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../../utils/constant";
import axios from "axios";
import { fetchChannelVideo } from "../../store/channelSlice";
import { motion } from "motion/react";
import Loader from "../../utils/Loader";

const UploadVideoModal = ({ open, onClose }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [errors, setErrors] = useState({});

  if (!open) return null;

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!videoFile) newErrors.videoFile = "Video file is required.";
    if (!thumbnail) newErrors.thumbnail = "Thumbnail is required.";
    if (!title.trim()) newErrors.title = "Title is required.";
    if (!description.trim()) newErrors.description = "Description is required.";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("videoFile", videoFile);
      formData.append("thumbnail", thumbnail);
      formData.append("title", title);
      formData.append("description", description);

      const response = await axios.post(`${API_BASE_URL}/video`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
        },
      });
      console.log("Video uploaded successfully:", response.data);
      setTitle("");
      setDescription("");
      setVideoFile(null);
      setThumbnail(null);
      setErrors({});
      setIsLoading(false);
      dispatch(fetchChannelVideo(loggedInUserId));
      onClose(); // Close the modal after successful upload

      return response.data.data;
    } catch (err) {
      console.error("Error uploading video:", err);
      setErrors({ general: "Something went wrong. Please try again." });
      setTimeout(() => {
        onClose(); // Close the modal after 2 seconds
      }, 2000);
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled =
    !videoFile || !thumbnail || !title.trim() || !description.trim();
  return (
    <>
      <div className="absolute inset-0 z-50 bg-black/50 px-4 pb-[86px] pt-4 sm:px-14 sm:py-8">
        <div className="h-max overflow-auto border bg-[#121212] p-6 max-w-md mx-auto relative">
          <button
            className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-white text-2xl"
            onClick={onClose}
          >
            &times;
          </button>
          <h2 className="text-xl font-bold mb-4 text-white">Upload Video</h2>
          {errors.general && (
            <p className="text-red-500 text-sm mb-4">{errors.general}</p>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-300 mb-1">
                Video File
                <sup>*</sup>
              </label>
              <input
                type="file"
                accept="video/*"
                className={`w-full file:cursor-pointer rounded p-1 file:mr-4 file:rounded file:border-none file:bg-amber-600 file:px-3 file:py-1.5 ${
                  videoFile ? "bg-zinc-700" : "bg-neutral-900 text-white"
                }`}
                onChange={(e) => setVideoFile(e.target.files[0])}
              />
              {errors.videoFile && (
                <p className="text-red-500 text-sm pt-2 pl-0.5">
                  {errors.videoFile}
                </p>
              )}
            </div>

            <div class="mb-4">
              <label for="thumbnail" class="block text-gray-300 mb-1">
                Thumbnail
                <sup>*</sup>
              </label>
              <input
                id="thumbnail"
                type="file"
                accept="image/*"
                placeholder="upload thumbnail"
                onChange={(e) => setThumbnail(e.target.files[0])}
                className={`w-full file:cursor-pointer rounded p-1 file:mr-4 file:rounded file:border-none file:bg-amber-600 file:px-3 file:py-1.5 ${
                  thumbnail ? "bg-zinc-700" : "bg-neutral-900 text-white"
                }`}
              />
              {errors.thumbnail && (
                <p className="text-red-500 text-sm pt-2 pl-0.5">
                  {errors.thumbnail}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-1">
                Title
                <sup>*</sup>
              </label>
              <input
                type="text"
                className={`w-full px-3 py-2 rounded ${
                  title.trim() ? "bg-zinc-700" : "bg-neutral-900"
                }`}
                placeholder="Enter video title"
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm pt-2 pl-0.5">
                  {errors.title}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-300 mb-1">
                Description
                <sup>*</sup>
              </label>
              <textarea
                className={`w-full px-3 py-2 rounded ${
                  description.trim() ? "bg-zinc-700" : "bg-neutral-900"
                }`}
                placeholder="Enter video description"
                rows={3}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 text-sm pt-1 pl-0.5">
                  {errors.description}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full cursor-pointer ${
                isLoading ? "bg-stone-950" : "bg-amber-600"
              }  text-white  font-semibold py-2 rounded`}
              disabled={isDisabled || isLoading}
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
    </>
  );
};

export default UploadVideoModal;
