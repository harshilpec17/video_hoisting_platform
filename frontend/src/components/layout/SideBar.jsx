import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { fetchLikedVideos } from "../../store/likeSlice";
import { fetchWatchHistory } from "../../store/watchHistorySlice";
import {
  fetchChannelVideo,
  fetchUserChannelProfile,
} from "../../store/channelSlice";
import {
  fetchSubscriberList,
  fetchSubscribedList,
} from "../../store/subscriberSlice";
import { fetchAllTweets, fetchUserTweets } from "../../store/tweetSlice.js";
import { startLoading, stopLoading } from "../../store/loaderSlice.js";
import { toast } from "react-toastify";
import { fetchChannelDashboard } from "../../store/dashboardSlice.js";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const loggedInUserId = loggedInUser?.user?._id;
  const loggedUserName = loggedInUser?.user?.userName;

  return (
    <>
      <div className="group fixed inset-x-0 bottom-0 z-40 w-full shrink-0 border border-neutral-600 bg-[#121212] px-2 py-2  sm:absolute sm:inset-y-0 sm:max-w-[70px] sm:border-r sm:border-t-0 sm:py-6 sm:hover:max-w-[250px] lg:sticky lg:max-w-[250px]">
        <ul className="flex justify-around gap-y-2 sm:sticky sm:top-[106px] sm:min-h-[calc(100vh-130px)] sm:flex-col">
          <li className="sm:block hidden">
            <button
              onClick={() => {
                navigate("/videolistingpage");
              }}
              className="flex flex-col cursor-pointer items-center justify-center border-neutral-600 py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 20 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 15.9997H14M9.0177 1.76375L2.23539 7.03888C1.78202 7.3915 1.55534 7.56781 1.39203 7.78861C1.24737 7.9842 1.1396 8.20454 1.07403 8.43881C1 8.70327 1 8.99045 1 9.56481V16.7997C1 17.9198 1 18.4799 1.21799 18.9077C1.40973 19.284 1.71569 19.59 2.09202 19.7818C2.51984 19.9997 3.07989 19.9997 4.2 19.9997H15.8C16.9201 19.9997 17.4802 19.9997 17.908 19.7818C18.2843 19.59 18.5903 19.284 18.782 18.9077C19 18.4799 19 17.9198 19 16.7997V9.56481C19 8.99045 19 8.70327 18.926 8.43881C18.8604 8.20454 18.7526 7.9842 18.608 7.78861C18.4447 7.56781 18.218 7.3915 17.7646 7.03888L10.9823 1.76376C10.631 1.4905 10.4553 1.35388 10.2613 1.30136C10.0902 1.25502 9.9098 1.25502 9.73865 1.30136C9.54468 1.35388 9.36902 1.4905 9.0177 1.76375Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Home
              </span>
            </button>
          </li>
          <li className="hidden sm:block">
            <button
              onClick={() => {
                navigate("/video/likedVideos");
                dispatch(
                  fetchLikedVideos({ userId: loggedInUserId, reaction: "like" })
                );
              }}
              className="flex cursor-pointer flex-col items-center justify-center border-neutral-600 py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 21V10M1 12V19C1 20.1046 1.89543 21 3 21H16.4262C17.907 21 19.1662 19.9197 19.3914 18.4562L20.4683 11.4562C20.7479 9.6389 19.3418 8 17.5032 8H14C13.4477 8 13 7.55228 13 7V3.46584C13 2.10399 11.896 1 10.5342 1C10.2093 1 9.91498 1.1913 9.78306 1.48812L6.26394 9.40614C6.10344 9.76727 5.74532 10 5.35013 10H3C1.89543 10 1 10.8954 1 12Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Liked Videos
              </span>
            </button>
          </li>
          <li className="sm:block hidden">
            <button
              onClick={() => {
                navigate("/video/watchHistory");
                dispatch(fetchWatchHistory(loggedInUserId));
              }}
              className="flex flex-col cursor-pointer items-center justify-center border-neutral-600 py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 22 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20.7 11.5L18.7005 9.5L16.7 11.5M19 10C19 14.9706 14.9706 19 10 19C5.02944 19 1 14.9706 1 10C1 5.02944 5.02944 1 10 1C13.3019 1 16.1885 2.77814 17.7545 5.42909M10 5V10L13 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Watch History
              </span>
            </button>
          </li>
          <li className="hidden sm:block">
            <button
              onClick={async () => {
                try {
                  dispatch(startLoading());
                  await navigate("/channel");
                  await dispatch(fetchChannelVideo(loggedInUserId));
                  await dispatch(fetchUserChannelProfile(loggedUserName));
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
              className="flex flex-col items-center cursor-pointer justify-center border-neutral-600 py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 22 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 4.93137C21 4.32555 21 4.02265 20.8802 3.88238C20.7763 3.76068 20.6203 3.69609 20.4608 3.70865C20.2769 3.72312 20.0627 3.93731 19.6343 4.36569L16 8L19.6343 11.6343C20.0627 12.0627 20.2769 12.2769 20.4608 12.2914C20.6203 12.3039 20.7763 12.2393 20.8802 12.1176C21 11.9774 21 11.6744 21 11.0686V4.93137Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M1 5.8C1 4.11984 1 3.27976 1.32698 2.63803C1.6146 2.07354 2.07354 1.6146 2.63803 1.32698C3.27976 1 4.11984 1 5.8 1H11.2C12.8802 1 13.7202 1 14.362 1.32698C14.9265 1.6146 15.3854 2.07354 15.673 2.63803C16 3.27976 16 4.11984 16 5.8V10.2C16 11.8802 16 12.7202 15.673 13.362C15.3854 13.9265 14.9265 14.3854 14.362 14.673C13.7202 15 12.8802 15 11.2 15H5.8C4.11984 15 3.27976 15 2.63803 14.673C2.07354 14.3854 1.6146 13.9265 1.32698 13.362C1 12.7202 1 11.8802 1 10.2V5.8Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                My Channel
              </span>
            </button>
          </li>
          <li className="hidden sm:block">
            <button
              onClick={async () => {
                try {
                  dispatch(startLoading());
                  navigate("/tweet");
                  await dispatch(fetchAllTweets({ page: 1, limit: 10 }));
                } catch (error) {
                  console.error("Error fetching tweets:", error);
                  toast.error("Failed to fetch tweets");
                } finally {
                  dispatch(stopLoading());
                }
              }}
              className="flex flex-col items-center cursor-pointer justify-center border-neutral-600 py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7 17C4.23858 17 2 14.7614 2 12C2 9.23858 4.23858 7 7 7C9.76142 7 12 9.23858 12 12C12 14.7614 9.76142 17 7 17ZM7 17V21L11 17"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M17 7C19.7614 7 22 9.23858 22 12C22 14.7614 19.7614 17 17 17C16.4477 17 15.9477 16.8946 15.5 16.7071"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                Community
              </span>
            </button>
          </li>
          <li className="hidden sm:block">
            <button
              onClick={async () => {
                try {
                  dispatch(startLoading());
                  await dispatch(fetchUserChannelProfile(loggedUserName));
                  await dispatch(fetchChannelDashboard(loggedInUserId));
                  await dispatch(fetchChannelVideo(loggedInUserId));
                  await navigate("/channel/dashboard");
                } catch (error) {
                  console.error("Error fetching user channel profile:", error);
                  toast.error("Failed to fetch user channel profile");
                } finally {
                  dispatch(stopLoading());
                }
              }}
              className="flex flex-col items-center cursor-pointer justify-center border-neutral-600 py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  style={{ width: "100%" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4C7.03 4 3 7.58 3 12c0 2.97 2.16 5.5 5.25 6.61.36.13.75.19 1.13.19.38 0 .77-.06 1.13-.19l1.24.86c.32.22.74.22 1.06 0l1.24-.86c.36.13.75.19 1.13.19.38 0 .77-.06 1.13-.19C18.84 17.5 21 14.97 21 12c0-4.42-4.03-8-9-8zm0 14c-3.87 0-7-2.69-7-6s3.13-6 7-6 7 2.69 7 6-3.13 6-7 6zm0-8a2 2 0 100 4 2 2 0 000-4z"
                    fill="currentColor"
                  />
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                My Dashboard
              </span>
            </button>
          </li>
          <li className="hidden sm:block mt-auto">
            <button
              onClick={() => {
                navigate("/userinfo");
                dispatch(fetchUserChannelProfile(loggedUserName));
              }}
              className="flex flex-col cursor-pointer items-center justify-center border-neutral-600 py-1 focus:text-[#ae7aff] sm:w-full sm:flex-row sm:border sm:p-1.5 sm:hover:bg-[#ae7aff] sm:hover:text-black sm:focus:border-[#ae7aff] sm:focus:bg-[#ae7aff] sm:focus:text-black sm:group-hover:justify-start sm:group-hover:px-4 lg:justify-start lg:px-4"
            >
              <span className="inline-block w-5 shrink-0 sm:group-hover:mr-4 lg:mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="icon icon-tabler icons-tabler-filled icon-tabler-user"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 2a5 5 0 1 1 -5 5l.005 -.217a5 5 0 0 1 4.995 -4.783z" />
                  <path d="M14 14a5 5 0 0 1 5 5v1a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-1a5 5 0 0 1 5 -5h4z" />
                </svg>
              </span>
              <span className="block sm:hidden sm:group-hover:inline lg:inline">
                My Account
              </span>
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;
