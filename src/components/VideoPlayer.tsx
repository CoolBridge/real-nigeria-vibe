import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share, Plus, Play, Pause, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface VideoPlayerProps {
  video: {
    id: string;
    url: string;
    thumbnail: string;
    title: string;
    user: {
      username: string;
      avatar: string;
      isFollowing: boolean;
    };
    stats: {
      likes: number;
      comments: number;
      shares: number;
    };
    isLiked: boolean;
  };
  isActive: boolean;
}

export const VideoPlayer = ({ video, isActive }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isLiked, setIsLiked] = useState(video.isLiked);
  const [isFollowing, setIsFollowing] = useState(video.user.isFollowing);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPlaying]);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
  };

  const toggleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="relative w-full h-screen bg-card overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={video.thumbnail}
        muted={isMuted}
        loop
        playsInline
        onClick={togglePlay}
      >
        <source src={video.url} type="video/mp4" />
      </video>

      {/* Play/Pause Overlay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-video-overlay/20">
          <Button
            variant="ghost"
            size="icon"
            className="w-20 h-20 rounded-full bg-background/20 hover:bg-background/30"
            onClick={togglePlay}
          >
            <Play className="w-8 h-8 text-foreground" />
          </Button>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-video-overlay/80 via-transparent to-transparent pointer-events-none" />

      {/* Bottom Content */}
      <div className="absolute bottom-0 left-0 right-0 p-4 text-foreground">
        <div className="flex items-end justify-between">
          {/* User Info & Caption */}
          <div className="flex-1 mr-4">
            <div className="flex items-center gap-2 mb-2">
              <Avatar className="w-8 h-8 border-2 border-foreground">
                <AvatarImage src={video.user.avatar} />
                <AvatarFallback>{video.user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">@{video.user.username}</span>
              {!isFollowing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-3 text-xs bg-transparent border-foreground text-foreground hover:bg-primary hover:border-primary"
                  onClick={toggleFollow}
                >
                  Follow
                </Button>
              )}
            </div>
            <p className="text-sm leading-5 mb-2">{video.title}</p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col items-center gap-4">
            {/* Follow Button */}
            <div className="relative">
              <Avatar className="w-12 h-12 border-2 border-foreground">
                <AvatarImage src={video.user.avatar} />
                <AvatarFallback>{video.user.username[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              {!isFollowing && (
                <Button
                  variant="default"
                  size="icon"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary hover:bg-primary/90"
                  onClick={toggleFollow}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              )}
            </div>

            {/* Like Button */}
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 hover:bg-background/20"
                onClick={toggleLike}
              >
                <Heart 
                  className={`w-7 h-7 ${isLiked ? 'fill-accent text-accent' : 'text-foreground'}`} 
                />
              </Button>
              <span className="text-xs text-foreground/80">{video.stats.likes}</span>
            </div>

            {/* Comment Button */}
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 hover:bg-background/20"
              >
                <MessageCircle className="w-7 h-7 text-foreground" />
              </Button>
              <span className="text-xs text-foreground/80">{video.stats.comments}</span>
            </div>

            {/* Share Button */}
            <div className="flex flex-col items-center">
              <Button
                variant="ghost"
                size="icon"
                className="w-12 h-12 hover:bg-background/20"
              >
                <Share className="w-7 h-7 text-foreground" />
              </Button>
              <span className="text-xs text-foreground/80">{video.stats.shares}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="w-8 h-8 bg-background/20 hover:bg-background/30"
          onClick={toggleMute}
        >
          {isMuted ? (
            <VolumeX className="w-4 h-4 text-foreground" />
          ) : (
            <Volume2 className="w-4 h-4 text-foreground" />
          )}
        </Button>
      </div>
    </div>
  );
};