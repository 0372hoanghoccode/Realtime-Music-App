import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLikeStore } from "@/stores/useLikeStore";
import { useAuthStore } from "@/stores/useAuthStore";
import { toast } from "sonner";

import { Song } from "@/types";

interface LikeButtonProps {
  song: Song;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const LikeButton = ({ song, size = "md", className = "" }: LikeButtonProps) => {
  const { likeSong, unlikeSong, checkIfSongLiked, likedSongs } = useLikeStore();
  const { isAuthenticated } = useAuthStore();
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("LikeButton - isAuthenticated:", isAuthenticated);
    console.log("LikeButton - song:", song);
  }, [isAuthenticated, song]);

  if (!isAuthenticated) {
    console.log("Not authenticated, hiding like button");
    return null;
  }

  const checkFromStore = () => {
    return likedSongs.some((likedSong) => likedSong._id === song._id);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    console.log("Checking like status for song:", song._id);

    const likedInStore = checkFromStore();
    console.log("Liked in store:", likedInStore);
    setIsLiked(likedInStore);

    if (!likedInStore) {
      const checkLikeStatus = async () => {
        try {
          const liked = await checkIfSongLiked(song._id);
          console.log("API like status:", liked);
          setIsLiked(liked);
        } catch (error) {
          console.error("Error checking like status:", error);
        }
      };
      checkLikeStatus();
    }
  }, [song._id, likedSongs, isAuthenticated]);

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Toggle like clicked");

    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isLiked) {
        console.log("Unliking song:", song._id);
        await unlikeSong(song._id);
        toast.success("unliked Song");
      } else {
        console.log("Liking song:", song._id);
        await likeSong(song._id);
        toast.success("Liked Song");
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      toast.error("error toggling like");
    } finally {
      setIsLoading(false);
    }
  };

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };

  const buttonSizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };

  console.log("Rendering like button, isLiked:", isLiked);

  return (
    <Button
      onClick={handleToggleLike}
      variant="ghost"
      size="icon"
      className={`rounded-full ${buttonSizeClasses[size]} ${className} hover:bg-zinc-800/50 ${isLiked ? 'text-red-500' : 'text-zinc-400 hover:text-white'} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Heart className={`${sizeClasses[size]} ${isLiked ? 'fill-current' : ''}`} />
    </Button>
  );
};

export default LikeButton;
