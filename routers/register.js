import express from "express";
import { surveyRegister } from "../servers/controllers/DBsurveyController";
import { addDaily } from "../servers/controllers/dailyQuestionsController";

const routers = express.Router();

// routers
//   .route("/survey")
//   .get((req, res) => res.send("ok"))
//   .post(surveyRegister);
// routers.post("/survey", surveyRegister);

routers.post("/dailyquestion", addDaily);
routers.route("/");
routers.get("/", (req, res) => {
  return res.json("success: 성공!");
});

module.exports = routers;
