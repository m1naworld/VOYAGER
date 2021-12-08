import { mydiary } from "../models/myDiary";
import jwt from "jsonwebtoken";
import moment from "moment";
import { addMyDaily } from "./calendarController";

// require("moment-timezone");
// moment.tz.setDefault("Asia/Seoul");

// let date = moment().format("YYYY-MM-DD");

export const myDiary = async (req, res) => {
  const accesstoken = req.cookies.Authorization;
  const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
  console.log(decoded);
  const snsId = decoded.id;
  console.log(snsId);
  //   await mydiary.registerSnsId({ snsId });
  // console.log(a)
  const date = new Date(req.body.date);
  const diary = req.body.diary;
  console.log(diary);

  const zz = await mydiary.registerDiary({ snsId, date, diary });
  console.log(zz);
  return res.end();
};

export const aa = async (req, res) => {
  const accesstoken = req.cookies.Authorization;
  const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
  console.log(decoded);
  const snsId = decoded.id;
  console.log(snsId);

  const a = await mydiary.findOne({ snsId });

  const data = [a.data];
  const idx = data.findIndex((m) => m.date === "2021-12-20");
  if (idx === -1) {
  }
  console.log(idx);
  data[idx].diary = "aaaaa";
  data.sort((a, b) => {
    const day1 = new Date(a);
    const day2 = new Date(b);
    return day1 > day2 ? -1 : day1 < day2 ? 1 : 0;
  });
  a.data = data;
  a.save();

  //   //   console.dir(da);
  //   const date = "2021-12-13";
  //   const diary = "바뀜1231231231232132";
  //   const result = data.map((m) => {
  //     if (m.date === date) {
  //       m.diary = diary;
  //     }
  //     return m;
  //   });

  //   const p = await mydiary.registerDiary({ snsId, result });
  //   console.log(p);

  //   const c = await mydiary.modifyDiary({ snsId, date, data, diary });
  //   console.log(c);
  //   const qs = da.map((m) =>
  //     m.date === "2021-12-07" ? { diary: "Bye", ...m } : m
  //   );
  //   a.data.forEach((m) => {
  //     if (m.date === "2021-12-07") {
  //       m.diary = "Bye";
  //     }
  //   });
  //   console.log(qs);
  return res.send(a);
};
