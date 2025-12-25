import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import {
  fetchSubscribedList,
  fetchSubscriberList,
  subscriptionToggle,
} from "../../store/subscriberSlice";

import { fetchUserChannelProfile } from "../../store/channelSlice";

const ChannelSubscriberPage = () => {
  const dispatch = useDispatch();
  const subscriber = useSelector((state) => state.subscriber.subscriberList);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const userName = loggedInUser?.user?.userName;
  const loggedInUserId = loggedInUser?.user?._id;

  return (
    <>
      {subscriber && subscriber.length !== 0 ? (
        <>
          <div class="flex flex-col gap-y-4 py-4">
            {subscriber.map((sub) => (
              <div class="flex w-full justify-between" key={sub?._id}>
                <div class="flex items-center gap-x-2">
                  <div class="h-14 w-14 shrink-0">
                    <img
                      src={sub?.avatar}
                      alt="Code Master"
                      class="h-full w-full rounded-full"
                    />
                  </div>
                  <div class="block">
                    <h6 class="font-semibold">{sub?.userName}</h6>
                    <p class="text-xs text-gray-400">
                      {sub?.channelSubscriber} Subscribers
                    </p>
                  </div>
                </div>
                <div class="block">
                  {sub?.subscribedToSubscriber ? (
                    <button
                      onClick={async () => {
                        await dispatch(
                          subscriptionToggle({
                            loggedInUserId: loggedInUserId,
                            channelId: sub?._id,
                            userName: userName,
                          })
                        );
                        dispatch(fetchSubscriberList(loggedInUserId));
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
                            channelId: sub?._id,
                            userName: loggedInUser?.user?.userName,
                          })
                        );
                        dispatch(fetchSubscriberList(loggedInUserId));
                        dispatch(fetchSubscribedList(loggedInUserId));
                      }}
                      type="button"
                      class="text-white hover:text-purple-700 border border-purple-800 hover:border-purple-700 bg-purple-800 hover:bg-transparent focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-purple-500 dark:text-white dark:hover:text-purple-400 dark:hover:bg-transparent dark:focus:ring-purple-900"
                    >
                      Subscribe
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center pb-80 min-h-screen">
          <div class="grid grid-cols-[repeat(auto-fit,_minmax(300px,_1fr))] gap-4 pt-2 m-auto w-max h-max p-10">
            <div class="w-full max-w-sm text-center">
              <p class="mb-3 w-full">
                <span class="inline-flex rounded-full bg-[#E4D3FF] p-2 text-[#AE7AFF]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                    class="w-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
                    ></path>
                  </svg>
                </span>
              </p>
              <h5 class="mb-2 font-semibold">No subscriptions</h5>
              <p>
                This channel hasn't subscribed to any other channels yet. Their
                subscriptions will appear here.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChannelSubscriberPage;
