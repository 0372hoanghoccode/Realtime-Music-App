import { ScrollArea } from "@/components/ui/scroll-area"
import { useMusicStore } from "@/stores/useMusicStore"
import { usePlayerStore } from "@/stores/usePlayerStore"
import { useAuth } from "@clerk/clerk-react"
import { Music2 } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { AddSongsPanel } from "./components/AddSongsPanel"
import { EmptyState } from "./components/EmptyState"
import { LoadingState } from "./components/LoadingState"
import { PlaylistActions } from "./components/PlaylistActions"
import { PlaylistHeader } from "./components/PlaylistHeader"
import { SongsList } from "./components/SongsList"

const PlaylistPage = () => {
  const { playlistId } = useParams()
  const { userId } = useAuth()
  const {
    fetchPlaylistById,
    fetchSongs,
    currentPlaylist,
    songs,
    isLoading,
    addSongToPlaylist,
    removeSongFromPlaylist,
    deletePlaylist,
  } = useMusicStore()
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore()

  const [showAddSong, setShowAddSong] = useState(false)

  useEffect(() => {
    if (playlistId) fetchPlaylistById(playlistId)
    fetchSongs()
  }, [fetchPlaylistById, fetchSongs, playlistId])

  if (isLoading) return <LoadingState />

  if (!currentPlaylist)
    return (
      <div className="h-full flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center max-w-md">
          <Music2 className="h-16 w-16 text-zinc-500" />
          <h2 className="text-2xl font-bold">Playlist not found</h2>
          <p className="text-zinc-400">
            The playlist you're looking for doesn't exist or you don't have permission to view it.
          </p>
        </div>
      </div>
    )
  const canEdit = currentPlaylist.userId === userId
  const isCurrentPlaylist = currentPlaylist?.songs?.some((song) => song._id === currentSong?._id) || false
  const handlePlayPlaylist = () => {
    if (!currentPlaylist?.songs?.length) return
    if (isCurrentPlaylist) togglePlay()
    else {
      playAlbum(currentPlaylist.songs, 0)
    }
  }
  const handlePlaySong = (index: number) => {
    if (!currentPlaylist?.songs?.length) return
    playAlbum(currentPlaylist.songs, index)
  }

  const handleRemoveSong = (songId: string) => {
    if (playlistId) removeSongFromPlaylist(playlistId, songId)
  }

  const handleDeletePlaylist = () => {
    if (playlistId) deletePlaylist(playlistId)
  }

  const handleAddSong = (songId: string) => {
    if (playlistId) addSongToPlaylist(playlistId, songId)
  }

  return (
    <div className="h-full">
      <ScrollArea className="h-full rounded-md">
        <div className="relative min-h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#5038a0]/90 via-zinc-900/95 to-zinc-900 pointer-events-none"
            aria-hidden="true"
          />

          <div className="relative z-10">
            <PlaylistHeader
              playlist={currentPlaylist}
              isPlaying={isPlaying}
              isCurrentPlaylist={isCurrentPlaylist}
              onPlay={handlePlayPlaylist}
            />

            <PlaylistActions
              isPlaying={isPlaying}
              isCurrentPlaylist={isCurrentPlaylist}
              canEdit={canEdit}
              onPlay={handlePlayPlaylist}
              onAddSongs={() => setShowAddSong(!showAddSong)}
              onDelete={handleDeletePlaylist}
            />            {canEdit && showAddSong && (
              <AddSongsPanel
                songs={songs}
                playlistSongs={currentPlaylist?.songs || []}
                onAddSong={handleAddSong}
              />
            )}            {(currentPlaylist?.songs?.length || 0) === 0 ? (
              <EmptyState canEdit={canEdit} />
            ) : (
              <SongsList
                songs={currentPlaylist?.songs || []}
                currentSong={currentSong}
                isPlaying={isPlaying}
                canEdit={canEdit}
                onPlaySong={handlePlaySong}
                onRemoveSong={handleRemoveSong}
              />
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}

export default PlaylistPage

