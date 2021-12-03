import express from "express";
import { surveyRegister } from "../servers/controllers/DBsurveyController";
import { addDaily } from "../servers/controllers/dailyQuestionsController";
import { addDailyAnswer } from "../servers/controllers/calendarController";
const register = express.Router();

// routers
//   .route("/survey")
//   .get((req, res) => res.send("ok"))
//   .post(surveyRegister);
// routers.post("/survey", surveyRegister);

register.post("/dailyquestion", addDaily);
register.get("/", (req, res) => {
  return res.json("success: 성공!");
});

register.post("/addCalendar", addDailyAnswer);

module.exports = register;
