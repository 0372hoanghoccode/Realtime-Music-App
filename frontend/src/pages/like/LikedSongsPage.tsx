import { useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Topbar from "@/components/TopBar";
import { useLikeStore } from "@/stores/useLikeStore";
import SongRow from "./components/SongRow";

const LikedSongsPage = () => {
  const { likedSongs, fetchLikedSongs, isLoading } = useLikeStore();

  useEffect(() => {
    fetchLikedSongs();
  }, [fetchLikedSongs]);

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-purple-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end gap-6 mb-6">
            <div className="w-48 h-48 bg-gradient-to-br from-purple-600 to-purple-900 shadow-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-20 h-20 text-white opacity-60"
              >
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            </div>

            <div>
              <p className="text-sm font-semibold uppercase text-zinc-300">Playlist</p>
              <h1 className="text-4xl sm:text-6xl font-bold mt-1 mb-2">Liked Songs</h1>
              <p className="text-zinc-400">
                {likedSongs.length} {likedSongs.length === 1 ? "song" : "songs"}
              </p>
            </div>
          </div>

          {isLoading ? (
            <div className="mt-8">
              <p className="text-zinc-400">Loading your liked songs...</p>
            </div>
          ) : likedSongs.length === 0 ? (
            <div className="mt-8 text-center py-12 px-4">
              <h2 className="text-2xl font-bold mb-2">Songs you like will appear here</h2>
              <p className="text-zinc-400 mb-8">Save songs by tapping the heart icon</p>
            </div>
          ) : (
            <div className="mt-8">
              {likedSongs.map((song, index) => (
                <SongRow
                  key={song._id}
                  song={song}
                  index={index}
                  showLikeButton={true}
                />
              ))}
            </div>
          )}
        </div>
      </ScrollArea>
    </main>
  );
};

export default LikedSongsPage;
