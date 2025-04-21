import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";

TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

export const timeAgoFormat = (date) => {
  const dateObj = new Date(date);
  return timeAgo.format(dateObj);
};
