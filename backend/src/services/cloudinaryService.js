import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadAudio = async (audioPath) => {
  try {
    const result = await cloudinary.uploader.upload(audioPath, {
      resource_type: "video",
      folder: "studyscribe-audio",
      use_filename: true,
      unique_filename: true,
    });

    return {
      audioUrl: result.secure_url,
      publicId: result.public_id,
    };
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);

    throw new Error("Failed to upload audio to Cloudinary.");
  }
};

export const deleteCloudinaryAudio = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "video",
    });

    console.log("Cloudinary audio deleted.");
  } catch (error) {
    console.error("Cloudinary Delete Error:", error);
  }
};

export const deleteLocalAudio = async (audioPath) => {
  try {
    if (fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath);
      console.log("Local audio deleted.");
    }
  } catch (error) {
    console.error("Local Delete Error:", error);
  }
};