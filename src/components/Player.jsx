import React, { useState, useRef } from 'react'

function Player() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef(null);

    const togglePlay = () => {
        if(isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleProgress = () => {
        const duration = videoRef.current.duration;
        const currentTime = videoRef.current.currentTime;
        const progress = (currentTime / duration) * 100;
        setProgress(progress);
    }

  return (
    <>
        <video 
        onTimeUpdate={handleProgress}
        ref={videoRef}
        width='100%' 
        height='100%' 
        controls>
            <source src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' type="video/mp4"></source>
        </video>
        <button onClick={togglePlay}>
            {isPlaying ? 'Pause' : 'Play'}
        </button>
        <progress value={progress} max='100' />
    </>
  )
}

export default Player