import express from "express";

//middle
import { jwtVerify } from "../servers/middle/jwtVerify";
import { userCheck } from "../servers/middle/Cheak";
import { emailCheck } from "../servers/middle/Cheak";
import { tokenError } from "../servers/middle/jwtError";

//controller
import { join, logOut } from "../servers/controllers/loginController";
import { social } from "../servers/controllers/socialController";
import { findEmail } from "../servers/controllers/myFindController";
import {
  postLogin,
  postSocialLogin,
} from "../servers/controllers/authController";

const router = express.Router();

// 회원가입
router.post("/join", join);

// 로컬 로그인
router.post("/login", postLogin);

// 소셜 로그인 토큰 발급
router.post("/access", social, postSocialLogin);

// 토큰 검증
router.get("/user", tokenError, jwtVerify);

// 비밀번호 변경시 userCheck
router.get("/userCheck", userCheck);

// 로그아웃
router.get("/logout", logOut);

// 이메일 중복 체크
router.post("/check", emailCheck);

router.post("/findEmail", findEmail);

module.exports = router;
