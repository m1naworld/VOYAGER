import mongoose from "mongoose";
import moment from "moment";

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const registerDate = moment().format("YYYY-MM-DD HH:mm:ss");

const calendarSchema = new mongoose.Schema(
  {
    // snsId: { type: String, required: true, unique: true },
    data: {
      type: Object,
      date: { type: String, default: registerDate },
      colors: { type: String },
      diary: { type: String },
      dailyA: {
        type: Object,
        // label: { type: mongoose.SchemaTypes.ObjectId, ref: "dailyquestion " },
        label: Number,
        data: [Object],
      },
    },
  },
  { versionKey: false }
);

calendarSchema.statics.findUser = function ({ snsId }) {
  return this.findOne({ snsId });
};

calendarSchema.statics.register = function ({ dailyA }) {
  const calendar = new this({ data: dailyA });
  return calendar.save();
};

// calendarSchema.statics.findDate = function ({data.date})

export const calendar = mongoose.model("calendar", calendarSchema);
