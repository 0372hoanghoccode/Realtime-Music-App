import { Like } from "../models/like.model.js";
import { Song } from "../models/song.model.js";

export const likeSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const userId = req.auth.userId;

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Kiểm tra xem đã like chưa
    const existingLike = await Like.findOne({ userId, songId });
    if (existingLike) {
      return res.status(400).json({ message: "You've already liked this song" });
    }

    const like = new Like({
      userId,
      songId
    });

    await like.save();
    res.status(201).json({ message: "Song liked successfully" });
  } catch (error) {
    console.log("Error in likeSong", error);
    next(error);
  }
};

export const unlikeSong = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const userId = req.auth.userId;

    const result = await Like.findOneAndDelete({ userId, songId });

    if (!result) {
      return res.status(404).json({ message: "You haven't liked this song" });
    }

    res.status(200).json({ message: "Song unliked successfully" });
  } catch (error) {
    console.log("Error in unlikeSong", error);
    next(error);
  }
};

export const getUserLikedSongs = async (req, res, next) => {
  try {
    const userId = req.auth.userId;

    const likes = await Like.find({ userId }).sort({ createdAt: -1 });

    const songIds = likes.map(like => like.songId);

    const likedSongs = await Song.find({
      _id: { $in: songIds }
    });

    res.status(200).json(likedSongs);
  } catch (error) {
    console.log("Error in getUserLikedSongs", error);
    next(error);
  }
};

export const checkIfSongLiked = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const userId = req.auth.userId;

    const like = await Like.findOne({ userId, songId });

    res.status(200).json({ liked: !!like });
  } catch (error) {
    console.log("Error in checkIfSongLiked", error);
    next(error);
  }
};
