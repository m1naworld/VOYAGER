import mongoose from "mongoose";

const dailyQuestionSchema = new mongoose.Schema(
  {
    datas: [{ type: Object }],
  },
  { versionKey: false }
);

export const datas = mongoose.model("dailyquestion", dailyQuestionSchema);
