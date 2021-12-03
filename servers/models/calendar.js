import mongoose from "mongoose";
import moment from "moment";

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const registerDate = moment().format("YYYY-MM-DD");

const calendarSchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true, unique: true },
    data: {
      type: Object,
      date: {
        type: String,
        default: registerDate,
        required: true,
        unique: true,
      },
      colors: String,
      diary: String,
      dailyA: {
        // type: Object,
        // label: { type: mongoose.SchemaType.label, ref: "dailyquestion" },
        data: { Object },
      },
    },
  },
  { versionKey: false }
);

calendarSchema.statics.register = function ({ dailyA }) {
  const calendar = new this({
    data: { dailyA: dailyA },
  });
  return calendar.save();
};

calendarSchema.statics.registerSnsId = function ({ snsId }) {
  const create = new this({ snsId });
  return create.save();
};

calendarSchema.statics.findUser = function ({ snsId }) {
  return this.findOne({ snsId });
};

// calendar 참조 ObjectId 가져와서 User DB에 넣기
calendarSchema.statics.registerData = function ({ snsId, dailyA }) {
  return this.findOneAndUpdate({
    snsId,
    $push: { data: { dailyA } },
    upsert: true,
  });
};

// calendarSchema.statics.findDate = function ({data.date})
// label: { type: mongoose.SchemaTypes.ObjectId, ref: "dailyquestion " },

export const calendar = mongoose.model("calendar", calendarSchema);
