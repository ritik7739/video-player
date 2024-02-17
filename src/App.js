// App.js
import React from 'react';
import { VideoProvider } from './VideoContext';
import VideoPlayer from './components/VideoPlayer';
import Playlist from './components/Playlist';
import './App.css';

function App() {
  return (
    <VideoProvider>
      <div className="app">
        <div className="playlist-section">
          <Playlist />
        </div>
        <div className="video-section">
          <VideoPlayer />
        </div>
      </div>
    </VideoProvider>
  );
}

export default App;
