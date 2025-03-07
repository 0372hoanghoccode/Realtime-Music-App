import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { usePlayerStore } from "@/stores/usePlayerStore";
import { useHistoryStore } from "@/stores/useHistoryStore";
import { Laptop2, ListMusic, Mic2, Pause, Play, Repeat, Shuffle, SkipBack, SkipForward, Volume1 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import LikeButton from "./LikeButton";
import { formatDuration } from "@/lib/format";

export const PlaybackControls = () => {
  const { currentSong, isPlaying, togglePlay, playNext, playPrevious } = usePlayerStore();
  const { addToHistory } = useHistoryStore();

  const [volume, setVolume] = useState(75);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [songStarted, setSongStarted] = useState(false);

  useEffect(() => {
    audioRef.current = document.querySelector("audio");

    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    const handlePlaying = () => {
      if (currentSong && audio.currentTime > 5 && !songStarted) {
        setSongStarted(true);
        addToHistory(currentSong._id);
      }
    };

    audio.addEventListener("timeupdate", handlePlaying);

    const handleEnded = () => {
      usePlayerStore.setState({ isPlaying: false });
      setSongStarted(false); // Reset for next song
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", handlePlaying);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, addToHistory, songStarted]);

  useEffect(() => {
    setSongStarted(false);
  }, [currentSong]);

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = value[0];
    }
  };

  const progressPercent = duration ? (currentTime / duration) * 100 : 0

  return (
    <footer className="h-20 sm:h-24 bg-[#0A0A0C]/90 backdrop-blur-xl border-t border-white/[0.03] px-4 relative sticky bottom-0 z-40">
      {/* Progress visualization */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-violet-500 transition-all duration-100 ease-linear"
        style={{ width: `${progressPercent}%` }}
      ></div>

      <div className="flex justify-between items-center h-full max-w-[1800px] mx-auto">
        {/* Currently playing song */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%]">
          {currentSong && (
            <>
              <div className="relative group">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-violet-500 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
                <div className="relative bg-[#0A0A0C] p-0.5 rounded-lg overflow-hidden">
                  <img
                    src={currentSong.imageUrl || "/placeholder.svg"}
                    alt={currentSong.title}
                    className="w-14 h-14 object-cover rounded-md transition-transform duration-500 group-hover:scale-110"
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="flex gap-1">
                        <span className="w-1 h-6 bg-white rounded-full animate-[soundbar_0.5s_ease-in-out_infinite_alternate]"></span>
                        <span className="w-1 h-8 bg-white rounded-full animate-[soundbar_0.7s_ease-in-out_infinite_alternate]"></span>
                        <span className="w-1 h-4 bg-white rounded-full animate-[soundbar_0.6s_ease-in-out_infinite_alternate]"></span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate hover:underline cursor-pointer text-white">
                  {currentSong.title}
                </div>
                <div className="text-sm text-zinc-400 truncate hover:underline cursor-pointer hover:text-zinc-300 transition-colors">
                  {currentSong.artist}
                </div>
              </div>
              {/* Add Like Button here */}
              {currentSong && <LikeButton song={currentSong} size="sm" />}
            </>
          )}
        </div>

        {/* Player controls */}
        <div className="flex flex-col items-center gap-2 flex-1 max-w-full sm:max-w-[45%]">
          <div className="flex items-center gap-4 sm:gap-6">
            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-colors rounded-full"
            >
              <Shuffle className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-colors rounded-full"
              onClick={playPrevious}
              disabled={!currentSong}
            >
              <SkipBack className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              className="bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white rounded-full h-12 w-12 shadow-lg hover:shadow-emerald-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95"
              onClick={togglePlay}
              disabled={!currentSong}
            >
              {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5 ml-0.5" />}
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-colors rounded-full"
              onClick={playNext}
              disabled={!currentSong}
            >
              <SkipForward className="h-4 w-4" />
            </Button>

            <Button
              size="icon"
              variant="ghost"
              className="hidden sm:inline-flex text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-colors rounded-full"
            >
              <Repeat className="h-4 w-4" />
            </Button>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-full">
            <div className="text-xs text-zinc-400">{formatDuration(currentTime)}</div>
            <div className="relative w-full h-1.5 group">
              <div className="absolute inset-0 h-full bg-white/[0.05] rounded-full"></div>
              <div
                className="absolute inset-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full transition-all duration-100 ease-linear"
                style={{ width: `${progressPercent}%` }}
              ></div>
              <Slider
                value={[currentTime]}
                max={duration || 100}
                step={1}
                className="absolute inset-0 w-full hover:cursor-grab active:cursor-grabbing opacity-0"
                onValueChange={handleSeek}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${progressPercent}%` }}
              ></div>
            </div>
            <div className="text-xs text-zinc-400">{formatDuration(duration)}</div>
          </div>
        </div>

        {/* Volume controls */}
        <div className="hidden sm:flex items-center gap-4 min-w-[180px] w-[30%] justify-end">
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-colors rounded-full"
          >
            <Mic2 className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-colors rounded-full"
          >
            <ListMusic className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-colors rounded-full"
          >
            <Laptop2 className="h-4 w-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="text-zinc-500 hover:text-white hover:bg-white/[0.05] transition-colors rounded-full"
            >
              <Volume1 className="h-4 w-4" />
            </Button>

            <div className="relative w-24 h-1.5 group">
              <div className="absolute inset-0 h-full bg-white/[0.05] rounded-full"></div>
              <div
                className="absolute inset-0 h-full bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full"
                style={{ width: `${volume}%` }}
              ></div>
              <Slider
                value={[volume]}
                max={100}
                step={1}
                className="absolute inset-0 w-full hover:cursor-grab active:cursor-grabbing opacity-0"
                onValueChange={(value) => {
                  setVolume(value[0])
                  if (audioRef.current) {
                    audioRef.current.volume = value[0] / 100
                  }
                }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full bg-white shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ left: `${volume}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

