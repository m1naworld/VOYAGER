import express from "express";
import { addDaily } from "../servers/controllers/dailyQuestionsController";
import { addCalendar } from "../servers/controllers/myCalendarController";
import { myDiary } from "../servers/controllers/myDiaryController";
import { myDaily } from "../servers/controllers/myDailyController";
import { myColor } from "../servers/controllers/myColorController";
const register = express.Router();

// 주관직 질문 스키마
register.post("/dailyQuestion", addDaily);

register.post("/addDaily", myDaily);
register.post("/addDiary", myDiary);
register.post("/addColor", myColor);

register.get("/addCalendar", addCalendar);
module.exports = register;
