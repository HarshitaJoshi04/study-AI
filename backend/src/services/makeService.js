import axios from "axios";
import { env } from "../config/env.js";

export const triggerMakeScenario = async ({
  jobId,
  userId,
  recipientEmail,
  noteType,
  audioUrl,
  language,
}) => {
  try {
    const payload = {
      webhookSecret: env.WEBHOOK_SECRET,
      jobId,
      userId,
      recipientEmail,
      noteType,
      language,
      audioUrl,
    };

    console.log("========== MAKE WEBHOOK ==========");
    console.log("URL:", env.MAKE_WEBHOOK_URL);
    console.log("Payload:", JSON.stringify(payload, null, 2));

    const response = await axios.post(env.MAKE_WEBHOOK_URL, payload, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 30000,
    });

    console.log("Response Status:", response.status);
    console.log("Response Data:", response.data);

    return response.data;
  } catch (error) {
    console.error("========== MAKE ERROR ==========");
    console.error("Status:", error.response?.status);
    console.error("Response:", error.response?.data);
    console.error("Message:", error.message);

    throw error;
  }
};