import { calendar } from "../models/calendar";
import { User } from "../models/User";
import jwt from "jsonwebtoken";

import moment from "moment";
require("moment-timezone");
const data = moment.tz.setDefault("Asia/Seoul");
// const date = moment().format("YYYY-MM-DD");
console.log(typeof data);
export const addMyDaily = async (req, res) => {
  const date = moment.tz.setDefault("Asia/Seoul");
  // const date = moment().format("YYYY-MM-DD");
  console.log(typeof date);

  const accesstoken = req.cookies.Authorization;
  const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
  console.log(decoded);
  const snsId = decoded.id;
  console.log(snsId);

  const a = await calendar.findUser({ snsId });
  const data = a.data;
  console.log(data);
  console.log(typeof data);
  // data.filter((m) => m.date === "2021-12-07");
  return res.send("success");
};
