import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import authRoutes from "./routes/authRoutes.js";
import downloadRoutes from "./routes/downloadRoutes.js";
const app = express();
import videoRoutes from "./routes/videoRoutes.js";
/* ---------------- Middleware ---------------- */

// Allow frontend to access backend
app.use(
  cors({
    origin: env.CLIENT_URL,
    credentials: true,
  })
);

// Parse JSON body
app.use(express.json());

// Parse URL encoded data
app.use(express.urlencoded({ extended: true }));

/* ---------------- Routes ---------------- */
app.use("/api/auth", authRoutes);

app.use("/api/videos", videoRoutes);
app.use("/api/download", downloadRoutes);
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 StudyScribe AI Backend is Running",
  });
});

export default app;