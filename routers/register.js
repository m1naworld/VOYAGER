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
import { snsIdCheck } from "../servers/controllers/Cheak";

const register = express.Router();

// 주관식 질문 스키마
register.post("/dailyQuestion", dailyQuestionRegister);
// 객관식 질문 스키마
register.post("/surveyQuestion", surveyRegister);

// user data 추가
register.post("/addDaily", snsIdCheck, myDaily);
register.post("/addDiary", snsIdCheck, myDiary);
register.post("/addColor", snsIdCheck, myColor);

module.exports = register;
