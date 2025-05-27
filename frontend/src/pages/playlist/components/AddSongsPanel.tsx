import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Song } from "@/types"
import { Plus } from "lucide-react"

interface AddSongsPanelProps {
  songs: Song[] | null | undefined
  playlistSongs: Song[] | null | undefined
  onAddSong: (songId: string) => void
}

export function AddSongsPanel({ songs, playlistSongs, onAddSong }: AddSongsPanelProps) {
  // Kiểm tra an toàn để đảm bảo songs và playlistSongs là arrays
  const safeSongs = Array.isArray(songs) ? songs : []
  const safePlaylistSongs = Array.isArray(playlistSongs) ? playlistSongs : []
  
  const availableSongs = safeSongs.filter((song) => !safePlaylistSongs.some((s) => s._id === song._id))

  return (
    <div className="px-8 pb-6">
      <div className="bg-zinc-800/70 backdrop-blur-sm rounded-xl p-4 border border-zinc-700">
        <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
          <Plus className="h-4 w-4 text-green-400" />
          Add Songs to Playlist
        </h3>        <ScrollArea className="max-h-60 rounded-md">
          <div className="space-y-1 p-1">
            {!songs ? (
              <div className="py-8 text-center text-zinc-500">
                <p>Loading songs...</p>
              </div>
            ) : availableSongs.length > 0 ? (
              availableSongs.map((song) => (
                <div
                  key={song._id}
                  className="flex items-center justify-between p-2 hover:bg-zinc-700/70 rounded-md transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img src={song.imageUrl || "/placeholder.svg"} alt={song.title} className="size-10 rounded" />
                    <div>
                      <p className="text-white font-medium">{song.title}</p>
                      <p className="text-sm text-zinc-400">{song.artist}</p>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => onAddSong(song._id)}
                    className="bg-green-500/90 hover:bg-green-500 text-black rounded-full"
                  >
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              ))
            ) : (
              <div className="py-8 text-center text-zinc-500">
                <p>No songs available to add</p>
                <p className="text-sm mt-1">All songs are already in this playlist</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

