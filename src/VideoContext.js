// VideoContext.js
import React, { createContext, useState } from 'react';
import videoData from './videodata'; // Importing shared video data
import { v4 as uuidv4 } from 'uuid';

export const VideoContext = createContext();

const enrichedVideoData = videoData.map(video => ({
  ...video,
  id: uuidv4(),
}));

export const VideoProvider = (props) => {
  const [videos, setVideos] = useState(enrichedVideoData);
  const [currentVideo, setCurrentVideo] = useState(enrichedVideoData[0]);

  // Define the reorderVideos function
  const reorderVideos = (startIndex, endIndex) => {
    const newVideos = Array.from(videos);
    const [removed] = newVideos.splice(startIndex, 1);
    newVideos.splice(endIndex, 0, removed);
    setVideos(newVideos);
  };

  return (
    <VideoContext.Provider value={{ videos, setVideos, currentVideo, setCurrentVideo, reorderVideos }}>
      {props.children}
    </VideoContext.Provider>
  );
};
