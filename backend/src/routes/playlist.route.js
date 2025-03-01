import { Router } from "express";
import {
  createPlaylist,
  getUserPlaylists,
  getPublicPlaylists,
  getPlaylistById,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist
} from "../controller/playlist.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/", createPlaylist);
router.get("/me", getUserPlaylists);
router.get("/public", getPublicPlaylists);
router.get("/:playlistId", getPlaylistById);
router.post("/:playlistId/songs/:songId", addSongToPlaylist);
router.delete("/:playlistId/songs/:songId", removeSongFromPlaylist);
router.delete("/:playlistId", deletePlaylist);

export default router;
