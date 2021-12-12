import express from "express";
import {
  sendDailyQeustion,
  sendSurveyQuestion,
} from "../servers/controllers/questionsController";
import { sendCalendar } from "../servers/controllers/myDataController";
import { snsIdCheck } from "../servers/middle/Check";
import { userInformation } from "../servers/controllers/userModifyController";

const send = express.Router();

send.get("/dailyQuestion", sendDailyQeustion);
send.get("/surveyQuestion", sendSurveyQuestion);
send.get("/calendar", snsIdCheck, sendCalendar);
send.get("/user", snsIdCheck, userInformation);

export default send;
