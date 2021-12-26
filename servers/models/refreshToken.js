const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    snsId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshjwt: { type: String, required: true },
  },
  { versionKey: false }
);

export const refresh = mongoose.model("token", tokenSchema);
