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

tokenSchema.statics.findBysnsId = function ({ snsId }) {
  return this.findOne({ snsId });
};

tokenSchema.statics.findByRefresh = function ({ refreshtoken }) {
  return this.findOne({ refreshtoken });
};

tokenSchema.statics.saveRefresh = function ({ snsId, refreshjwt }) {
  const refresh = new this({
    snsId,
    refreshjwt,
  });

  return refresh.save();
};

tokenSchema.statics.deleteRefresh = function ({ refreshtoken }) {
  return this.remove({ refreshtoken });
};

tokenSchema.statics.deleteSnsId = function ({ snsId }) {
  return this.remove({ snsId });
};

export const refresh = mongoose.model("token", tokenSchema);
