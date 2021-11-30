import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    question: [{ type: Object }],
  },
  { versionKey: false }
);

// random => 10개 뽑고 리스트에 넣어서 DB에 스키마 별 넣ㅇ기 ㄴㄹ
surveySchema.static.register = function ({ happy, sad, joy, anger }) {
  const survey = new this({
    question: [
      { emotion: "happy", data: happy },
      { emotion: "sad", data: sad },
      { emotion: "joy", data: joy },
      { emotion: "anger", data: anger },
    ],
  });

  return survey.save();
};

export const survey = mongoose.model("survey", surveySchema);
