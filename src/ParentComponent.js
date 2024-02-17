import React, { useState } from 'react';
import VideoPlayer from './VideoPlayer';
import Playlist from './Playlist'; // Assuming you have exported Playlist correctly

const ParentComponent = () => {
  const [currentVideo, setCurrentVideo] = useState(null);

  const handleVideoChange = (video) => {
    setCurrentVideo(video);
  };

  return (
    <div>
      {/* Only render VideoPlayer if currentVideo is not null */}
      {currentVideo && <VideoPlayer currentVideo={currentVideo} />}
      <Playlist setCurrentVideo={handleVideoChange} />
    </div>
  );
};

export default ParentComponent;