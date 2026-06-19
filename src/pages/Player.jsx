import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockGames } from '../data/mockGames';
import { Play, Pause, Volume2, VolumeX, X, Heart, Maximize } from 'lucide-react';
import Hls from 'hls.js';

export default function Player() {
  const { id } = useParams();
  const navigate = useNavigate();
  const game = mockGames.find(g => g.id === id);
  
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    // Show wishlist button after 3 seconds of playing
    if (currentTime > 3 && currentTime < 10) {
      setShowWishlist(true);
    } else {
      setShowWishlist(false);
    }
  }, [currentTime]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !game?.video) return;

    let hls;
    if (game.video.includes('.m3u8')) {
      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(game.video);
        hls.attachMedia(video);
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = game.video;
      }
    } else {
      video.src = game.video;
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [game]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const current = videoRef.current.currentTime;
      const total = videoRef.current.duration;
      setProgress((current / total) * 100);
      setCurrentTime(current);
    }
  };

  const handleProgressClick = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      videoRef.current.currentTime = pos * videoRef.current.duration;
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!game) return null;

  return (
    <div className="fixed inset-0 z-50 bg-void flex flex-col font-mono text-terminal-white">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 border-b border-terminal-white/20 bg-void/90 relative z-20">
        <div className="flex items-center space-x-4">
          <div className="text-core-orange font-bold tracking-widest text-lg">
            BROADCAST_NODE
          </div>
          <div className="text-xs text-terminal-white/50 border-l border-terminal-white/30 pl-4 hidden sm:block">
            FILE: {game.title} // RES: {game.resolution.split(',')[0]}
          </div>
        </div>
        <button 
          onClick={() => navigate(-1)}
          className="p-2 border border-terminal-white/30 hover:border-core-orange hover:text-core-orange transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Video Container */}
      <div className="flex-grow relative flex items-center justify-center bg-black overflow-hidden group">
        <div className="scanlines pointer-events-none z-10 opacity-30"></div>
        
        <video
          ref={videoRef}
          className="w-full h-full object-contain cyber-image"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setIsPlaying(false)}
          onClick={togglePlay}
          poster={game.thumbnail}
        />

        {/* Interactive Wishlist Button Overlay */}
        {showWishlist && (
          <div className="absolute top-1/4 right-1/4 z-30 animate-pulse-glow">
            <button 
              onClick={() => setWishlisted(!wishlisted)}
              className={`flex items-center space-x-2 px-6 py-3 border-2 transition-all ${
                wishlisted 
                  ? 'border-core-orange bg-core-orange text-void shadow-glow-strong' 
                  : 'border-terminal-white bg-void/80 text-terminal-white hover:border-core-orange hover:text-core-orange hover:shadow-glow'
              }`}
            >
              <Heart size={20} className={wishlisted ? 'fill-void' : ''} />
              <span className="font-bold tracking-widest">
                {wishlisted ? 'WISHLIST_CONFIRMED' : 'ADD_TO_WISHLIST'}
              </span>
            </button>
          </div>
        )}

        {/* Controls Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-void to-transparent z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          
          {/* Progress Bar */}
          <div 
            className="w-full h-2 bg-terminal-white/20 mb-4 cursor-pointer relative"
            onClick={handleProgressClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-core-orange shadow-glow transition-all duration-100"
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-6">
              <button 
                onClick={togglePlay}
                className="text-terminal-white hover:text-core-orange transition-colors"
              >
                {isPlaying ? <Pause size={28} /> : <Play size={28} />}
              </button>
              
              <div className="flex items-center space-x-3 text-sm">
                <button 
                  onClick={toggleMute}
                  className="text-terminal-white hover:text-core-orange transition-colors"
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
                <span>
                  {videoRef.current ? formatTime(currentTime) : '0:00'} / {videoRef.current ? formatTime(videoRef.current.duration || 0) : '0:00'}
                </span>
              </div>
            </div>
            
            <button className="text-terminal-white hover:text-core-orange transition-colors">
              <Maximize size={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
