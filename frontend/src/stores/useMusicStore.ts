import { axiosInstance } from "@/lib/axios";
import { Album, Song, Stats, Playlist } from "@/types";
import { toast } from "sonner";
import { create } from "zustand";

interface MusicStore {
  songs: Song[];
  albums: Album[];
  isLoading: boolean;
  error: string | null;
  currentAlbum: Album | null;
  featuredSongs: Song[];
  madeForYouSongs: Song[];
  trendingSongs: Song[];
  stats: Stats;
  currentPlaylist: Playlist | null;
  userPlaylists: Playlist[];
  publicPlaylists: Playlist[];

  fetchAlbums: () => Promise<void>;
  fetchAlbumById: (id: string) => Promise<void>;
  fetchFeaturedSongs: () => Promise<void>;
  fetchMadeForYouSongs: () => Promise<void>;
  fetchTrendingSongs: () => Promise<void>;
  fetchStats: () => Promise<void>;
  fetchSongs: () => Promise<void>;
  deleteSong: (id: string) => Promise<void>;
  deleteAlbum: (id: string) => Promise<void>;
  fetchPlaylistById: (id: string) => Promise<void>;
  fetchUserPlaylists: () => Promise<void>;
  addSongToPlaylist: (playlistId: string, songId: string) => Promise<void>;
  removeSongFromPlaylist: (playlistId: string, songId: string) => Promise<void>;
  deletePlaylist: (id: string) => Promise<void>;
  createPlaylist: (name: string, description?: string, isPublic?: boolean) => Promise<void>;
  fetchPublicPlaylists: () => Promise<void>;
}

export const useMusicStore = create<MusicStore>((set) => ({
  albums: [],
  songs: [],
  isLoading: false,
  error: null,
  currentAlbum: null,
  madeForYouSongs: [],
  featuredSongs: [],
  trendingSongs: [],
  stats: {
    totalSongs: 0,
    totalAlbums: 0,
    totalArtists: 0,
    totalDuration: 0,
    totalLikes: 0,
    totalPlaylists: 0,
    totalUsers: 0,
    mostPlayedSongs: [],
  },
  currentPlaylist: null,
  userPlaylists: [],
  publicPlaylists: [],

  fetchPublicPlaylists: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/playlists/public");
      set({ publicPlaylists: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error fetching public playlists" });
      console.error("Error fetching public playlists:", error.message);
    } finally {
      set({ isLoading: false });
    }
  },

 createPlaylist: async (name, description = "", isPublic = true) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post("/playlists", {
        name,
        description,
        isPublic,
      });
      set((state) => ({
        userPlaylists: [...state.userPlaylists, response.data],
      }));
      toast.success("Playlist created successfully!");
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error creating playlist" });
      toast.error("Failed to create playlist");
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPlaylistById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/playlists/${id}`);
      set({ currentPlaylist: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error fetching playlist" });
      console.error("Error fetching playlist:", error.message)
    } finally {
      set({ isLoading: false });
    }
  },

  fetchUserPlaylists: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get("/playlists/me");
      set({ userPlaylists: response.data });
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error fetching playlists" });
      console.error("Error fetching user playlists:", error.message);
    } finally {
      set({ isLoading: false });
    }
  },

  addSongToPlaylist: async (playlistId, songId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`/playlists/${playlistId}/songs/${songId}`);
      set({ currentPlaylist: response.data });
      toast.success("Song added to playlist");
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error adding song" });
      toast.error("Failed to add song to playlist");
    } finally {
      set({ isLoading: false });
    }
  },

  removeSongFromPlaylist: async (playlistId, songId) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/playlists/${playlistId}/songs/${songId}`);
      set({ currentPlaylist: response.data });
      toast.success("Song removed from playlist");
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error removing song" });
      toast.error("Failed to remove song from playlist");
    } finally {
      set({ isLoading: false });
    }
  },

  deletePlaylist: async (id) => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.delete(`/playlists/${id}`);
      set((state) => ({
        userPlaylists: state.userPlaylists.filter((playlist) => playlist._id !== id),
        currentPlaylist: state.currentPlaylist?._id === id ? null : state.currentPlaylist,
      }));
      toast.success("Playlist deleted successfully");
    } catch (error: any) {
      set({ error: error.response?.data?.message || "Error deleting playlist" });
      toast.error("Failed to delete playlist");
    } finally {
      set({ isLoading: false });
    }
  },

	deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/songs/${id}`);

			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.log("Error in deleteSong", error);
			toast.error("Error deleting song");
		} finally {
			set({ isLoading: false });
		}
	},

	deleteAlbum: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
				),
			}));
			toast.success("Album deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete album: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},

	fetchSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs");
			set({ songs: response.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchStats: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/stats");
			set({ stats: response.data });
		} catch (error: any) {
			set({ error: error.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbums: async () => {
		set({ isLoading: true, error: null });

		try {
			const response = await axiosInstance.get("/albums");
			set({ albums: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchAlbumById: async (id) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get(`/albums/${id}`);
			set({ currentAlbum: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchFeaturedSongs: async () => {
  set({ isLoading: true, error: null });
  try {
    const response = await axiosInstance.get("/songs/featured");
    console.log("Featured songs:", response.data);
    set({ featuredSongs: response.data });
  } catch (error: any) {
    console.error("Error fetching featured songs:", error.message);
    set({ error: error.response?.data?.message || "Failed to fetch featured songs" });
  } finally {
    set({ isLoading: false });
  }
},

	fetchMadeForYouSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/made-for-you");
			set({ madeForYouSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},

	fetchTrendingSongs: async () => {
		set({ isLoading: true, error: null });
		try {
			const response = await axiosInstance.get("/songs/trending");
			set({ trendingSongs: response.data });
		} catch (error: any) {
			set({ error: error.response.data.message });
		} finally {
			set({ isLoading: false });
		}
	},
}));
