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
    // Get video metadata
    const info = await ytDlp(youtubeUrl, {
      dumpSingleJson: true,
      noWarnings: true,
      noCheckCertificates: true,
      preferFreeFormats: true,
    });

    const fileName = `${randomUUID()}.mp3`;
    const outputPath = path.join(DOWNLOAD_DIR, fileName);

    // Download audio
    await ytDlp(youtubeUrl, {
      extractAudio: true,
      audioFormat: "mp3",
      output: outputPath,
      ffmpegLocation:
        "C:\\Users\\HP\\Downloads\\ffmpeg-8.1.1-essentials_build\\ffmpeg-8.1.1-essentials_build\\bin\\ffmpeg.exe",
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

  let message = "Unknown download error";
  let code = "DOWNLOAD_FAILED";

  if (error.message.includes("Video unavailable")) {
    message = "This YouTube video is unavailable.";
    code = "VIDEO_UNAVAILABLE";
  } else if (error.message.includes("Private video")) {
    message = "This video is private.";
    code = "PRIVATE_VIDEO";
  } else if (error.message.includes("Sign in")) {
    message = "This video requires authentication.";
    code = "LOGIN_REQUIRED";
  }

  throw {
    stage: "DOWNLOAD",
    code,
    message,
  };
}
};