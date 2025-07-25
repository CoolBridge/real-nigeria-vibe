import { useState, useEffect } from 'react';
import { VideoPlayer } from './VideoPlayer';

// Mock data for videos
const mockVideos = [
  {
    id: '1',
    url: '/placeholder-video.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=600&fit=crop',
    title: 'Amazing Nigerian dance moves! 🇳🇬 #NigerianTikTok #Dance #Afrobeats',
    user: {
      username: 'naija_dancer',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b639?w=100&h=100&fit=crop&crop=face',
      isFollowing: false,
    },
    stats: {
      likes: 1240,
      comments: 89,
      shares: 23,
    },
    isLiked: false,
  },
  {
    id: '2',
    url: '/placeholder-video.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=600&fit=crop',
    title: 'Cooking traditional Nigerian jollof rice 🍚 Follow for more recipes!',
    user: {
      username: 'chef_amaka',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face',
      isFollowing: true,
    },
    stats: {
      likes: 2350,
      comments: 156,
      shares: 78,
    },
    isLiked: true,
  },
  {
    id: '3',
    url: '/placeholder-video.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1542359649-31e03cd4d909?w=400&h=600&fit=crop',
    title: 'Lagos street fashion is unmatched! 🔥 #LagosFashion #NigerianStyle',
    user: {
      username: 'lagos_fashionista',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
      isFollowing: false,
    },
    stats: {
      likes: 890,
      comments: 45,
      shares: 12,
    },
    isLiked: false,
  },
];

export const VideoFeed = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle swipe gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientY);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isUpSwipe = distance > 50;
    const isDownSwipe = distance < -50;

    if (isUpSwipe && currentVideoIndex < mockVideos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
    
    if (isDownSwipe && currentVideoIndex > 0) {
      setCurrentVideoIndex(currentVideoIndex - 1);
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && currentVideoIndex > 0) {
        setCurrentVideoIndex(currentVideoIndex - 1);
      }
      if (e.key === 'ArrowDown' && currentVideoIndex < mockVideos.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideoIndex]);

  return (
    <div 
      className="h-screen w-full overflow-hidden relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div 
        className="transition-transform duration-300 ease-out"
        style={{
          transform: `translateY(-${currentVideoIndex * 100}vh)`,
        }}
      >
        {mockVideos.map((video, index) => (
          <div key={video.id} className="h-screen w-full">
            <VideoPlayer 
              video={video} 
              isActive={index === currentVideoIndex}
            />
          </div>
        ))}
      </div>

      {/* Video indicators */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {mockVideos.map((_, index) => (
          <div
            key={index}
            className={`w-1 h-8 rounded-full transition-colors ${
              index === currentVideoIndex ? 'bg-foreground' : 'bg-foreground/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
};