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
    phone: String,
    registerdate: { type: String, default: registerDate },
    confirmation: { type: Boolean },
  },
  { versionKey: false }
);

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
  confirmation,
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
    confirmation,
  });

  return user.save();
};

export const User = mongoose.model("User", userSchema);
