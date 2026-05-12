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

  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Initial check
    setIsOffline(!navigator.onLine);
    
    // Listeners for network status changes
    const handleOnline = () => setIsOffline(false);
    const handleOffline = () => setIsOffline(true);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Server-side fallback
  if (!hasMounted) {
    return (
      <div className="relative w-full h-0 pt-[56.25%] bg-black">
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="text-white text-sm font-mono animate-pulse">Initializing...</div>
        </div>
      </div>
    );
  }

  // Offline fallback
  if (isOffline) {
    return (
      <div className="relative w-full h-0 pt-[56.25%] bg-[#121212]">
        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-4 text-center border border-white/5 rounded">
          <svg className="w-10 h-10 text-neutral-600 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 010 12.728m0 0l-2.829-2.829m2.829 2.829L21 21M15.536 8.464a5 5 0 010 7.072m0 0l-2.829-2.829m-4.243 2.829a4.978 4.978 0 01-1.414-2.83m-1.414 5.658a9 9 0 01-2.167-9.238m7.824 2.167a1 1 0 111.414 1.414m-1.414-1.414L3 3"></path>
          </svg>
          <div className="text-neutral-400 text-sm font-bold font-mono tracking-wide">OFFLINE MODE</div>
          <div className="text-neutral-500 text-xs font-mono mt-1">Video playback requires an active internet connection.</div>
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