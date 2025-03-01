import Topbar from "@/components/TopBar";
import { useMusicStore } from "@/stores/useMusicStore";
import { useEffect, useState } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const HomePage = () => {
  const {
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    fetchUserPlaylists,
    fetchPublicPlaylists,
    createPlaylist,
    isLoading,
    madeForYouSongs,
    featuredSongs,
    trendingSongs,
    userPlaylists,
    publicPlaylists,
  } = useMusicStore();

  const { initializeQueue } = usePlayerStore();

  const [showForm, setShowForm] = useState(false);
  const [playlistName, setPlaylistName] = useState("");

  useEffect(() => {
    fetchFeaturedSongs();
    fetchMadeForYouSongs();
    fetchTrendingSongs();
    fetchUserPlaylists();
    fetchPublicPlaylists(); // Gọi API để lấy playlist công khai
  }, [
    fetchFeaturedSongs,
    fetchMadeForYouSongs,
    fetchTrendingSongs,
    fetchUserPlaylists,
    fetchPublicPlaylists,
  ]);

  useEffect(() => {
    if (madeForYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
      const allSongs = [...featuredSongs, ...madeForYouSongs, ...trendingSongs];
      initializeQueue(allSongs);
    }
  }, [initializeQueue, madeForYouSongs, trendingSongs, featuredSongs]);

  const handleCreatePlaylist = () => {
    if (playlistName.trim()) {
      createPlaylist(playlistName);
      setPlaylistName("");
      setShowForm(false);
    }
  };

  return (
    <main className="rounded-md overflow-hidden h-full bg-gradient-to-b from-zinc-800 to-zinc-900">
      <Topbar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good afternoon</h1>
          <FeaturedSection />

          <div className="space-y-8">
            {/* Section Your Playlists */}
            <section>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl sm:text-2xl font-semibold">Your Playlists</h2>
                <Button
                  onClick={() => setShowForm(!showForm)}
                  variant="outline"
                  className="text-white border-zinc-700 hover:bg-zinc-800"
                >
                  {showForm ? "Cancel" : "Create Playlist"}
                </Button>
              </div>

              {showForm && (
                <div className="mb-4 flex gap-2">
                  <Input
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    placeholder="Enter playlist name"
                    className="bg-zinc-800 text-white border-zinc-700"
                  />
                  <Button
                    onClick={handleCreatePlaylist}
                    disabled={!playlistName.trim() || isLoading}
                    className="bg-green-500 hover:bg-green-600 text-black"
                  >
                    Create
                  </Button>
                </div>
              )}

              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {userPlaylists.length > 0 ? (
                    userPlaylists.map((playlist) => (
                      <Link
                        key={playlist._id}
                        to={`/playlists/${playlist._id}`}
                        className="block p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
                      >
                        <img
                          src={playlist.imageUrl}
                          alt={playlist.name}
                          className="w-full h-40 object-cover rounded-md mb-2"
                        />
                        <h3 className="text-lg font-medium text-white">{playlist.name}</h3>
                        <p className="text-sm text-zinc-400">{playlist.songs.length} songs</p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-zinc-400">No playlists found. Create one!</p>
                  )}
                </div>
              )}
            </section>

            {/* Section Public Playlists */}
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">Public Playlists</h2>
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {publicPlaylists.length > 0 ? (
                    publicPlaylists.map((playlist) => (
                      <Link
                        key={playlist._id}
                        to={`/playlists/${playlist._id}`}
                        className="block p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition"
                      >
                        <img
                          src={playlist.imageUrl}
                          alt={playlist.name}
                          className="w-full h-40 object-cover rounded-md mb-2"
                        />
                        <h3 className="text-lg font-medium text-white">{playlist.name}</h3>
                        <p className="text-sm text-zinc-400">{playlist.songs.length} songs</p>
                      </Link>
                    ))
                  ) : (
                    <p className="text-zinc-400">No public playlists available.</p>
                  )}
                </div>
              )}
            </section>

            <SectionGrid title="Made For You" songs={madeForYouSongs} isLoading={isLoading} />
            <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />
          </div>
        </div>
      </ScrollArea>
    </main>
  );
};

export default HomePage;
