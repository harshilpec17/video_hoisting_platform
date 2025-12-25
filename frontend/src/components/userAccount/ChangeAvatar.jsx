import React, { useMemo, useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constant";
import { motion } from "motion/react";
import { useDispatch } from "react-redux";
import { fetchUserChannelProfile } from "../../store/channelSlice";

const ChangeAvatar = ({
  open,
  onClose,
  currentImage,
  type = "avatar",
  onSuccess,
}) => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;
  const loggedUserName = loggedInUser?.user?.userName;

  if (!open) return null;

  const resetState = () => {
    setIsLoading(false);
    setFile(null);
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e?.preventDefault?.();

    const newErrors = {};
    if (!file) newErrors.file = "Please choose an image.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsLoading(true);
    try {
      const formData = new FormData();
      const isCover = type === "cover";
      const fieldName = isCover ? "coverImage" : "avatar";
      const endpoint = isCover
        ? "/login/update-cover-image"
        : "/login/update-avatar";

      formData.append(fieldName, file);

      const response = await axios.patch(
        `${API_BASE_URL}${endpoint}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      // Optional callback for parent to refresh state

      onSuccess?.(response.data?.data ?? response.data);

      dispatch(fetchUserChannelProfile(loggedUserName));

      resetState();
      onClose?.();
      return response.data?.data ?? response.data;
    } catch (err) {
      console.error("Error updating image:", err);
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const isDisabled = !file || isLoading;

  return (
    <div className="absolute inset-0 z-50 bg-black/50 px-4 pb-[86px] pt-4 h-screen sm:pr-40 sm:px-14 sm:py-8">
      <div className="h-max overflow-auto border bg-[#121212] p-6 max-w-md my-auto  mx-auto relative">
        <button
          className="absolute cursor-pointer top-3 right-3 text-gray-400 hover:text-white text-2xl"
          onClick={() => {
            resetState();
            onClose?.();
          }}
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4 text-white">
          {type === "cover" ? "Change Cover Image" : "Change Avatar"}
        </h2>

        {errors.general && (
          <p className="text-red-500 text-sm mb-4">{errors.general}</p>
        )}

        {/* Three boxes horizontally aligned */}
        <div className="flex flex-col gap-4 max-w-md items-stretch">
          {/* Box 1: Current image preview */}
          <div className="border border-stone-600 h-auto max-w-md rounded-md flex items-center justify-center overflow-hidden bg-neutral-900 shrink-0">
            {currentImage ? (
              <img
                src={currentImage}
                alt={type === "cover" ? "Current cover" : "Current avatar"}
                className="max-h-84 max-w-md object-cover"
              />
            ) : (
              <span className="text-xs text-gray-400 h-full w-full py-20 text-center">
                No current image
              </span>
            )}
          </div>

          {/* Box 3: File input */}
          <div className="border border-stone-600 rounded-md p-3 bg-neutral-900 flex flex-col justify-between flex-1 min-w-[220px]">
            <div>
              <label className="block text-gray-300 mb-2">
                {type === "cover" ? "Upload new cover" : "Upload new avatar"}
                <sup>*</sup>
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full file:cursor-pointer rounded p-1 file:mr-4 file:rounded file:border-none file:bg-amber-600 file:px-3 file:py-1.5 bg-neutral-800 text-white"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
              {errors.file && (
                <p className="text-red-500 text-sm pt-2">{errors.file}</p>
              )}
            </div>

            {/* Actions */}
            <div className="mt-4 flex gap-3">
              <button
                onClick={handleSubmit}
                disabled={isDisabled}
                className={`w-full cursor-pointer ${
                  isLoading ? "bg-stone-950" : "bg-amber-600"
                } text-white font-semibold py-2 rounded text-center`}
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

              <button
                type="button"
                onClick={() => {
                  resetState();
                  onClose?.();
                }}
                className="w-full cursor-pointer bg-stone-700 hover:bg-stone-600 text-white font-semibold py-2 rounded text-center"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangeAvatar;
