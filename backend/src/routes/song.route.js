import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYouSongs, getTrendingSongs } from "../controller/song.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { cacheMiddleware, clearCache } from "../middleware/cache.middleware.js";

const router = Router();

//áp dụng cache cho các route không thay đổi thường xuyên
router.get("/", protectRoute, cacheMiddleware, getAllSongs);
router.get("/featured", cacheMiddleware, getFeaturedSongs);
router.get("/made-for-you", cacheMiddleware, getMadeForYouSongs);
router.get("/trending", cacheMiddleware, getTrendingSongs);

export default router;
