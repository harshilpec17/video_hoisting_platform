import React from "react";

const Video = () => {
  return (
    <>
      <div className="video">
        <video width={720} height={320} autoplay controls loop muted>
          <source
            src="https://www.w3schools.com/html/mov_bbb.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </>
  );
};

export default Video;
