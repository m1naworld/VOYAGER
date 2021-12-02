const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema(
  {
    snsId: {
      type: String,
      required: true,
      unique: true,
    },
    refreshToken: { type: String, required: true },
  },
  { versionKey: false }
);

tokenSchema.statics.findBysnsId = function ({ snsId }) {
  return this.findOne({ snsId });
};

tokenSchema.statics.findByRefresh = function ({ refreshtoken }) {
  return this.findOne({ refreshToken: refreshtoken });
};

tokenSchema.statics.saveRefresh = function ({ snsId, refreshToken }) {
  const refresh = new this({
    snsId,
    refreshToken,
  });

  return refresh.save();
};

tokenSchema.statics.deleteRefresh = function ({ refreshtoken }) {
  return this.remove({ refreshToken: refreshtoken });
};

tokenSchema.statics.deleteSnsId = function ({ snsId }) {
  return this.remove({ snsId });
};

export const refresh = mongoose.model("token", tokenSchema);
