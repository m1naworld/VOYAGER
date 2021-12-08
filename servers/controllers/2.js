import { calendar } from "../models/calendar";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import moment from "moment";
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");
let date = moment().format("YYYY-MM-DD");

export const addCalendar = async (req, res) => {
  // date = "21-12-05";
  console.log(date);
  const accesstoken = req.cookies.Authorization;
  const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
  console.log(decoded);
  const snsId = decoded.id;
  console.log(snsId);
  console.log("========================");
  const data = req.body;
  console.log(`req.body확인: ${data}`);
  const question = req.body.question;
  const answer = req.body.answer;
  const daily = { question, answer };
  console.log(daily);
  await calendar.registerDaily({ snsId, question, answer });
  const me = await calendar.findOne({ snsId });
  console.log(me);
  await me.data.push({ daily: { question, answer } });
  me.save();

  console.log(me);
  // const c = await calendar.addDiary(snsId, question, answer);
  // console.log(c);
  // const a = await calendar.registerDaily({ snsId, date, question, answer });
  // const b = await calendar.registerDaily({ snsId, date });
  // console.log(date);
  // console.log(a);

  // console.log(b);
  // const c = await User.findBySnsId({ snsId }).populate("userCalendar");
  // const d = c.userCalendar.data.daily;
  // const f = await d.populate("question");
  // console.log(c.userCalendar.data.daily);
  // console.log(f.question.data);

  // const datas = {
  //   question: f.question.data,
  //   answer: c.userCalendar.data.daily.answer,
  // };

  return res.status(200).json({ success: "yes" });
};

export const addDiary = async (req, res) => {
  const accesstoken = req.cookies.Authorization;
  const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
  console.log(decoded);
  const snsId = decoded.id;
  console.log(snsId);
  const diary = req.body.diary;
  console.log(diary);
  const me = await calendar.findOne({ snsId });
  console.log(me.data);
  console.log(me.data.date);
  await me.data.push({ diary });
  me.save();
  // const zz = await calendar.registerDiary({ snsId, date, diary });
  // console.log(zz);

  // console.log(zz.data.daily.qu`estion);
  // console.log(zz.data.daily.question);
  // console.log(zz.data.diary);
};
