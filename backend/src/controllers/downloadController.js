import { downloadAudio } from "../services/youtubeService.js";

export const downloadYoutubeAudio = async (req, res) => {
  try {
    const { youtubeUrl } = req.body;

    if (!youtubeUrl) {
      return res.status(400).json({
        success: false,
        message: "YouTube URL is required",
      });
    }

    const result = await downloadAudio(youtubeUrl);

    return res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};