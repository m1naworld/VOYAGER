import express from "express";
import { addDaily } from "../servers/controllers/dailyQuestionsController";
import {
  myColor,
  myDiary,
  myDaily,
} from "../servers/controllers/myDataController";
import { snsIdCheck } from "../servers/controllers/Cheak";

const register = express.Router();

// 주관직 질문 스키마
register.post("/dailyQuestion", addDaily);

// user data 추가
register.post("/addDaily", snsIdCheck, myDaily);
register.post("/addDiary", snsIdCheck, myDiary);
register.post("/addColor", snsIdCheck, myColor);

module.exports = register;
