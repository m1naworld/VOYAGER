import mongoose from "mongoose";

const dailyQuestionSchema = new mongoose.Schema(
  {
    label: Number,
    data: [Object],
  },
  { versionKey: false }
);

dailyQuestionSchema.statics.count = function () {
  return this.countDocuments();
};

export const dailyquestion = mongoose.model(
  "dailyquestion",
  dailyQuestionSchema
);
