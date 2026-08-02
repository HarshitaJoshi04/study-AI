import ytDlp from "yt-dlp-exec";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const DOWNLOAD_DIR = path.resolve("src/downloads");

if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

export const downloadAudio = async (youtubeUrl) => {
  try {
    // Fetch metadata
    const info = await ytDlp(youtubeUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      preferFreeFormats: true,
      extractorArgs: "youtube:player_client=android",
    });

    const fileName = `${randomUUID()}.mp3`;
    const outputPath = path.join(DOWNLOAD_DIR, fileName);

    // Download audio
    await ytDlp(youtubeUrl, {
      extractAudio: true,
      audioFormat: "mp3",
      output: outputPath,
      ffmpegLocation: "ffmpeg",
      extractorArgs: "youtube:player_client=android",
    });

    return {
      success: true,
      audioPath: outputPath,
      title: info.title,
      duration: info.duration,
      thumbnail: info.thumbnail,
      channel: info.uploader,
    };
  } catch (error) {
    console.error("Download Error:", error);

    const err = error.stderr || error.message || "";

    let message = "Unknown download error";
    let code = "DOWNLOAD_FAILED";

    if (err.includes("Video unavailable")) {
      message = "This YouTube video is unavailable.";
      code = "VIDEO_UNAVAILABLE";
    } else if (err.includes("Private video")) {
      message = "This video is private.";
      code = "PRIVATE_VIDEO";
    } else if (err.includes("Sign in to confirm")) {
      message =
        "YouTube blocked this download. Please try another video.";
      code = "LOGIN_REQUIRED";
    }

    throw {
      stage: "DOWNLOAD",
      code,
      message,
    };
  }
};