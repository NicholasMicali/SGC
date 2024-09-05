import React, { useState } from 'react';
import YouTube from 'react-youtube';

const YouTubeVideo = ({ videoId, isNarrowScreen, isMediumScreen }) => {
  const [videoCompleted, setVideoCompleted] = useState(false);
  const width = isNarrowScreen ? '320px' : isMediumScreen ? '480px' : '640px';
  const height = isNarrowScreen ? '180px' : isMediumScreen ? '270px' : '360px';
  const onReady = (event) => {
    // Store the player instance
    const player = event.target;
  };

  const onStateChange = (event) => {
    // YouTube video state: 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = video cued
    if (event.data === 0) {
      setVideoCompleted(true);
    }
  };
  //max width and height allowed by current screen
  const opts = {
    height: height,
    width: width,
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div>
      <YouTube videoId={videoId} opts={opts} onReady={onReady} onStateChange={onStateChange} />
      {videoCompleted && <p>Congratulations! You've completed the video.</p>}
    </div>
  );
};

export default YouTubeVideo;