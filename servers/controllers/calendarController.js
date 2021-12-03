import { calendar } from "../models/calendar";
import jwt from "jsonwebtoken";

export const addDailyAnswer = async (req, res) => {
  const accesstoken = req.cookies.Authorization;
  const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
  console.log(decoded);
  const snsId = decoded.id;
  console.log(snsId);

  // const sns = await calendar.findUser({ snsId });
  // const dailyA = req.body;
  // await user.register({ dailyA });

  const dailyA = req.body;
  // console.log(req.body);
  // const a = await calendar.registerData({ snsId, dailyA });
  // console.log(a);
  console.log("success");
};
