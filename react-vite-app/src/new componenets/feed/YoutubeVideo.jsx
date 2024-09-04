import React, { useState } from 'react';
import YouTube from 'react-youtube';

const YouTubeVideo = ({ videoId }) => {
  const [videoCompleted, setVideoCompleted] = useState(false);

  const onReady = (event) => {
    // Store the player instance
    const player = event.target;
  };

  const onStateChange = (event) => {
    // YouTube video state: 0 = ended, 1 = playing, 2 = paused, 3 = buffering, 5 = video cued
    if (event.data === 0) {
      setVideoCompleted(true);
      console.log('Video has ended!');
    }
  };

  const opts = {
    height: '390',
    width: '640',
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