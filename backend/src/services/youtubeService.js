import ytDlp from "yt-dlp-exec";
import path from "path";
import fs from "fs";
import { randomUUID } from "crypto";

const DOWNLOAD_DIR = path.resolve("src/downloads");

// Create downloads folder if it doesn't exist
if (!fs.existsSync(DOWNLOAD_DIR)) {
  fs.mkdirSync(DOWNLOAD_DIR, { recursive: true });
}

export const downloadAudio = async (youtubeUrl) => {
  try {
    const fileName = `${randomUUID()}.mp3`;
    const outputPath = path.join(DOWNLOAD_DIR, fileName);

    await ytDlp(youtubeUrl, {
      extractAudio: true,
      audioFormat: "mp3",
      output: outputPath,
      ffmpegLocation:"C:\\Users\\HP\\Downloads\\ffmpeg-8.1.1-essentials_build\\ffmpeg-8.1.1-essentials_build\\bin\\ffmpeg.exe",
    });

    return {
      success: true,
      audioPath: outputPath,
    };
  } catch (error) {
    console.error("Download Error:", error);

    throw new Error("Failed to download YouTube audio.");
  }
};