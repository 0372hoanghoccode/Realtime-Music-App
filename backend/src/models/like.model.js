import mongoose from "mongoose";

const likeSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    }, // Clerk user ID
    songId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true
    }
  },
  { timestamps: true }
);

// Đảm bảo mỗi user chỉ có thể thích một bài hát một lần
likeSchema.index({ userId: 1, songId: 1 }, { unique: true });

export const Like = mongoose.model("Like", likeSchema);

