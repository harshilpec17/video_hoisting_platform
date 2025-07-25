export function timeAgo(createdAt) {
  const now = new Date();
  const difference = Math.abs(now - new Date(createdAt));

  const seconds = difference / 1000;
  const minutes = seconds / 60;
  const hours = minutes / 60;
  const days = hours / 24;
  const weeks = days / 7;
  const months = days / 30.44; // Average days in a month
  const years = months / 12;

  if (seconds < 60) {
    return `${Math.round(seconds)} s ago`;
  } else if (minutes < 60) {
    return `${Math.round(minutes)} m ago`;
  } else if (hours < 24) {
    return `${Math.round(hours)} hr ago`;
  } else if (days < 7) {
    return `${Math.round(days)} d ago`;
  } else if (weeks < 4) {
    return `${Math.round(weeks)} w ago`;
  } else if (months < 12) {
    return `${Math.round(months)} mo ago`;
  } else {
    return `${Math.round(years)} yr ago`;
  }
}
