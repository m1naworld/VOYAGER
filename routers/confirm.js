import express from "express";
import {
  checkUser,
  phoneCheck,
  emailCheck,
  confirmEmail,
  sendEmail,
} from "../servers/controllers/confirmController";

const confirm = express.Router();

// 이메일 중복 체크
confirm.post("/checkEmail", emailCheck);

// 휴대폰 중복 체크
confirm.post("/checkPhone", phoneCheck);

// 비밀번호 변경 시 한번더 로그인
confirm.post("/checkUser", checkUser);

// 이메일 인증 및 비밀번호 찾기
confirm.post("/change", sendEmail);

// 이메일 인증 확인
confirm.post("/confirm", confirmEmail);

export default confirm;
