import mongoose from "mongoose";

const myCalendarSchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true, unique: true },
    color: { type: mongoose.SchemaTypes.ObjectId, ref: "mycolor" },
    diary: { type: mongoose.SchemaTypes.ObjectId, ref: "mydiary" },
    daily: { type: mongoose.SchemaTypes.ObjectId, ref: "mydaily" },
  },
  { versionKey: false }
);

myCalendarSchema.statics.registerSnsId = function ({ snsId }) {
  const create = new this({ snsId });
  return create.save();
};

myCalendarSchema.statics.registerData = function ({
  snsId,
  color,
  diary,
  daily,
}) {
  return this.findOneAndUpdate(
    { snsId },
    { $push: { color, diary, daily } },
    { new: true }
  );
};

export const mycalendar = mongoose.model("mycalendar", myCalendarSchema);
