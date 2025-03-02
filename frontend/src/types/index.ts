export interface Song {
  id: string;
  _id: string;
  title: string;
  artist: string;
  albumId: string | null;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  createdAt: string;
  updatedAt: string;
}

export interface Album {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Song[];
}

export interface Stats {
  totalSongs: number;
  totalAlbums: number;
  totalUsers: number;
  totalArtists: number;
  totalPlaylists: number;
  totalLikes: number;
  mostPlayedSongs: {
    songId: string;
    title: string;
    artist: string;
    totalPlays: number;
  }[];
}

export interface Message {
  _id: string;
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  clerkId: string;
  fullName: string;
  imageUrl: string;
}

export interface Playlist {
  _id: string;
  name: string;
  description: string;
  userId: string;
  imageUrl: string;
  songs: Song[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Like {
  _id: string;
  userId: string;
  songId: string;
  createdAt: string;
  updatedAt: string;
}

export interface HistoryEntry {
  _id: string;
  userId: string;
  songId: Song;
  playCount: number;
  lastPlayed: string;
  createdAt: string;
  updatedAt: string;
}
