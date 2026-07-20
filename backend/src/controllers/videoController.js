import Video from "../models/Video.js";
import { v4 as uuidv4 } from "uuid";

import validateYoutubeUrl from "../utils/validateYoutubeUrl.js";

import { downloadAudio } from "../services/youtubeService.js";

import {
  uploadAudio,
  deleteCloudinaryAudio,
  deleteLocalAudio,
} from "../services/cloudinaryService.js";

import { triggerMakeScenario } from "../services/makeService.js";

import { env } from "../config/env.js";


export const submitVideo = async (req, res) => {
  try {
    const { youtubeUrl, noteType,language } = req.body;

    if (!youtubeUrl || !noteType) {
      return res.status(400).json({
        success: false,
        message: "YouTube URL and Note Type are required",
      });
    }

    if (!validateYoutubeUrl(youtubeUrl)) {
      return res.status(400).json({
        success: false,
        message: "Invalid YouTube URL",
      });
    }

    const jobId = uuidv4();
    
    // Create Job
    const video = await Video.create({
      jobId,
      user: req.user._id,
      recipientEmail: req.user.email,
      youtubeUrl,
      noteType,
      language,
      status: "pending",
    });

    // Download MP3
    const { audioPath } = await downloadAudio(youtubeUrl);

    // Upload MP3 to Cloudinary
    const { audioUrl, publicId } = await uploadAudio(audioPath);

    // Save upload information
    video.audioUrl = audioUrl;
    video.cloudinaryPublicId = publicId;
    video.localAudioPath = audioPath;

    await video.save();
    console.log({
  jobId: video.jobId,
  userId: video.user.toString(),
  recipientEmail: video.recipientEmail,
  noteType: video.noteType,
  audioUrl: video.audioUrl,
});
    // Trigger Make
    await triggerMakeScenario({
      jobId: video.jobId,
      userId: video.user.toString(),
      recipientEmail: video.recipientEmail,
      noteType: video.noteType,
      language:video.language,
      audioUrl: video.audioUrl,
    });

    video.status = "processing";

    await video.save();

    return res.status(201).json({
      success: true,
      message: "Video submitted successfully",
      jobId: video.jobId,
      status: video.status,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message || "Server Error",
    });
  }
};
export const updateVideoStatus = async (req, res) => {
  try {
    const { webhookSecret } = req.body;

    if (webhookSecret !== env.WEBHOOK_SECRET) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized webhook request",
      });
    }

    const { jobId, status, progress, googleDocUrl, error } = req.body;

    const video = await Video.findOne({ jobId });

    if (!video) {
      return res.status(404).json({
        success: false,
        message: "Video job not found",
      });
    }

    if (progress !== undefined) {
      video.progress = progress;
    }

    video.status = status;

    if (googleDocUrl) {
      video.googleDocUrl = googleDocUrl;
    }

    if (pdfUrl) {
      video.pdfUrl = pdfUrl;
    }

    if (error) {
      video.error = error;
    }

    // Cleanup after successful completion
    if (status === "completed") {
      if (video.cloudinaryPublicId) {
        await deleteCloudinaryAudio(video.cloudinaryPublicId);
      }

      if (video.localAudioPath) {
        await deleteLocalAudio(video.localAudioPath);
      }
    }

    await video.save();

    return res.status(200).json({
      success: true,
      message: "Video updated successfully",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getMyVideos = async (req, res) => {
  try {
    const videos = await Video.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      videos,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
