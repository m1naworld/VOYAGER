import mongoose, { mongo } from "mongoose";
import moment from "moment";

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const date = moment().format("YYYY-MM-DD");

// const dailySchema = new mongoose.Schema({
//   question: { type: mongoose.SchemaTypes.ObjectId, ref: "dailyquestion" },
//   answer: { type: Object },
// });

// const dataSchema = new mongoose.Schema({
//   date: { type: String, required: true, default: date },
//   colors: String,
//   diary: String,
//   daily: [dailySchema],
// });

// const calendarSchema = new mongoose.Schema(
//   {
//     snsId: { type: String, required: true, unique: true },
//     data: { Object },
//   },
//   { versionKey: false }
// );

const calendarSchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true, unique: true },
    data: {
      date: {
        type: Date,
        required: true,
        unique: true,
      },
      colors: String,
      diary: String,
      daily: {
        question: {
          type: mongoose.SchemaTypes.ObjectId,
          ref: "dailyquestion",
        },
        answer: { type: Object },
      },
    },
  },
  { versionKey: false }
);

// snsId 저장
calendarSchema.statics.registerSnsId = function ({ snsId }) {
  const create = new this({ snsId });
  return create.save();
};

// snsId로 user 찾기
calendarSchema.statics.findUser = function ({ snsId }) {
  return this.findOne({ snsId });
};

// calendarSchema.statics.registerDaily = function ({ snsId, question, answer }) {
//   return this.findOneAndUpdate({
//     snsId,
//     $set: {
//       data: { daily: { question, answer } },
//     },
//     new: true,
//     upsert: true,
//   });
// };

// calendarSchema.statics.addDiary = function (snsId, question, answer) {
//   // const me = this.findOne({ snsId });
//   const newdaily = calendar[0].data.push({ daily: [{ question, answer }] });
//   return newdaily.save();
// };

// calendarSchema.statics.registerDiary = function ({ snsId, date, diary }) {
//   return this.updateOne({
//     snsId,
//     $push: { data: { date, diary } },
//     new: true,
//     upsert: true,
//   });
// };

// calendarSchema.statics.registerDiary = function ({ snsId, date, diary }) {
//   return this.updateOne(
//     { snsId },
//     { $push: { data: { diary } } },
//     { new: true, insert: true }
//   );
// };

// calendarSchema.statics.registerDiary = function({ snsId, date diary})
// // calendarSchema.statics.findDate = function ({data.date})
// // label: { type: mongoose.SchemaTypes.ObjectId, ref: "dailyquestion " },

export const calendar = mongoose.model("calendar", calendarSchema);
