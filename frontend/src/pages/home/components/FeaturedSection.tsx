import { useMusicStore } from "@/stores/useMusicStore";
import FeaturedGridSkeleton from "@/components/skeletons/FeaturedGridSkeleton";
import PlayButton from "./PlayButton";
import LikeButton from "@/layout/components/LikeButton";

const FeaturedSection = () => {
  const { isLoading, featuredSongs, error } = useMusicStore();

  console.log("Rendering FeaturedSection, songs:", featuredSongs);

  if (isLoading) return <FeaturedGridSkeleton />;

  if (error && featuredSongs.length === 0) {
    return <p className="text-red-500 mb-4 text-lg">{error}</p>;
  }

  if (featuredSongs.length === 0) {
    return <p className="text-zinc-400 mb-4 text-lg">No featured songs available.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
      {featuredSongs.map((song) => (
        <div
          key={song._id}
          className="flex items-center bg-zinc-800/50 rounded-md overflow-hidden
          hover:bg-zinc-700/50 transition-colors group cursor-pointer relative"
        >
          <img
            src={song.imageUrl}
            alt={song.title}
            className="w-16 sm:w-20 h-16 sm:h-20 object-cover flex-shrink-0"
          />
          <div className="flex-1 p-4">
            <p className="font-medium truncate">{song.title}</p>
            <p className="text-sm text-zinc-400 truncate">{song.artist}</p>
          </div>
          <div className="flex items-center mr-4 space-x-2">
            <LikeButton song={song} size="sm" />
            <div className="w-8 h-8 flex items-center justify-center">
              <PlayButton
                song={song}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FeaturedSection;
