import express from "express";
import {
  submitVideo,
  getMyVideos,
  updateVideoStatus,
} from "../controllers/videoController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Submit a new video
router.post("/submit", protect, submitVideo);

// Get all videos of logged-in user
router.get("/", protect, getMyVideos);

// Callback from Make.com
router.post("/webhook", updateVideoStatus);

export default router;