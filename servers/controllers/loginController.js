import { User } from "../models/User";
import { mycalendar } from "../models/myCalendar";
import { refresh } from "../models/refreshToken";
import { addCalendar } from "./myDataController";

import dotenv from "dotenv";
dotenv.config();

const bcrypt = require("bcrypt");

export const join = async (req, res) => {
  // req의 body 정보를 사용하려면 server.js에서 따로 설정을 해줘야함
  let { provider, email, password, name, birth, birthyear, phone } = req.body;
  const snsId = email;
  try {
    //   email을 비교하여 user가 이미 존재하는지 확인
    let users = await User.findOne({ email, provider: "local" });
    if (users) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    password = await bcrypt.hash(password, salt);

    await mycalendar.registerSnsId({ snsId });
    const checkCalendar = await mycalendar.findOne({ snsId });
    const userCalendar = checkCalendar._id;

    addCalendar(snsId);

    // user에 name, email, password 등 값 할당
    users = new User({
      provider,
      snsId,
      email,
      password,
      name,
      birth,
      birthyear,
      phone,
      userCalendar,
    });
    console.log(users);
    // password를 암호화 하기
    await users.save(); // db에 user 저장

    res.status(200).json({ success: true, message: "회원가입 성공" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const logOut = async (req, res) => {
  try {
    const refreshtoken = req.cookies.reAuthorization;
    res.clearCookie("Authorization");
    res.clearCookie("reAuthorization");

    const refreshed = await refresh.findByRefresh({ refreshtoken });
    if (refreshed) {
      await refresh.deleteRefresh({ refreshtoken });
    }
    return res.status(200).json({ success: true, message: "로그아웃" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "로그아웃 실패", error });
  }
};
