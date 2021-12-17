import mongoose from "mongoose";

const myDiarySchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true, unique: true },
    data: [
      {
        date: String,
        diary: String,
      },
    ],
  },
  { versionKey: false }
);

myDiarySchema.statics.registerDiary = function ({ snsId, date, diary }) {
  return this.findOneAndUpdate(
    { snsId },
    { $push: { data: { date: date, diary } } },
    { new: true, upsert: true }
  );
};

export const mydiary = mongoose.model("mydiary", myDiarySchema);
