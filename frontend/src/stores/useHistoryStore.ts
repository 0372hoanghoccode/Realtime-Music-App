import { axiosInstance } from "@/lib/axios";
import { HistoryEntry } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";

interface HistoryStore {
  history: HistoryEntry[];
  isLoading: boolean;
  error: string | null;
  fetchHistory: () => Promise<void>;
  addToHistory: (songId: string) => Promise<void>;
  clearHistory: () => Promise<void>;
}

export const useHistoryStore = create<HistoryStore>((set) => ({
  history: [],
  isLoading: false,
  error: null,

  fetchHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/history");
      set({ history: response.data });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error fetching history";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  addToHistory: async (songId: string) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post(`/history/songs/${songId}`);
      toast.success("Added to history");
      const response = await axiosInstance.get("/history");
      set({ history: response.data });
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error adding to history";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },

  clearHistory: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete("/history");
      set({ history: [] });
      toast.success("History cleared successfully");
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error clearing history";
      set({ error: errorMessage });
      toast.error(errorMessage);
    } finally {
      set({ isLoading: false });
    }
  },
}));
