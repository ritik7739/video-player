// VideoPlayer.js

import React, { useRef, useState, useEffect, useContext } from 'react';
import { VideoContext } from '../VideoContext';

const VideoPlayer = () => {
  const videoRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);

  const { currentVideo } = useContext(VideoContext);

  useEffect(() => {
    const video = videoRef.current;

    const setVideoData = () => {
      setDuration(video.duration);
      setProgress(video.currentTime);
    };

    const handleProgress = () => setProgress(video.currentTime);

    video.addEventListener('loadedmetadata', setVideoData);
    video.addEventListener('timeupdate', handleProgress);

    return () => {
      video.removeEventListener('loadedmetadata', setVideoData);
      video.removeEventListener('timeupdate', handleProgress);
    };
  }, [currentVideo]); // Listen for changes in currentVideo

  const handlePlayPause = () => {
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const handleSpeedChange = (e) => {
    const newSpeed = Number(e.target.value);
    videoRef.current.playbackRate = newSpeed;
    setSpeed(newSpeed);
  };

  const handleSeekChange = (e) => {
    const newTime = Number(e.target.value);
    videoRef.current.currentTime = newTime;
    setProgress(newTime);
  };

  if (!currentVideo) {
    return null; // Render nothing if currentVideo is not selected
  }

  return (
    <div>
      <h1>Video Player</h1>
      <video ref={videoRef} autoPlay src={currentVideo.sources[0]} />
      <button onClick={handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
      <input
        type="range"
        min="0"
        max={duration}
        value={progress}
        onChange={handleSeekChange}
      />
      <button onClick={handleSpeedChange}>{`Speed: ${speed}x`}</button>
      <input
        type="range"
        min="0.5"
        max="2"
        step="0.1"
        value={speed}
        onChange={handleSpeedChange}
      />
      <p>{`${Math.round(progress)} / ${Math.round(duration)}`}</p>
    </div>
  );
};

export default VideoPlayer;
