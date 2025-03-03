import { History } from "../models/history.model.js";
import { Song } from "../models/song.model.js";

export const addToHistory = async (req, res, next) => {
  try {
    const { songId } = req.params;
    const userId = req.auth.userId;

    const song = await Song.findById(songId);
    if (!song) {
      return res.status(404).json({ message: "Song not found" });
    }

    // Kiểm tra xem đã có trong lịch sử chưa
    const existingEntry = await History.findOne({ userId, songId });

    if (existingEntry) {
      // Cập nhật lịch sử hiện có
      existingEntry.playCount += 1;
      existingEntry.lastPlayed = Date.now();
      await existingEntry.save();
    } else {
      // Tạo mới nếu chưa có
      const historyEntry = new History({
        userId,
        songId
      });
      await historyEntry.save();
    }

    res.status(200).json({ message: "History updated successfully" });
  } catch (error) {
    console.log("Error in addToHistory", error);
    next(error);
  }
};

export const getUserHistory = async (req, res, next) => {
  try {
    const userId = req.auth.userId;

    const history = await History.find({ userId })
      .sort({ lastPlayed: -1 })
      .populate("songId");

    res.status(200).json(history);
  } catch (error) {
    console.log("Error in getUserHistory", error);
    next(error);
  }
};

export const clearHistory = async (req, res, next) => {
  try {
    const userId = req.auth.userId;

    await History.deleteMany({ userId });

    res.status(200).json({ message: "History cleared successfully" });
  } catch (error) {
    console.log("Error in clearHistory", error);
    next(error);
  }
};
