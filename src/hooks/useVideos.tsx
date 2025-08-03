import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface VideoData {
  id: string;
  title: string;
  description?: string;
  video_url: string;
  thumbnail_url?: string;
  hashtags?: string[];
  views_count: number;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  created_at: string;
  user_id: string;
  profiles?: {
    display_name?: string;
    avatar_url?: string;
  };
  isLiked?: boolean;
  isFollowing?: boolean;
}

export const useVideos = () => {
  const { user } = useAuth();
  const [videos, setVideos] = useState<VideoData[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const { data: videosData, error } = await supabase
        .from('videos')
        .select('*')
        .eq('is_public', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      // Get unique user IDs from videos
      const userIds = [...new Set(videosData?.map(v => v.user_id) || [])];
      
      // Fetch profiles for these users
      const { data: profilesData } = await supabase
        .from('profiles')
        .select('user_id, display_name, avatar_url')
        .in('user_id', userIds);

      // Create a map of user_id to profile data
      const profilesMap = new Map(
        profilesData?.map(p => [p.user_id, p]) || []
      );

      // Combine videos with profile data
      let videosWithLikes = (videosData || []).map(video => ({
        ...video,
        profiles: profilesMap.get(video.user_id) || null
      }));
      
      if (user) {
        const videoIds = videosWithLikes.map(v => v.id);
        const { data: likes } = await supabase
          .from('video_likes')
          .select('video_id')
          .eq('user_id', user.id)
          .in('video_id', videoIds);

        const likedVideoIds = new Set(likes?.map(l => l.video_id));

        // Check if current user follows each video creator
        const creatorIds = videosWithLikes.map(v => v.user_id);
        const { data: follows } = await supabase
          .from('follows')
          .select('following_id')
          .eq('follower_id', user.id)
          .in('following_id', creatorIds);

        const followedUserIds = new Set(follows?.map(f => f.following_id));

        videosWithLikes = videosWithLikes.map(video => ({
          ...video,
          isLiked: likedVideoIds.has(video.id),
          isFollowing: followedUserIds.has(video.user_id)
        }));
      }

      setVideos(videosWithLikes);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleLike = async (videoId: string) => {
    if (!user) return;

    const video = videos.find(v => v.id === videoId);
    if (!video) return;

    try {
      if (video.isLiked) {
        // Unlike
        await supabase
          .from('video_likes')
          .delete()
          .eq('user_id', user.id)
          .eq('video_id', videoId);

        // Update video likes count
        await supabase
          .from('videos')
          .update({ likes_count: Math.max(0, video.likes_count - 1) })
          .eq('id', videoId);
      } else {
        // Like
        await supabase
          .from('video_likes')
          .insert({ user_id: user.id, video_id: videoId });

        // Update video likes count
        await supabase
          .from('videos')
          .update({ likes_count: video.likes_count + 1 })
          .eq('id', videoId);
      }

      // Update local state
      setVideos(prev => prev.map(v => 
        v.id === videoId 
          ? { 
              ...v, 
              isLiked: !v.isLiked,
              likes_count: v.isLiked ? v.likes_count - 1 : v.likes_count + 1
            }
          : v
      ));
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const toggleFollow = async (userId: string) => {
    if (!user || userId === user.id) return;

    const video = videos.find(v => v.user_id === userId);
    if (!video) return;

    try {
      if (video.isFollowing) {
        // Unfollow
        await supabase
          .from('follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', userId);
      } else {
        // Follow
        await supabase
          .from('follows')
          .insert({ follower_id: user.id, following_id: userId });
      }

      // Update local state
      setVideos(prev => prev.map(v => 
        v.user_id === userId 
          ? { ...v, isFollowing: !v.isFollowing }
          : v
      ));
    } catch (error) {
      console.error('Error toggling follow:', error);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, [user]);

  return {
    videos,
    loading,
    fetchVideos,
    toggleLike,
    toggleFollow
  };
};