import { Button } from "@/components/ui/button"
import { Play, Trash2 } from "lucide-react"
import { formatDuration } from "@/lib/format"

interface SongsListProps {
  songs: any[]
  currentSong: any
  isPlaying: boolean
  canEdit: boolean
  onPlaySong: (index: number) => void
  onRemoveSong: (songId: string) => void
}

export function SongsList({ songs, currentSong, isPlaying, canEdit, onPlaySong, onRemoveSong }: SongsListProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-t-xl mx-4 mb-4 border-t border-x border-zinc-800/50">
      <div className="px-2">
        <div className="space-y-1 py-2">
          {songs.map((song, index) => {
            const isCurrentSong = currentSong?._id === song._id
            return (
              <div
                key={song._id}
                className={`grid grid-cols-[16px_4fr_2fr_1fr_50px] gap-4 px-4 py-2 text-sm hover:bg-white/10 rounded-md group cursor-pointer transition-colors ${isCurrentSong ? "bg-white/5" : ""}`}
              >
                <div className="flex items-center justify-center">
                  {isCurrentSong && isPlaying ? (
                    <div className="size-4 text-green-500 animate-pulse">♫</div>
                  ) : (
                    <span onClick={() => onPlaySong(index)} className="group-hover:hidden text-zinc-400">
                      {index + 1}
                    </span>
                  )}
                  {!isCurrentSong && (
                    <Play className="h-4 w-4 hidden group-hover:block text-white" onClick={() => onPlaySong(index)} />
                  )}
                </div>
                <div className="flex items-center gap-3" onClick={() => onPlaySong(index)}>
                  <img
                    src={song.imageUrl || "/placeholder.svg"}
                    alt={song.title}
                    className="size-10 rounded shadow-md"
                  />
                  <div>
                    <div className={`font-medium ${isCurrentSong ? "text-green-400" : "text-white"}`}>{song.title}</div>
                    <div className="text-zinc-400 text-xs">{song.artist}</div>
                  </div>
                </div>
                <div className="flex items-center text-zinc-400">{song.artist}</div>
                <div className="flex items-center justify-center text-zinc-500">{formatDuration(song.duration)}</div>
                <div className="flex items-center justify-center">
                  {canEdit && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        onRemoveSong(song._id)
                      }}
                      className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
