import { Router } from "express";
import {
  addToHistory,
  getUserHistory,
  clearHistory
} from "../controller/history.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = Router();

router.use(protectRoute);

router.post("/songs/:songId", addToHistory);
router.get("/", getUserHistory);
router.delete("/", clearHistory);

export default router;
