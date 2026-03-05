'use client';
import React, { useEffect, useState, useRef } from 'react';

const VideoPlayer = ({ url, isMuted }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    setHasMounted(true);
    console.log('Video URL:', url); // DEBUG: Verify data is arriving
  }, [url]);

  // Extract YouTube video ID from URL
  const getYouTubeID = (url) => {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = getYouTubeID(url);

  useEffect(() => {
    if (hasMounted && videoId) {
      // YouTube iframe loads asynchronously
      const timer = setTimeout(() => {
        setIsReady(true);
        console.log('Player ready!', url);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasMounted, videoId, url]);

  // Server-side fallback
  if (!hasMounted) {
    return (
      <div className="relative w-full h-0 pt-[56.25%] bg-black">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-white text-sm font-mono">Initializing...</div>
        </div>
      </div>
    );
  }

  if (!videoId) {
    console.error('Invalid YouTube URL:', url);
    return (
      <div className="relative w-full h-0 pt-[56.25%] bg-black">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-red-500 text-sm font-mono">Invalid Video URL</div>
        </div>
      </div>
    );
  }

  // Build YouTube embed URL with autoplay paramseters
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`;

  return (
    // BULLETPROOF: Padding Hack for 16:9 Aspect Ratio
    <div className="relative w-full h-0 pt-[56.25%] bg-black">
      <iframe
        ref={iframeRef}
        src={embedUrl}
        className="absolute top-0 left-0 w-full h-full"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube video player"
      />
      {!isReady && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 pointer-events-none">
          <div className="text-white text-xs font-mono animate-pulse">Loading video...</div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;