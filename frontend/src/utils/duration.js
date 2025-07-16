export function duration(time) {
  const totalSeconds = Math.round(time); // Assuming `video.duration` is in seconds
  const hours = Math.floor(totalSeconds / 3600); // Calculate hours
  const minutes = Math.floor((totalSeconds % 3600) / 60); // Calculate remaining minutes
  const seconds = totalSeconds % 60; // Calculate remaining seconds

  if (hours > 0) {
    // Format as HH:MM:SS if hours exist
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  } else {
    // Format as MM:SS if no hours
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }
}
