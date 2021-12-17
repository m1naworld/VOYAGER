import express from "express";
import {
  dailyQuestionRegister,
  surveyRegister,
  colorRegister,
} from "../servers/controllers/updateController";

const update = express.Router();

// 주관식 질문 DB 저장
update.post("/dailyQuestion", dailyQuestionRegister);

// 객관식 질문 DB 저장
update.get("/surveyQuestion", surveyRegister);

update.get("/color", colorRegister);

export default update;
