import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLikeStore } from "@/stores/useLikeStore";
import { useAuthStore } from "@/stores/useAuthStore"; 
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

  // login mới thấy like
  if (!isAuthenticated) {
    return null;
  }

  const checkFromStore = () => {
    return likedSongs.some((likedSong) => likedSong._id === song._id);
  };

  useEffect(() => {
    const likedInStore = checkFromStore();
    setIsLiked(likedInStore);

    // check like chưa
    if (!likedInStore) {
      const checkLikeStatus = async () => {
        const liked = await checkIfSongLiked(song._id);
        setIsLiked(liked);
      };
      checkLikeStatus();
    }
  }, [song._id, likedSongs]);

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isLoading) return;

    setIsLoading(true);
    try {
      if (isLiked) {
        await unlikeSong(song._id);
      } else {
        await likeSong(song._id);
      }
      setIsLiked(!isLiked);
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
