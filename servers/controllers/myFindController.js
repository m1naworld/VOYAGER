import { User } from "../models/User";
import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";

export const findEmail = async (req, res) => {
  try {
    let { name, birthday, phone } = req.body;
    birthday = birthday.split("-");
    const birthyear = birthday[0];
    const birth = birthday[1] + birthday[2];
    const user = await User.findOne({ phone });
    let email = user.email;
    email = email.split("@");
    let secret = email[0];
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "저장되지 않은 휴대폰 번호 입니다." });
    } else if (
      user.name === name &&
      user.birth === birth &&
      user.birthyear === birthyear
    ) {
      secret = secret.split("");
      secret.splice(-4, 4, "****");
      secret = secret.join("");
      email = secret + "@" + email[1];
      console.log(email);
      return res.status(200).json({ success: true, email });
    }
    return res
      .status(400)
      .json({ success: false, message: "정보를 다시 입력해주세요." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "이메일 찾기 실패", error });
  }
};

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

    transporter.sendMail(message, function (error, res) {
      if (error) {
        console.log(error);
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
