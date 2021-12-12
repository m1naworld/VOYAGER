import { User } from "../models/User";
import fs from "fs";

const bcrypt = require("bcrypt");

export const userInformation = async (req, res) => {
  try {
    const snsId = req.snsId;
    const user = await User.findOne({ snsId });
    return res.status(200).json({ success: true, user });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "유저 정보 찾기 실패", error });
  }
};

export const changeNickname = async (req, res) => {
  try {
    const snsId = req.snsId;
    const nickname = req.body.nickname;
    const user = await User.findOne({ snsId });
    user.nickname = nickname;
    user.save();

    return res.status(200).json({ success: true, nickname });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "nickname 변경 실패", error });
  }
};

export const changePassword = async (req, res) => {
  try {
    const snsId = req.snsId;
    let password = req.body.password;
    const user = await User.findOne({ snsId });
    console.log(user);
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    password = await bcrypt.hash(password, salt);
    user.password = password;
    user.save();
    return res
      .status(200)
      .json({ success: true, message: "password 변경 성공" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "password 변경 실패", error });
  }
};

export const changeImage = async (req, res) => {
  try {
    const snsId = req.snsId;
    const img = req.file.path;
    console.log(img);
    const user = await User.findOne({ snsId });
    const defaultIMG = process.env.IMG;
    if (user.img !== defaultIMG) {
      fs.unlink(user.img, function (error) {
        if (error) {
          console.log(error);
        }
      });
    }
    user.img = img;
    user.save();
    return res.status(200).json({ success: true, img });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "image 변경 실패 ", error });
  }
};
