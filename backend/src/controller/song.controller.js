import { Song } from "../models/song.model.js";
import { History } from "../models/history.model.js";

export const getAllSongs = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, sortBy = 'createdAt', order = 'desc', search } = req.query;

    const query = {};

    // search theo title hoặc artist
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { artist: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const songs = await Song.find(query)
      .sort({ [sortBy]: order === 'desc' ? -1 : 1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Song.countDocuments(query);

    res.json({
      songs,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        totalItems: total,
        itemsPerPage: parseInt(limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getFeaturedSongs = async (req, res, next) => {
  try {
    // nghe nhiều nhất
    const topPlayedSongs = await History.aggregate([
      {
        $group: {
          _id: "$songId",
          totalPlays: { $sum: "$playCount" }
        }
      },
      {
        $sort: { totalPlays: -1 }
      },
      {
        $limit: 6
      },
      {
        $lookup: {
          from: "songs",
          localField: "_id",
          foreignField: "_id",
          as: "songDetails"
        }
      },
      {
        $unwind: "$songDetails"
      },
      {
        $project: {
          _id: "$songDetails._id",
          title: "$songDetails.title",
          artist: "$songDetails.artist",
          imageUrl: "$songDetails.imageUrl",
          audioUrl: "$songDetails.audioUrl",
          plays: "$totalPlays"
        }
      }
    ]);

    // không đủ 6 bài, bổ sung thêm bằng các bài ngẫu nhiên
    if (topPlayedSongs.length < 6) {
      const existingIds = topPlayedSongs.map(song => song._id);

      const additionalSongs = await Song.aggregate([
        {
          $match: {
            _id: { $nin: existingIds }
          }
        },
        {
          $sample: { size: 6 - topPlayedSongs.length }
        },
        {
          $project: {
            _id: 1,
            title: 1,
            artist: 1,
            imageUrl: 1,
            audioUrl: 1
          }
        }
      ]);

      topPlayedSongs.push(...additionalSongs);
    }

    res.json(topPlayedSongs);
  } catch (error) {
    next(error);
  }
};

export const getMadeForYouSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};

export const getTrendingSongs = async (req, res, next) => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    res.json(songs);
  } catch (error) {
    next(error);
  }
};
