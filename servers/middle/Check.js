import { User } from "../models/User";
import jwt from "jsonwebtoken";
const bcrypt = require("bcrypt");

export const emailCheck = async (req, res, next) => {
  const email = req.body.email;
  try {
    const exUser = await User.findOne({ email });

    if (exUser) {
      console.log(exUser);
      next();
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "이메일 확인 실패", error });
  }
};

export const snsIdCheck = (req, res, next) => {
  try {
    const accesstoken = req.cookies.Authorization;
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
    req.snsId = decoded.id;
    req.snsId !== undefined
      ? next()
      : res.status(400).json({ success: false, message: "snsIdCheck 실패" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "snsIdCheck 실패", error });
  }
};

export const userCheck = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ email });
    if (user) {
      const validate = await bcrypt.compare(password, user.password);
      validate
        ? res.status(200).json({ success: true, message: "user 확인 성공" })
        : res.status(400).json({ success: false, message: "password 불일치" });
    } else {
      return res.status(400).json({ success: false, message: "이메일 없음" });
    }
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "이메일 비밀번호 오류", error });
  }
};
