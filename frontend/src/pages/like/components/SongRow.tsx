import { formatDuration } from "@/lib/format";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Song } from "@/types";
import { Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import LikeButton from "@/layout/components/LikeButton";

interface SongRowProps {
  song: Song;
  index: number;
  showLikeButton?: boolean;
}

const SongRow = ({ song, index, showLikeButton = true }: SongRowProps) => {
  const { currentSong, isPlaying, setCurrentSong, togglePlay } = usePlayerStore();

  const isCurrentSong = currentSong?._id === song._id;

  const handlePlayPause = () => {
    if (isCurrentSong) {
      togglePlay();
    } else {
      setCurrentSong(song);
    }
  };

  return (
    <div
      className={`group flex items-center p-2 rounded-md hover:bg-white/10
        ${isCurrentSong ? 'bg-white/20' : ''}`}
    >
      <div className="w-8 text-center text-zinc-400 mr-4">
        <span className="group-hover:hidden block">{index + 1}</span>
        <Button
          onClick={handlePlayPause}
          variant="ghost"
          size="icon"
          className="hidden group-hover:flex h-6 w-6 text-white"
        >
          {isCurrentSong && isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </Button>
      </div>

      <div className="flex flex-1 items-center min-w-0">
        <img
          src={song.imageUrl}
          alt={song.title}
          className="h-10 w-10 object-cover rounded mr-4"
        />

        <div className="min-w-0 flex-1">
          <p className={`font-medium truncate ${isCurrentSong ? 'text-green-500' : 'text-white'}`}>
            {song.title}
          </p>
          <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
        </div>
      </div>

      {showLikeButton && (
        <div className="mr-4">
          <LikeButton song={song} size="sm" />
        </div>
      )}

      <div className="text-zinc-400 text-sm">
        {formatDuration(song.duration)}
      </div>
    </div>
  );
};

export default SongRow;
