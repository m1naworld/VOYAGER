import express from "express";
import { findDaily } from "../servers/controllers/dailyQuestionsController";
import { sendCalendar } from "../servers/controllers/myCalendarController";
import { snsIdCheck } from "../servers/controllers/Cheak";

const send = express.Router();

send.get("/dailyQ", findDaily);

send.get("/calendar", snsIdCheck, sendCalendar);

module.exports = send;
