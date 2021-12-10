import express from "express";
import {
  sendDailyQeustion,
  sendSurveyQuestion,
} from "../servers/controllers/questionsController";
import { sendCalendar } from "../servers/controllers/myCalendarController";
import { snsIdCheck } from "../servers/controllers/Cheak";

const send = express.Router();

send.get("/dailyQuestion", sendDailyQeustion);
send.get("/surveyQuestion", sendSurveyQuestion);
send.get("/calendar", snsIdCheck, sendCalendar);

module.exports = send;
