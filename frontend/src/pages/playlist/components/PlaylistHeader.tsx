import { Button } from "@/components/ui/button"
import { Play, Pause } from "lucide-react"

interface PlaylistHeaderProps {
  playlist: {
    imageUrl: string
    name: string
    description: string
    songs: any[]
    isPublic: boolean
  }
  isPlaying: boolean
  isCurrentPlaylist: boolean
  onPlay: () => void
}

export function PlaylistHeader({ playlist, isPlaying, isCurrentPlaylist, onPlay }: PlaylistHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row p-8 gap-8 pb-10">
      <div className="relative group">
        <img
          src={playlist.imageUrl || "/placeholder.svg"}
          alt={playlist.name}
          className="w-[220px] h-[220px] md:w-[240px] md:h-[240px] shadow-2xl rounded-lg object-cover transition-transform duration-300 group-hover:brightness-90"
        />
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg cursor-pointer"
          onClick={onPlay}
        >
          <Button
            size="icon"
            className="w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all"
          >
            {isPlaying && isCurrentPlaylist ? (
              <Pause className="h-8 w-8 text-black" />
            ) : (
              <Play className="h-8 w-8 text-black ml-1" />
            )}
          </Button>
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <p className="text-sm font-medium text-zinc-300 uppercase tracking-wider">Playlist</p>
        <h1 className="text-4xl md:text-6xl font-bold my-4 line-clamp-2">{playlist.name}</h1>
        <div className="flex flex-col gap-2">
          <p className="text-zinc-300 text-sm line-clamp-2">{playlist.description || "No description"}</p>
          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <span className="font-medium">{playlist.songs.length} songs</span>
            <span>•</span>
            <span className="px-2 py-1 rounded-full bg-zinc-800 text-xs">
              {playlist.isPublic ? "Public" : "Private"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

