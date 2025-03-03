import { useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useHistoryStore } from '@/stores/useHistoryStore';
import { usePlayerStore } from '@/stores/usePlayerStore';
import { formatDistanceToNow } from 'date-fns';
import { Clock, Trash2 } from 'lucide-react';
import { Song } from '@/types';

const HistoryPage = () => {
  const { history, isLoading, fetchHistory, clearHistory } = useHistoryStore();
  const { currentSong, isPlaying } = usePlayerStore();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const playSong = (song: Song) => {
    usePlayerStore.setState({
      currentSong: song,
      isPlaying: true
    });
  };

  const handleClearHistory = () => {
    if (window.confirm('Are you sure you want to clear your listening history?')) {
      clearHistory();
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-zinc-800 to-zinc-900 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Listening History</h1>
          <Button
            variant="destructive"
            onClick={handleClearHistory}
            disabled={isLoading || history.length === 0}
            className="flex items-center gap-2 bg-red-700 hover:bg-red-800"
          >
            <Trash2 className="size-4" />
            <span className="hidden sm:inline">Clear History</span>
          </Button>
        </div>
        <p className="text-zinc-400 mb-6">
          Your recently played tracks
        </p>
      </div>

      {/* Main content */}
      <ScrollArea className="h-[calc(100vh-220px)]">
        {isLoading ? (
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
        ) : history.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-zinc-500">Your listening history will appear here</p>
          </div>
        ) : (
          <div className="px-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="text-zinc-400 text-sm border-b border-zinc-800">
                  <th className="font-normal text-left pb-2 w-8">#</th>
                  <th className="font-normal text-left pb-2">Title</th>
                  <th className="font-normal text-left pb-2 hidden md:table-cell">Artist</th>
                  <th className="font-normal text-right pb-2 hidden lg:table-cell">
                    <Clock className="size-4 inline" />
                  </th>
                  <th className="font-normal text-right pb-2">Played</th>
                  <th className="font-normal text-center pb-2 w-10"></th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, index) => {
                  const song = entry.songId;
                  const isActive = currentSong?._id === song._id;

                  return (
                    <tr
                      key={`${entry._id}-${index}`}
                      className="group hover:bg-zinc-800/50 rounded-md cursor-pointer"
                      onClick={() => playSong(song)}
                    >
                      <td className="py-3 w-8">
                        {isActive && isPlaying ? (
                          <div className="w-4 h-4 relative flex items-center justify-center">
                            <div className="w-1 h-4 bg-green-500 mx-px animate-music-pulse-1"></div>
                            <div className="w-1 h-3 bg-green-500 mx-px animate-music-pulse-2"></div>
                            <div className="w-1 h-4 bg-green-500 mx-px animate-music-pulse-3"></div>
                          </div>
                        ) : (
                          <span className={`text-sm ${isActive ? 'text-green-500' : 'text-zinc-400'}`}>
                            {index + 1}
                          </span>
                        )}
                      </td>
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={song.imageUrl}
                            alt={song.title}
                            className="size-10 object-cover rounded"
                          />
                          <span className={isActive ? 'text-green-500' : ''}>
                            {song.title}
                          </span>
                        </div>
                      </td>
                      <td className="py-3 text-zinc-400 hidden md:table-cell">
                        {song.artist}
                      </td>
                      <td className="py-3 text-zinc-400 text-right hidden lg:table-cell">
                        {song.duration}
                      </td>
                      <td className="py-3 text-zinc-400 text-right">
                        <div className="text-xs">
                          <div>
                            {formatDistanceToNow(new Date(entry.lastPlayed))} ago
                          </div>
                          <div>
                            {entry.playCount > 1 ? `${entry.playCount} plays` : '1 play'}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default HistoryPage;
