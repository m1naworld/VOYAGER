import express from "express";
import {
  dailyQuestionRegister,
  surveyRegister,
} from "../servers/controllers/questionsController";

const update = express.Router();
update.post("/dailyQuestion", dailyQuestionRegister);
// 객관식 질문 스키마
update.post("/surveyQuestion", surveyRegister);

export default update;
