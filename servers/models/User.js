import mongoose from "mongoose";
import moment from "moment";
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
const registerDate = moment().format("YYYY-MM-DD");

const userSchema = new mongoose.Schema(
  {
    provider: { type: String, required: true },
    snsId: { type: String, required: true, unique: true },
    email: String,
    password: String,
    nickname: { type: String, default: null },
    name: String,
    gender: String,
    age: String,
    birth: String,
    birthyear: String,
    phone: { type: String, unique: true },
    registerdate: { type: String, default: registerDate },
    userCalendar: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "mycalendar",
    },
    img: {
      type: String,
      default: process.env.IMG,
    },
  },
  { versionKey: false }
);

// 이메일로 유저 찾기
userSchema.statics.findByEmail = function ({ email }) {
  return this.findOne({ email });
};

// snsId로 유저 찾기
userSchema.statics.findBySnsId = function ({ snsId }) {
  return this.findOne({ snsId });
};

// 저장된 유저가 없을 시 유저 디비 저장
userSchema.statics.join = function ({
  provider,
  snsId,
  email,
  name,
  gender,
  age,
  birth,
  birthyear,
  phone,
  userCalendar,
}) {
  const user = new this({
    provider,
    snsId,
    email,
    name,
    gender,
    age,
    birth,
    birthyear,
    phone,
    userCalendar,
  });

  return user.save();
};

export const User = mongoose.model("User", userSchema);
