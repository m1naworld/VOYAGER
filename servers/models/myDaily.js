import mongoose from "mongoose";

const myDailySchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true, unique: true },
    owner: { type: mongoose.SchemaTypes.ObjectId, required: true },
    data: [
      {
        date: Date,
        daily: {
          question: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "dailyquestion",
          },
          answer: { type: Object },
        },
      },
    ],
  },
  { versionKey: false }
);

myDailySchema.statics.registerSnsId = function ({ snsId, id }) {
  const create = new this({ snsId, owner: id });
  return create.save();
};

myDailySchema.statics.registerDaily = function ({ snsId, date, daily }) {
  return this.findOneAndUpdate(
    { snsId },
    {
      $push: {
        data: { date, daily },
      },
    },
    { new: true }
  );
};

export const mydaily = mongoose.model("mydaily", myDailySchema);
