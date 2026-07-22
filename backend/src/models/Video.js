import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    youtubeUrl: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      default: "",
    },

    noteType: {
      type: String,
      enum: [
        "full",
        "timestamp",
        "exam",
        "flashcards",
      ],
      required: true,
    },

status: {
    type: String,
    enum: [
        "pending",
        "extracting_audio",
        "transcribing",
        "generating_notes",
        "creating_docs",
        "processing",
        "sending_email",
        "completed",
        "failed",
        "downloading"
    ],
    default: "pending"
},
language: {
    type: String,
    default: "English",
},
progress: {
    type: Number,
    default: 0
},

    googleDocUrl: {
      type: String,
      default: "",
    },

    pdfUrl: {
      type: String,
      default: "",
    },

    error: {
      type: String,
      default: "",
    },
    jobId: {
    type: String,
    unique: true,
},

recipientEmail: {
    type: String,
    required: true,
},

makeExecutionId: {
    type: String,
    default: "",
},
audioUrl: {
  type: String,
  default: "",
},

cloudinaryPublicId: {
  type: String,
  default: "",
},

localAudioPath: {
  type: String,
  default: "",
},
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Video", videoSchema);