import mongoose from "mongoose";

const historySchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    }, // Clerk user ID
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true
    },
    playCount: {
      type: Number,
      default: 1
    },
    lastPlayed: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export const History = mongoose.model("History", historySchema);
