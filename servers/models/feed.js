import mongoose from "mongoose";

const feedSchema = new mongoose.Schema(
  {
    date: String,
    snsId: String,
    nickname: String,
    img: String,
    answer: Object,
    likeCount: { type: Number, default: 0 },
    user: [],
    status: Boolean,
  },
  { versionKey: false }
);

export const feed = mongoose.model("feed", feedSchema);
