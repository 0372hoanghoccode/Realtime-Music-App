import { Button } from "@/components/ui/button"
import { Play, Pause, Plus, Trash2 } from "lucide-react"

interface PlaylistActionsProps {
  isPlaying: boolean
  isCurrentPlaylist: boolean
  canEdit: boolean
  onPlay: () => void
  onAddSongs: () => void
  onDelete: () => void
}

export function PlaylistActions({
  isPlaying,
  isCurrentPlaylist,
  canEdit,
  onPlay,
  onAddSongs,
  onDelete,
}: PlaylistActionsProps) {
  return (
    <div className="px-8 pb-6 flex items-center gap-4 flex-wrap">
      <Button
        onClick={onPlay}
        className="rounded-full bg-green-500 hover:bg-green-400 hover:scale-105 transition-all px-8 py-6 text-black font-medium"
      >
        {isPlaying && isCurrentPlaylist ? (
          <div className="flex items-center gap-2">
            <Pause className="h-5 w-5" />
            Pause
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Play className="h-5 w-5 ml-1" />
            Play
          </div>
        )}
      </Button>

      {canEdit && (
        <>
          <Button
            onClick={onAddSongs}
            variant="outline"
            className="rounded-full hover:scale-105 transition-all border-zinc-700 hover:border-zinc-500 bg-zinc-800/50"
          >
            <div className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add Songs
            </div>
          </Button>

          <Button
            onClick={onDelete}
            variant="outline"
            className="rounded-full hover:scale-105 transition-all border-zinc-700 hover:border-red-500 bg-zinc-800/50 hover:text-red-500"
          >
            <div className="flex items-center gap-2">
              <Trash2 className="h-4 w-4" />
              Delete Playlist
            </div>
          </Button>
        </>
      )}
    </div>
  )
}

