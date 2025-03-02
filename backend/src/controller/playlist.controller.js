import { Playlist } from "../models/playlist.model.js";
import { Song } from "../models/song.model.js";
import cloudinary from "../lib/cloudinary.js";

export const createPlaylist = async (req, res, next) => {
  try {
    const { name, description, isPublic } = req.body;
    const userId = req.auth.userId;

    let imageUrl;
    if (req.files && req.files.imageFile) {
      const result = await cloudinary.uploader.upload(req.files.imageFile.tempFilePath, {
        resource_type: "auto",
      });
      imageUrl = result.secure_url;
    } else {
      imageUrl = "https://res.cloudinary.com/dzjkpikmw/image/upload/v1734568920/samples/people/jazz.jpg";
    }

    const playlist = new Playlist({
      name,
      description,
      userId,
      imageUrl,
      isPublic: isPublic !== undefined ? isPublic : true,
    });

    await playlist.save();
    res.status(201).json(playlist);
  } catch (error) {
    console.log("Error in createPlaylist", error);
    next(error);
  }
};

export const getUserPlaylists = async (req, res, next) => {
  try {
    const userId = req.auth.userId;
    const playlists = await Playlist.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(playlists);
  } catch (error) {
    console.log("Error in getUserPlaylists", error);
    next(error);
  }
};

export const getPublicPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ isPublic: true })
      .sort({ createdAt: -1 })
      .limit(10);
    res.status(200).json(playlists);
  } catch (error) {
    console.log("Error in getPublicPlaylists", error);
    next(error);
  }
};

export const getPlaylistById = async (req, res, next) => {
  try {
    const { playlistId } = req.params;
    const userId = req.auth.userId;

    const playlist = await Playlist.findById(playlistId).populate("songs");

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    // Check if user has access to this playlist
    if (!playlist.isPublic && playlist.userId !== userId) {
      return res.status(403).json({ message: "You don't have access to this playlist" });
    }

    res.status(200).json(playlist);
  } catch (error) {
    console.log("Error in getPlaylistById", error);
    next(error);
  }
};

export const addSongToPlaylist = async (req, res, next) => {
  try {
    const { playlistId, songId } = req.params;
    const userId = req.auth.userId;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.userId !== userId) {
      return res.status(403).json({ message: "You don't have permission to modify this playlist" });
    }

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Check if song is already in playlist
    if (playlist.songs.includes(songId)) {
      return res.status(400).json({ message: "Song already in playlist" });
    }

    playlist.songs.push(songId);
    await playlist.save();

    res.status(200).json(playlist);
  } catch (error) {
    console.log("Error in addSongToPlaylist", error);
    next(error);
  }
};

export const removeSongFromPlaylist = async (req, res, next) => {
  try {
    const { playlistId, songId } = req.params;
    const userId = req.auth.userId;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.userId !== userId) {
      return res.status(403).json({ message: "You don't have permission to modify this playlist" });
    }

    playlist.songs = playlist.songs.filter(
      (id) => id.toString() !== songId
    );

    await playlist.save();

    res.status(200).json(playlist);
  } catch (error) {
    console.log("Error in removeSongFromPlaylist", error);
    next(error);
  }
};

export const deletePlaylist = async (req, res, next) => {
  try {
    const { playlistId } = req.params;
    const userId = req.auth.userId;

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
      return res.status(404).json({ message: "Playlist not found" });
    }

    if (playlist.userId !== userId) {
      return res.status(403).json({ message: "You don't have permission to delete this playlist" });
    }

    await Playlist.findByIdAndDelete(playlistId);

    res.status(200).json({ message: "Playlist deleted successfully" });
  } catch (error) {
    console.log("Error in deletePlaylist", error);
    next(error);
  }
};
