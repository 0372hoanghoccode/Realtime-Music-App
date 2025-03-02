import { axiosInstance } from "@/lib/axios";
import { Song } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";

interface LikeStore {
  likedSongs: Song[];
  isLoading: boolean;
  error: string | null;
  fetchLikedSongs: () => Promise<void>;
  likeSong: (songId: string) => Promise<void>;
  unlikeSong: (songId: string) => Promise<void>;
  checkIfSongLiked: (songId: string) => Promise<boolean>;
  refreshLikedSongs: () => Promise<void>;
}

export const useLikeStore = create<LikeStore>((set, get) => ({
  likedSongs: [],
  isLoading: false,
  error: null,

  fetchLikedSongs: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/likes/songs");
      set({ likedSongs: response.data });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error fetching liked songs";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  likeSong: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post(`/likes/songs/${songId}`);
      toast.success("Song liked successfully");
      // reset ds song sau khi like thanh cong
      await get().refreshLikedSongs();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error liking song";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  unlikeSong: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/likes/songs/${songId}`);
      toast.success("Song unliked successfully");
      // reset ds song sau khi unlike thanh cong
      await get().refreshLikedSongs();
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error unliking song";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  checkIfSongLiked: async (songId: string) => {
    try {
      const isLikedLocally = get().likedSongs.some(song => song.id === songId);
      if (isLikedLocally) return true;

      const response = await axiosInstance.get(`/likes/songs/${songId}/check`);
      return response.data.liked;
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.warn("Authentication required to check liked status");
        return false;
      }
      console.error("Error checking like status:", error);
      return false;
    }
  },

  refreshLikedSongs: async () => {
    try {
      const response = await axiosInstance.get("/likes/songs");
      set({ likedSongs: response.data });
    } catch (error: any) {
      if (error.response?.status === 401) {
        console.warn("Authentication required to refresh liked songs");
        set({ likedSongs: [] });
      } else {
        console.error("Error refreshing liked songs:", error);
      }
    }
  },
}));
