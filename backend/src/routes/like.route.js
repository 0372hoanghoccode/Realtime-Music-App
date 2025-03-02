import { Router } from "express";
import {
  likeSong,
  unlikeSong,
  getUserLikedSongs,
  checkIfSongLiked
} from "../controller/like.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/songs/:songId", likeSong);
router.delete("/songs/:songId", unlikeSong);
router.get("/songs", getUserLikedSongs);
router.get("/songs/:songId/check", checkIfSongLiked);

export default router;
