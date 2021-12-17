import mongoose from "mongoose";

const myColorSchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true },
    date: String,
    color: String,
  },
  { versionKey: false }
);

export const mycolor = mongoose.model("mycolor", myColorSchema);
