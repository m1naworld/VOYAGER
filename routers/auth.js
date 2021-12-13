import express from "express";

//middle
import { jwtVerify } from "../servers/middle/jwtVerify";
import { phoneCheck, userCheck } from "../servers/middle/Check";
import { emailCheck } from "../servers/middle/Check";
import { tokenError } from "../servers/middle/jwtError";

//controller
import { postJoin, logOut } from "../servers/controllers/loginController";
import { social } from "../servers/controllers/socialController";
import { findEmail, sendEmail } from "../servers/controllers/myFindController";
import {
  confirmEmail,
  postLogin,
  postSocialLogin,
} from "../servers/controllers/authController";
import { changePassword } from "../servers/controllers/userModifyController";

const router = express.Router();

// 회원가입
router.post("/join", postJoin);

// 로컬 로그인
router.post("/login", postLogin);

// 소셜 로그인 토큰 발급
router.post("/access", social, postSocialLogin);

// 토큰 검증
router.get("/user", tokenError, jwtVerify);

// 로그아웃
router.get("/logout", logOut);

// 비밀번호 변경시 userCheck
router.post("/userCheck", userCheck);

// 이메일 중복 체크
router.post("/checkEmail", emailCheck);

// 휴대폰 중복 체크
router.post("/checkPhone", phoneCheck);

// 이메일 찾기
router.post("/findEmail", findEmail);

// 이메일 인증 및 비밀번호 찾기
router.post("/change", sendEmail);

// 이메일 인증 확인
router.post("/confirm", confirmEmail);

router.post("/user/password/modify", changePassword);

module.exports = router;
