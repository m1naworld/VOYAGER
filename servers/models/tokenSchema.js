const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    snsId: { type: mongoose.SchemaTypes.String, ref: "User" },
    token: { type: String },
  },
  { versionKey: false }
);

tokenSchema.methods.tomato = () => {
  return "OK";
};

export const refresh = mongoose.model("token", tokenSchema);
