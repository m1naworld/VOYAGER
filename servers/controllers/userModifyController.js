import { User } from "../models/User";
import fs from "fs";

const bcrypt = require("bcrypt");

export const userInformation = async (req, res) => {
  try {
    const snsId = req.snsId;
    const user = await User.findOne({ snsId });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "유저 정보 실패 " });
  }
};

export const changeNickname = async (req, res) => {
  try {
    console.log(req.body);
    const snsId = req.snsId;
    const nickname = req.body.nickname;
    const user = await User.findOne({ snsId });
    user.nickname = nickname;
    user.save();

    return res.status(200).json({ nickname });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ modify: false, message: "nickname 변경 실패" });
  }
};

export const changePassword = async (req, res) => {
  try {
    const snsId = req.body.snsId;
    let password = req.body.password;
    const passwordCheck = req.body.passwordCheck;

    if (password === passwordCheck) {
      const user = await User.findOne({ snsId });
      console.log(user);
      const salt = await bcrypt.genSalt(Number(process.env.SALT));
      password = await bcrypt.hash(password, salt);
      user.password = password;
      user.save();
      return res
        .status(200)
        .json({ modify: true, message: "password 변경 성공" });
    }
    return res.status(400).json({ modify: false, message: "password 불일치" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ modify: false, message: "password 변경 실패" });
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
    return res.status(200).json({ img });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ modify: false, message: "image 변경 실패 " });
  }
};

export const findEmail = async (req, res) => {
  try {
    console.log(req.body);
    const name = req.body.name;
    let birthday = req.body.birthday;
    birthday = birthday.split("-");
    const phone = req.body.phone;
    const birthyear = birthday[0];
    const birth = birthday[1] + birthday[2];
    console.log(birthyear, birth);
    const user = await User.findOne({ phone });
    if (!user) {
      return res
        .status(400)
        .json({ message: "저장되지 않은 휴대폰 번호 입니다." });
    } else if (
      user.name == name &&
      user.birth == birth &&
      user.birthyear == birthyear
    ) {
      let email = user.email;
      email = email.split("@");
      let secret = email[0];
      secret = secret.split("");
      const index = email.indexOf("@", 0);
      secret.splice(index - 3, 4, "****");
      secret = secret.join("");
      email = secret + "@" + email[1];
      console.log(email);
      return res.status(200).json({ email });
    }
    return res.status(400).json({ message: "정보를 다시 입력해주세요." });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "이메일 찾기 실패" });
  }
};