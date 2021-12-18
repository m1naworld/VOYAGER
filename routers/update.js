import express from "express";
import {
  dailyQuestionRegister,
  surveyRegister,
  colorRegister,
} from "../servers/controllers/updateController";

const update = express.Router();

// 주관식 질문 DB 저장
update.get("/dailyQuestion", dailyQuestionRegister);

// 객관식 질문 DB 저장
update.get("/surveyQuestion", surveyRegister);

// 컬러 DB 저장
update.get("/color", colorRegister);

export default update;
