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
dailyQuestionSchema.statics.findDailyQ = function ({ label }) {
  return this.findOne({ label });
};

export const dailyquestion = mongoose.model(
  "dailyquestion",
  dailyQuestionSchema
);
