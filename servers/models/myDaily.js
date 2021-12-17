import mongoose from "mongoose";

const myDailySchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true },
    date: String,
    question: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "dailyquestion",
    },
    answer: [Object],
  },
  { versionKey: false }
);

export const mydaily = mongoose.model("mydaily", myDailySchema);
