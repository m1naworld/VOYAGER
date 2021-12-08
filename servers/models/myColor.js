import mongoose from "mongoose";

const myColorSchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true, unique: true },
    data: [
      {
        date: { type: Date, required: true },
        color: String,
      },
    ],
  },
  { versionKey: false }
);

myColorSchema.statics.registerSnsId = function ({ snsId }) {
  const create = new this({ snsId });
  return create.save();
};

myColorSchema.statics.registerColor = function ({ snsId, date, color }) {
  return this.findOneAndUpdate(
    { snsId },
    { $push: { data: { date, color } } },
    { new: true, upsert: true }
  );
};

export const mycolor = mongoose.model("mycolor", myColorSchema);
