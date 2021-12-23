import express from "express";
import {
  sendDailyQeustion,
  sendSurveyQuestion,
  sendCalendar,
  userInformation,
} from "../servers/controllers/sendController";
import { sendFeed } from "../servers/controllers/sendController";
import { snsIdCheck } from "../servers/middle/snsIdCheck";

const send = express.Router();

send.get("/dailyQuestion", sendDailyQeustion);
send.get("/surveyQuestion", sendSurveyQuestion);
send.post("/calendar", snsIdCheck, sendCalendar);

// feed
send.post("/feed", snsIdCheck, sendFeed);

// 유저정보 보내기
send.get("/user", snsIdCheck, userInformation);

export default send;
