const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    snsId: {
      type: mongoose.SchemaTypes.String,
      ref: "User",
      required: true,
      unique: true,
    },
    refreshToken: { type: String, required: true },
  },
  { versionKey: false }
);

// snsId를 통해 refresh 토큰 찾기
tokenSchema.statics.findByRefresh = function (refreshToken) {
  return this.findOne({ refreshToken });
};

tokenSchema.statics.saveRefresh = function ({ snsId, refreshToken }) {
  const refresh = new this({
    snsId,
    refreshToken,
  });

  return refresh.save();
};

export const refresh = mongoose.model("token", tokenSchema);
