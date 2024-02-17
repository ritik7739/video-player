// Playlist.js
import React, { useContext } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VideoContext } from '../VideoContext';

const Playlist = () => {
  const { videos, setCurrentVideo, reorderVideos } = useContext(VideoContext);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    reorderVideos(result.source.index, result.destination.index);
  };

  const handleClick = (video) => {
    setCurrentVideo(video);
  };

  return (
    <div>
      <h1>Playlist</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="playlist">
              {videos.map((video, index) => (
                <Draggable key={video.id} draggableId={video.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => handleClick(video)}
                      className="playlist-item draggable"
                    >
                      {video.title}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Playlist;
