import mongoose from "mongoose";

const myColorSchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true, unique: true },
    data: [
      {
        date: String,
        color: String,
      },
    ],
  },
  { versionKey: false }
);

myColorSchema.statics.registerColor = function ({ snsId, date, color }) {
  return this.findOneAndUpdate(
    { snsId },
    { $push: { data: { date, color } } },
    { new: true, upsert: true }
  );
};

export const mycolor = mongoose.model("mycolor", myColorSchema);
