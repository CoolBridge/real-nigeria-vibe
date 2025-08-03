import { useState, useRef, useEffect } from 'react';
import { Heart, MessageCircle, Share, Plus, Play, Pause, VolumeX, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface VideoPlayerProps {
  video: {
    id: string;
    title: string;
    video_url?: string;
    url?: string;
    thumbnail_url?: string;
    thumbnail?: string;
    user_id?: string;
    profiles?: {
      display_name?: string;
      avatar_url?: string;
    };
    user?: {
      username: string;
      avatar: string;
      isFollowing: boolean;
    };
    likes_count?: number;
    comments_count?: number;
    shares_count?: number;
    stats?: {
      likes: number;
      comments: number;
      shares: number;
    };
    isLiked?: boolean;
    isFollowing?: boolean;
  };
  isActive: boolean;
  onLike?: () => void;
  onFollow?: () => void;
}

export const VideoPlayer = ({ video, isActive, onLike, onFollow }: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Extract video data with fallbacks for both new and old format
  const videoUrl = video.video_url || video.url || '';
  const thumbnailUrl = video.thumbnail_url || video.thumbnail || '';
  const displayName = video.profiles?.display_name || video.user?.username || 'Unknown User';
  const avatarUrl = video.profiles?.avatar_url || video.user?.avatar || '';
  const likesCount = video.likes_count ?? video.stats?.likes ?? 0;
  const commentsCount = video.comments_count ?? video.stats?.comments ?? 0;
  const sharesCount = video.shares_count ?? video.stats?.shares ?? 0;
  const isLiked = video.isLiked ?? false;
  const isFollowing = video.isFollowing ?? video.user?.isFollowing ?? false;

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

  const handleLike = () => {
    onLike?.();
  };

  const handleFollow = () => {
    onFollow?.();
  };

  return (
    <div className="relative w-full h-screen bg-card overflow-hidden">
      {/* Video */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        poster={thumbnailUrl}
        muted={isMuted}
        loop
        playsInline
        onClick={togglePlay}
      >
        <source src={videoUrl} type="video/mp4" />
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
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              <span className="font-semibold text-sm">@{displayName}</span>
              {!isFollowing && (
                <Button
                  variant="outline"
                  size="sm"
                  className="h-6 px-3 text-xs bg-transparent border-foreground text-foreground hover:bg-primary hover:border-primary"
                  onClick={handleFollow}
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
                <AvatarImage src={avatarUrl} />
                <AvatarFallback>{displayName[0]?.toUpperCase()}</AvatarFallback>
              </Avatar>
              {!isFollowing && (
                <Button
                  variant="default"
                  size="icon"
                  className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-6 bg-primary hover:bg-primary/90"
                  onClick={handleFollow}
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
                onClick={handleLike}
              >
                <Heart 
                  className={`w-7 h-7 ${isLiked ? 'fill-accent text-accent' : 'text-foreground'}`} 
                />
              </Button>
              <span className="text-xs text-foreground/80">{likesCount}</span>
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
              <span className="text-xs text-foreground/80">{commentsCount}</span>
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
              <span className="text-xs text-foreground/80">{sharesCount}</span>
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