import mongoose from "mongoose";

const colorSchema = new mongoose.Schema(
  {
    position: Array,
    color: String,
  },
  { versionKey: false }
);

export const resultcolor = mongoose.model("color", colorSchema);
