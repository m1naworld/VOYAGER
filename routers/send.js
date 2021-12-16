import express from "express";
import {
  sendDailyQeustion,
  sendSurveyQuestion,
  sendCalendar,
  userInformation,
  sendDiary,
} from "../servers/controllers/sendController";

import { snsIdCheck } from "../servers/middle/snsIdCheck";

const send = express.Router();

send.get("/dailyQuestion", sendDailyQeustion);
send.get("/surveyQuestion", sendSurveyQuestion);
send.get("/calendar", snsIdCheck, sendCalendar);
send.get("/diary");
// // 유저정보 보내기
send.get("/user", snsIdCheck, userInformation);

send.post("/diary", snsIdCheck, sendDiary);
export default send;
