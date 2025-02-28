import { Album } from "../models/album.model.js";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Playlist } from "../models/playlist.model.js";
import { Like } from "../models/like.model.js";
import { History } from "../models/history.model.js";

export const getStats = async (req, res, next) => {
  try {
    const [
      totalSongs,
      totalAlbums,
      totalUsers,
      totalPlaylists,
      totalLikes,
      uniqueArtists,
      mostPlayedSongs
    ] = await Promise.all([
      Song.countDocuments(),
      Album.countDocuments(),
      User.countDocuments(),
      Playlist.countDocuments(),
      Like.countDocuments(),
      Song.aggregate([
        {
          $unionWith: {
            coll: "albums",
            pipeline: [],
          },
        },
        {
          $group: {
            _id: "$artist",
          },
        },
        {
          $count: "count",
        },
      ]),
      History.aggregate([
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
          $limit: 5
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
            _id: 0,
            songId: "$_id",
            title: "$songDetails.title",
            artist: "$songDetails.artist",
            totalPlays: 1
          }
        }
      ])
    ]);

    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      totalPlaylists,
      totalLikes,
      totalArtists: uniqueArtists[0]?.count || 0,
      mostPlayedSongs
    });
  } catch (error) {
    next(error);
  }
};
