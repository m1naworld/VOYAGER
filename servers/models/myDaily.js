import mongoose from "mongoose";

const myDailySchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true, unique: true },
    data: [
      {
        date: String,
        question: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "dailyquestion",
        },
        answer: [Object],
      },
    ],
  },
  { versionKey: false }
);

myDailySchema.statics.registerDaily = function ({
  snsId,
  date,
  question,
  answer,
}) {
  return this.findOneAndUpdate(
    { snsId },
    {
      $push: {
        data: { date, question, answer },
      },
    },
    { new: true }
  );
};

export const mydaily = mongoose.model("mydaily", myDailySchema);
