import React, { useEffect, useState } from "react";
import { ColourfulText } from "../../utils/ColorfulText";
import axios from "axios";
import { API_BASE_URL } from "../../utils/constant";
import { toast, ToastContainer } from "react-toastify";

const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showOldPwd, setShowOldPwd] = useState(false);
  const [showNewPwd, setShowNewPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isMessageVisible, setIsMessageVisible] = useState(false);

  const handleSubmit = async () => {
    try {
      if (newPassword !== confirmPassword) {
        setMessage("New password and confirm password do not match.");
        setIsMessageVisible(true);
        return;
      } else {
        setMessage("Passwords match");
        setIsMessageVisible(false);
      }

      if (newPassword === "" && oldPassword === "") {
        setMessage("New Password and Current Password required");
        setIsMessageVisible(true);
        return;
      }

      if (newPassword === oldPassword) {
        setIsMessageVisible(true);
        setMessage("New Password and Current Password can't be the same");
        return;
      }

      if (!(newPassword && oldPassword && confirmPassword)) {
        setMessage("All fields required");
        setIsMessageVisible(true);
        return;
      }

      const password = {
        newPassword: newPassword,
        currentPassword: oldPassword,
      };

      const response = await axios.post(
        `${API_BASE_URL}/change-password`,
        password,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );

      if (response.status === 200) {
        setConfirmPassword("");
        setNewPassword("");
        setOldPassword("");
        setMessage("");
        setIsMessageVisible(false);
        toast.success("Password Change Successfully");
      }
      console.log(response);

      return response;
    } catch (error) {
      const backendError = error.response.data.message;
      setIsMessageVisible(true);
      setMessage(backendError);
      console.error("Error changing password:", error);
    }
  };

  return (
    <>
      <div className="flex flex-wrap justify-center gap-y-4 p-4 mb-44 sm:p-10">
        <div className="max-w-md sm:w-1/2 lg:w-1/3 p-2">
          <div className=" text-3xl sm:text-5xl">
            <ColourfulText text={"Password"} />
          </div>

          <p className="text-gray-300 text-lg mt-2">
            Please enter your current password to change your password.
          </p>
        </div>
        <div className=" sm:w-1/2 lg:w-2/3">
          <div className=" border bg-gradient-to-r from-neutral-800 to-neutral-900 border-neutral-600">
            <div className="flex flex-wrap gap-y-4 p-4">
              <div className="w-full">
                <label
                  className="mb-1 inline-block font-semibold tracking-wider"
                  htmlFor="old-pwd"
                >
                  Current password
                </label>
                <div className="relative">
                  <input
                    type={showOldPwd ? "text" : "password"}
                    className="w-full  border placeholder:text-stone-500 bg-stone-900 border-neutral-600 px-2 py-1.5"
                    id="old-pwd"
                    placeholder="Current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 mr-2 cursor-pointer"
                    onClick={() => setShowOldPwd((prev) => !prev)}
                  >
                    {showOldPwd ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0c-1.67 4.39-5.94 7.5-10.5 7.5S3.17 16.39 1.5 12C3.17 7.61 7.44 4.5 12 4.5s8.83 3.11 10.5 7.5z"
                        />
                      </svg>
                    ) : (
                      // Eye-off SVG
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>

                      // Eye SVG
                    )}
                  </span>
                </div>
              </div>
              <div className="w-full">
                <label
                  className="mb-1 inline-block font-semibold tracking-wider"
                  htmlFor="new-pwd"
                >
                  New password
                </label>
                <div className="relative">
                  <input
                    type={showNewPwd ? "text" : "password"}
                    className="w-full border placeholder:text-stone-500 bg-stone-900 border-neutral-600 px-2 py-1.5"
                    id="new-pwd"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 mr-2 cursor-pointer"
                    onClick={() => setShowNewPwd((prev) => !prev)}
                  >
                    {showNewPwd ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0c-1.67 4.39-5.94 7.5-10.5 7.5S3.17 16.39 1.5 12C3.17 7.61 7.44 4.5 12 4.5s8.83 3.11 10.5 7.5z"
                        />
                      </svg>
                    ) : (
                      // Eye-off SVG
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        class="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>

                      // Eye SVG
                    )}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-gray-300">
                  Your new password must be more than 8 characters.
                </p>
              </div>
              <div className="w-full">
                <label
                  className="mb-1 inline-block font-semibold tracking-wider"
                  htmlFor="cnfrm-pwd"
                >
                  Confirm password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPwd ? "text" : "password"}
                    className="w-full border placeholder:text-stone-500 border-neutral-600 bg-stone-900 px-2 py-1.5"
                    id="cnfrm-pwd"
                    placeholder="Confirm password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <span
                    className="absolute right-2 top-1/2 -translate-y-1/2 mr-2 cursor-pointer"
                    onClick={() => setShowConfirmPwd((prev) => !prev)}
                  >
                    {showConfirmPwd ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7.5 0c-1.67 4.39-5.94 7.5-10.5 7.5S3.17 16.39 1.5 12C3.17 7.61 7.44 4.5 12 4.5s8.83 3.11 10.5 7.5z"
                        />
                      </svg>
                    ) : (
                      // Eye-off SVG
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-eye-off"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
                        <path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
                        <path d="M3 3l18 18" />
                      </svg>

                      // Eye SVG
                    )}
                  </span>
                </div>
              </div>
              {isMessageVisible && (
                <p className="text-red-500 text-sm font-semibold py-1 px-1 tracking-wider font-sans">
                  Error: {message}
                </p>
              )}
            </div>
            <hr className=" border-neutral-600  border border-neutral-600-gray-300" />
            <div className="flex items-center justify-end gap-4 p-4">
              <button
                onClick={() => {
                  setConfirmPassword("");
                  setNewPassword("");
                  setOldPassword("");
                  setMessage("");
                  setIsMessageVisible(false);
                }}
                className="inline-block border  bg-red-400 rounded hover:bg-red-500 px-3 py-1.5 cursor-pointer text-black"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={`inline-block ${
                  isLoading ? "bg-gray-400" : "bg-amber-400"
                } rounded hover:bg-amber-500 cursor-pointer px-3 py-1.5 text-black`}
              >
                {" "}
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
                  <span className="font-semibold">Update Password</span>
                )}
              </button>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default ChangePassword;
