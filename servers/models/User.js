import mongoose from "mongoose";
import moment from "moment";
require("moment-timezone");
// import crypto from "crypto";

// function hash(password) {
//   return crypto
//     .createHmac("sha256", process.env.SECRET_KEY)
//     .update(password)
//     .digest("hex");
// }

moment.tz.setDefault("Asia/Seoul");
const registerDate = moment().format("YYYY-MM-DD HH:mm:ss");

const userSchema = new mongoose.Schema(
  {
    provider: { type: String, required: true },
    snsId: { type: String, required: true, unique: true },
    email: { type: String },
    password: { type: String },
    nickname: { type: String },
    name: { type: String },
    gender: { type: String },
    age: { type: String },
    birth: { type: String },
    birthyear: { type: String },
    phone: { type: String },
    registerdate: { type: String, default: registerDate },
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
  // password,
  name,
  gender,
  age,
  birth,
  birthyear,
  phone,
}) {
  const user = new this({
    provider,
    snsId,
    email,
    // password: hash(password),
    name,
    gender,
    age,
    birth,
    birthyear,
    phone,
  });

  return user.save();
};

// userSchema.statics.update = function ({ dailyQnum }) {
//   return this.update({ dailyQnum: dailyQnum }, { $inc: { dailyQnum: 1 } });
// };

// userSchema.method.validatePassword = (password) => {
//   // 함수로 전달받은 password의 해시값과 데이터에 담겨있는 해시값을 비교
//   const hashed = hash(password);
//   return this.password === hashed;
// };

export const User = mongoose.model("User", userSchema);
