import mongoose from "mongoose";

const surveySchema = new mongoose.Schema(
  {
    emotions: [Object],
  },
  { versionKey: false }
);

// random => 10개 뽑고 리스트에 넣어서 DB에 스키마 별 넣ㅇ기 ㄴㄹ
surveySchema.statics.register = function ({ happy, sad, joy, anger }) {
  const survey = new this({
    emotions: [
      { emotion: "happy", data: happy },
      { emotion: "sad", data: sad },
      { emotion: "joy", data: joy },
      { emotion: "anger", data: anger },
    ],
  });

  return survey.save();
};

export const survey = mongoose.model("survey", surveySchema);
