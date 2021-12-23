import mongoose from "mongoose";

const myDiarySchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true },
    date: String,
    diary: String,
  },
  { versionKey: false }
);

export const mydiary = mongoose.model("mydiary", myDiarySchema);
