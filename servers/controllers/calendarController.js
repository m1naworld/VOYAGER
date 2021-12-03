import { calendar } from "../models/calendar";

export const addDailyAnswer = async (req, res) => {
  // snsId = cookies
  const dailyA = req.body;
  console.log(req.body);
  await calendar.register({ dailyA });
  console.log("success");
};
