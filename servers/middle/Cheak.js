import { User } from "../models/User";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

export const emailCheck = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  console.log(email);
  try {
    const exUser = await User.findOne({
      email,
    });

    if (exUser) {
      console.log(exUser);
      return res
        .status(200)
        .json({ error: "이메일이 중복되었습니다", check: false });
    }
    return res.status(200).json({ check: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

export const snsIdCheck = (req, res, next) => {
  try {
    const accesstoken = req.cookies.Authorization;
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
    req.snsId = decoded.id;
    req.snsId !== undefined
      ? next()
      : res.status(400).json({ inAuth: false, message: "snsIdCheck 실패" });
  } catch (error) {
    return res.status(400).json({ inAuth: false, message: "snsIdCheck 실패" });
  }
};

export const userCheck = async (req, res) => {
  try {
    const provider = "local";
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ provider, email });
    const validate = await bcrypt.compare(password, user.password);
    validate
      ? res.status(200).json({ inAuth: true, message: "user 확인 성공" })
      : res.status(400).json({ inAuth: false, message: "password 불일치" });
  } catch (error) {
    return res
      .status(400)
      .json({ inAuth: false, message: "이메일 비밀번호 오류" });
  }
};
