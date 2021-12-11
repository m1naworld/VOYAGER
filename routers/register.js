import express from "express";
import {
  dailyQuestionRegister,
  surveyRegister,
} from "../servers/controllers/questionsController";
import {
  myColor,
  myDiary,
  myDaily,
} from "../servers/controllers/myDataController";
import { snsIdCheck } from "../servers/middle/Cheak";
import {
  changeImage,
  changeNickname,
  changePassword,
} from "../servers/controllers/userModifyController";
import multer from "multer";

const register = express.Router();

// 주관식 질문 스키마
register.post("/dailyQuestion", dailyQuestionRegister);
// 객관식 질문 스키마
register.post("/surveyQuestion", surveyRegister);

// user data 추가
register.post("/addDaily", snsIdCheck, myDaily);
register.post("/addDiary", snsIdCheck, myDiary);
register.post("/addColor", snsIdCheck, myColor);

// user 회원 정보 수정
register.post("/user/modify", snsIdCheck, changeNickname);
register.post("/user/password/modify", snsIdCheck, changePassword);

const upload = multer({ dest: "uploads/" });

register.post("/userImg", snsIdCheck, upload.single("image"), changeImage);

module.exports = register;
