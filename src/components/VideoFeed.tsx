import { useState, useEffect } from 'react';
import { VideoPlayer } from './VideoPlayer';
import { useVideos } from '@/hooks/useVideos';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import nigerianCreator1 from '@/assets/nigerian-creator-1.jpg';
import nigerianCreator2 from '@/assets/nigerian-creator-2.jpg';
import nigerianCreator3 from '@/assets/nigerian-creator-3.jpg';

// Mock data for videos with Nigerian creators
const mockVideos = [
  {
    id: '1',
    url: '/placeholder-video.mp4',
    thumbnail: nigerianCreator1,
    title: 'Afrobeats dance challenge! 🇳🇬 Who can do it better? #AfrobeatsDance #NaijaVibes #UralChallenge',
    user: {
      username: 'kemi_moves',
      avatar: nigerianCreator1,
      isFollowing: false,
    },
    stats: {
      likes: 12400,
      comments: 389,
      shares: 156,
    },
    isLiked: false,
  },
  {
    id: '2',
    url: '/placeholder-video.mp4',
    thumbnail: nigerianCreator2,
    title: 'Traditional Nigerian Jollof Rice recipe! 🍚 Lagos style vs Abuja style 🔥 #JollofWars #NigerianFood',
    user: {
      username: 'chef_funmi',
      avatar: nigerianCreator2,
      isFollowing: true,
    },
    stats: {
      likes: 8750,
      comments: 267,
      shares: 89,
    },
    isLiked: true,
  },
  {
    id: '3',
    url: '/placeholder-video.mp4',
    thumbnail: nigerianCreator3,
    title: 'Lagos street style meets Ankara fashion 🔥 Nigerian drip is unmatched! #AnkaraFashion #LagosFashion #NaijaStyle',
    user: {
      username: 'eko_stylist',
      avatar: nigerianCreator3,
      isFollowing: false,
    },
    stats: {
      likes: 5690,
      comments: 178,
      shares: 45,
    },
    isLiked: false,
  },
];

export const VideoFeed = () => {
  const { user } = useAuth();
  const { videos, loading, toggleLike, toggleFollow } = useVideos();
  const navigate = useNavigate();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  
  // Use real videos if available, otherwise fallback to mock data
  const displayVideos = videos.length > 0 ? videos : mockVideos;

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

    if (isUpSwipe && currentVideoIndex < displayVideos.length - 1) {
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
      if (e.key === 'ArrowDown' && currentVideoIndex < displayVideos.length - 1) {
        setCurrentVideoIndex(currentVideoIndex + 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentVideoIndex]);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin w-8 h-8 border-2 border-nigerian-green border-t-transparent rounded-full mx-auto"></div>
          <p className="text-muted-foreground">Loading amazing Nigerian content...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-6 max-w-md">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-nigerian-green to-ureal-gold bg-clip-text text-transparent">
              Join the Ureal Community
            </h2>
            <p className="text-muted-foreground">
              Sign up to discover amazing Nigerian creators and share your own story
            </p>
          </div>
          <Button 
            onClick={() => navigate('/auth')}
            className="bg-gradient-to-r from-nigerian-green to-ureal-gold hover:from-nigerian-green/90 hover:to-ureal-gold/90 text-primary-foreground"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Get Started
          </Button>
        </div>
      </div>
    );
  }

  if (displayVideos.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h2 className="text-xl font-semibold">No videos yet</h2>
          <p className="text-muted-foreground">Be the first to share your Nigerian story!</p>
        </div>
      </div>
    );
  }

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
        {displayVideos.map((video, index) => (
          <div key={video.id} className="h-screen w-full">
            <VideoPlayer 
              video={video} 
              isActive={index === currentVideoIndex}
              onLike={() => toggleLike(video.id)}
              onFollow={() => toggleFollow(video.user_id)}
            />
          </div>
        ))}
      </div>

      {/* Video indicators */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
        {displayVideos.map((_, index) => (
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