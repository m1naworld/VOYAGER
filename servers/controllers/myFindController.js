import { User } from "../models/User";
import nodemailer from "nodemailer";

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

// // export const email
// export const findPassword = async (req, res) => {
//   try {
//     const email = req.body.email;
//     const user = await User.findOne({ email });
//     if (user) {
//       res.status(200).json({ inAuth: true, message: "email 확인 완료" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(400).json({ error: "비밀번호 찾기 실패" });
//   }
// };
// let transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 587,
//   secure: false,
//   auth: {
//     user: process.env.VOYAGER,
//     pass: process.env.VOYAGER_PASSWORD,
//   },
// });

// let message = {
//   from: process.env.VOYAGER,
//   to: "미나", // 받는사람,
//   subject: "VOYAGER 메일 인증",
//   // html:
// };

// transporter.sendMail(message, function (error, res) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("이메일 발송 성공");
//   }

//   transporter.close();
// });
