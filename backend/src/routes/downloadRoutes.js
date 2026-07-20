import express from "express";
import { downloadYoutubeAudio } from "../controllers/downloadController.js";

const router = express.Router();

router.post("/youtube-audio", downloadYoutubeAudio);

export default router;