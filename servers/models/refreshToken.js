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

tokenSchema.statics.findByRefresh = function ({ refresh }) {
  return this.findOne({ refreshToken: refresh });
};

tokenSchema.statics.saveRefresh = function ({ snsId, refreshjwt }) {
  const refresh = new this({
    snsId,
    refreshToken: refreshjwt,
  });

  return refresh.save();
};

tokenSchema.statics.deleteRefresh = function ({ refreshjwt }) {
  return this.remove({ refreshToken: refreshjwt });
};

tokenSchema.statics.deleteSnsId = function ({ snsId }) {
  return this.remove({ snsId });
};

export const refresh = mongoose.model("token", tokenSchema);
