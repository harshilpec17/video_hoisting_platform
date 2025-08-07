import React, { useState } from "react";
import { ColourfulText } from "../../utils/ColorfulText";
import { API_BASE_URL } from "../../utils/constant";
import axios from "axios";
import { motion } from "motion/react";
import { fetchUserChannelProfile } from "../../store/channelSlice";
import { useDispatch } from "react-redux";
import { toast, ToastContainer } from "react-toastify";

const EditAccountDetail = () => {
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;
  const loggedInUserName = loggedInUser?.user?.userName;

  const [editFullName, setEditFullName] = useState(
    loggedInUser.user.fullName || ""
  );
  const [editUserName, setEditUserName] = useState(
    loggedInUser.user.userName || ""
  );

  const [editEmail, setEditEmail] = useState(loggedInUser.user.email || "");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFullNameChange = editFullName !== loggedInUser.user.fullName;
    const isUserNameChange = editUserName !== loggedInUser.user.userName;
    const isEmailChange = editEmail !== loggedInUser.user.email;

    if (!isFullNameChange && !isUserNameChange && !isEmailChange) {
      setMessage("Nothing to be change");
      return;
    }

    setMessage("");
    setIsLoading(true);

    try {
      const payload = {
        fullName: editFullName,
        userName: editUserName,
        email: editEmail,
      };

      const response = await axios.patch(
        `${API_BASE_URL}/login/update-account`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
          },
        }
      );
      setEditEmail("");
      setEditFullName("");
      setEditUserName("");
      setIsLoading(false);
      setMessage("");
      localStorage.setItem("user", JSON.stringify(response.data.data));
      dispatch(fetchUserChannelProfile(loggedInUserName));
      toast.success("Account Details updated");
      return response.data.data;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-y-4 p-4 sm:p-10 mb-44">
      <div className="w-full sm:w-1/2 lg:w-1/3 p-2">
        <div className=" text-3xl sm:text-5xl">
          <ColourfulText text={"Personal Info"} />
        </div>
        <p className="text-gray-300 text-lg mt-2">
          Update your photo and personal details.
        </p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-2/3">
        <div className="border border-neutral-600">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-wrap gap-y-4 p-4 bg-gradient-to-r from-neutral-800 to-neutral-900">
              <div className="w-full lg:w-1/2 lg:pr-2">
                <label htmlFor="firstname" className="mb-1 inline-block">
                  Full name
                </label>
                <input
                  type="text"
                  className="w-full  shadow bg-stone-900 border-stone-600 border px-2 py-1.5"
                  id="firstname"
                  placeholder="Enter first name"
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                />
              </div>
              <div className="w-full lg:w-1/2 lg:pl-2">
                <label htmlFor="lastname" className="mb-1 inline-block">
                  User name
                </label>
                <input
                  type="text"
                  className="w-full  shadow bg-stone-900 border-stone-600 border px-2 py-1.5"
                  id="lastname"
                  placeholder="Enter User Name"
                  value={editUserName}
                  onChange={(e) => setEditUserName(e.target.value)}
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="mb-1 inline-block">
                  Email address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                    <svg
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
                        d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="email"
                    className="w-full shadow bg-stone-900 border-stone-600 border py-1.5 pl-10 pr-2"
                    id="lastname"
                    placeholder="Enter email address"
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <hr className="border border-neutral-600" />
            <div className="flex items-center justify-end gap-4 p-4">
              <button className="inline-block border  bg-red-400 rounded hover:bg-red-500 px-3 py-1.5 cursor-pointer text-black">
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className={`inline-block ${
                  isLoading ? "bg-gray-400" : "bg-amber-400"
                } rounded hover:bg-amber-500 cursor-pointer px-3 py-1.5 text-black`}
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
            </div>
            {message && (
              <p className="text-red-500 text-md font-bold py-2 px-4 bg-amber-100">
                Error: {message}
              </p>
            )}
          </form>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default EditAccountDetail;
