import mongoose from "mongoose";
import moment from "moment";

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const registerDate = moment().format("YYYY-MM-DD");

const calendarSchema = new mongoose.Schema(
  {
    // snsId: {
    //   type: mongoose.Schema.Types.ObjecctId,
    //   ref: "User",
    //   required: true,
    //   unique: true,
    // },
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
      dailyA: { type: Object, label: Number, data: { Object } },
    },
  },
  { versionKey: false }
);

calendarSchema.statics.findUser = function ({ snsId }) {
  return this.findOne({ snsId });
};

calendarSchema.statics.register = function ({ dailyA }) {
  const calendar = new this({
    data: { dailyA: dailyA },
  });
  return calendar.save();
};

// calendarSchema.statics.findDate = function ({data.date})
// label: { type: mongoose.SchemaTypes.ObjectId, ref: "dailyquestion " },

export const calendar = mongoose.model("calendar", calendarSchema);
