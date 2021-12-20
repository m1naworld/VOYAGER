import { User } from "../models/User";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

// 이메일 확인
export const emailCheck = async (req, res) => {
  const email = req.body.email;
  try {
    const exUser = await User.findOne({ email });

    if (!exUser) {
      console.log("사용 가능한 이메일 입니다.");
      return res
        .status(200)
        .json({ success: true, message: "사용 가능한 이메일 입니다." });
    } else {
      return res.status(402).json({
        find: true,
        success: false,
        message: "이미 존재하는 이메일 입니다.",
      });
    }
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "이메일 확인 실패", error });
  }
};

// 휴대폰 확인
export const phoneCheck = async (req, res) => {
  const phone = req.body.phone;
  try {
    const exUser = await User.findOne({ phone });
    if (!exUser) {
      console.log(exUser);
      return res.status(200).json({ success: true });
    }
    return res
      .status(400)
      .json({ success: false, message: "이미 존재하는 휴대폰 번호 입니다." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "폰번호 확인 실패", error });
  }
};

// 이메일 및 비밀번호 유저 확인
export const userCheck = async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    const user = await User.findOne({ email });
    if (user) {
      const validate = await bcrypt.compare(password, user.password);
      if (validate) {
        return res
          .status(200)
          .json({ user, success: true, message: "user 확인 성공" });
      }
      return res
        .status(400)
        .json({ success: false, message: "password 불일치" });
    }
    return res.status(400).json({ success: false, message: "이메일 없음" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "이메일 비밀번호 오류", error });
  }
};

// 인증 이메일 발송
export const sendEmail = async (req, res) => {
  try {
    console.log(req.body);
    const email = req.body.email;
    const target = req.body.target;
    const user = await User.findOne({ email });
    const id = user._id;
    const name = user.name;
    const filePath = path.join(__dirname, `../../${target}.html`);
    const source = fs.readFileSync(filePath, "utf-8").toString();
    const template = handlebars.compile(source);
    const replacements = {
      name,
      email,
      url: process.env.URL + `${target}/?id=` + id,
    };

    const htmlToSend = template(replacements);
    let transporter = nodemailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.VOYAGER,
        pass: process.env.VOYAGER_PASSWORD,
      },
    });

    let message = {
      from: "VOYAGER",
      to: "m1nna@naver.com",
      subject: "VOYAGER 메일 인증",
      html: htmlToSend,
    };

    transporter.sendMail(message, async function (error, res) {
      if (error) {
        console.log(error);
        return res
          .status(400)
          .json({ success: false, message: "인증 이메일 발송 실패", error });
      } else {
        console.log(res);
        console.log("이메일 발송 성공");
      }
      transporter.close();
    });
    return res.status(200).json({
      success: true,
      message: "등록하신 이메일로 인증메일을 발송하였습니다.",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "email인증 전송 실패", error });
  }
};

// 이메일 인증 받는 함수
export const confirmEmail = async (req, res) => {
  try {
    const { id: _id } = req.body;
    console.log(_id);
    const user = await User.findOne({ _id });
    console.log(user);
    user.confirmation = true;
    user.save();
    console.log(user);
    return res
      .status(200)
      .json({ success: true, message: "email 인증 받기 성공" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};
