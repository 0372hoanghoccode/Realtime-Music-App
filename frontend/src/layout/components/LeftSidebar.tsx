import PlaylistSkeleton from "@/components/skeletons/PlaylistSkeleton";
import { buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useMusicStore } from "@/stores/useMusicStore";
import { SignedIn } from "@clerk/clerk-react";
import { HomeIcon, Library, Heart, History, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LeftSidebar = () => {
  const { albums, fetchAlbums, isLoading } = useMusicStore();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  // Filter albums based on search term
  const filteredAlbums = albums.filter((album) =>
    album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.artist.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col gap-4">
      {/* Navigation menu */}
      <div className="rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.05] p-3 shadow-lg">
        <div className="space-y-1">
          <Link
            to={"/"}
            className={cn(
              buttonVariants({
                variant: "ghost",
                className:
                  "w-full justify-start text-white hover:bg-white/[0.05] transition-all duration-300 rounded-xl",
              }),
            )}
          >
            <div className="mr-2 size-8 rounded-xl bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
              <HomeIcon className="size-4 text-white" />
            </div>
            <span className="hidden md:inline">Home</span>
          </Link>

          <SignedIn>
            {/* Liked Songs Link */}
            <Link
              to={"/likes"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-white/[0.05] transition-all duration-300 rounded-xl",
                }),
              )}
            >
              <div className="mr-2 size-8 rounded-xl bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                <Heart className="size-4 text-white" />
              </div>
              <span className="hidden md:inline">Liked Songs</span>
            </Link>

            {/* History Link */}
            <Link
              to={"/history"}
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className:
                    "w-full justify-start text-white hover:bg-white/[0.05] transition-all duration-300 rounded-xl",
                }),
              )}
            >
              <div className="mr-2 size-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                <History className="size-4 text-white" />
              </div>
              <span className="hidden md:inline">History</span>
            </Link>
          </SignedIn>
        </div>
      </div>

      {/* Library section */}
      <div className="flex-1 rounded-2xl bg-white/[0.03] backdrop-blur-md border border-white/[0.05] p-3 shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-white px-2">
            <div className="size-8 rounded-xl bg-white/[0.05] flex items-center justify-center mr-2">
              <Library className="size-4 text-zinc-400" />
            </div>
            <span className="hidden md:inline font-medium">Your Library</span>
          </div>
        </div>

        {/* Search bar */}
        <div className="px-2 pb-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 size-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search library"
              className="w-full bg-white/5 border border-transparent focus:border-white/20 rounded-lg py-2 pl-10 pr-4 text-sm text-white placeholder:text-zinc-500 outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-370px)]">
          <div className="space-y-3 pr-2">
            {isLoading ? (
              <PlaylistSkeleton />
            ) : filteredAlbums.length > 0 ? (
              filteredAlbums.map((album) => (
                <Link
                  to={`/albums/${album._id}`}
                  key={album._id}
                  className="relative p-2 hover:bg-white/[0.05] rounded-xl flex items-center gap-3 group cursor-pointer transition-all duration-300"
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-0.5"
                        >
                          <path
                            d="M5 4.99c0-1.105.893-1.99 1.995-1.99a2 2 0 0 1 .995.265l12.038 6.01c.99.477.99 1.976 0 2.453L7.99 17.735a1.997 1.997 0 0 1-2.985-1.743L5 15.99V4.99z"
                            fill="white"
                          />
                        </svg>
                      </div>
                    </div>
                    <img
                      src={album.imageUrl || "/placeholder.svg"}
                      alt={album.title}
                      className="size-14 rounded-xl flex-shrink-0 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>

                  <div className="flex-1 min-w-0 hidden md:block">
                    <p className="font-medium truncate">{album.title}</p>
                    <p className="text-sm text-zinc-400 truncate">Album • {album.artist}</p>
                  </div>

                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl border-2 border-emerald-500/0 group-hover:border-emerald-500/50 transition-all duration-300 pointer-events-none"></div>
                </Link>
              ))
            ) : (
              <div className="text-center py-4 text-zinc-400">No albums found</div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default LeftSidebar;
