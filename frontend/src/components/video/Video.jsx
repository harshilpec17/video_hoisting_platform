import React from "react";

const Video = ({ link }) => {
  return (
    <>
      <div className="video">
        <video width={720} height={320} autoplay controls loop muted>
          <source src={link} type="video/mp4" />
        </video>
      </div>
    </>
  );
};

export default Video;
