import mongoose from "mongoose";
import moment from "moment";

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

const registerDate = moment().format("YYYY-MM-DD HH:mm:ss");

const dailyQandASchema = new mongoose.Schema(
  {
    label: Number,
    dailyQ: [String],
    dailyA: [String],
  },
  { versionKey: false }
);

export const dailyQandA = mongoose.model("dailyQandA", dailyQandASchema);

const dataSchema = new mongoose.Schema(
  {
    date: { type: String, default: registerDate },
    colors: { type: [Number] },
    diary: { type: String },
    dailyQandA: { type: mongoose.SchemaType.ObjectId, ref: "dailyQandA" },
  },
  { versionKey: false }
);

export const data = mongoose.model("data", dataSchema);

const calendarSchema = new mongoose.Schema(
  {
    snsId: { type: String, required: true, unique: true },
    data: { type: mongoose.SchemaType.ObjectId, ref: "data" },
  },
  { versionKey: false }
);

export const calendar = mongoose.model("calendar", calendarSchema);
