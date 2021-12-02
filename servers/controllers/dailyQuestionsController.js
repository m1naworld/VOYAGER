import { typeFromAST } from "graphql";
import { dailyquestion } from "../models/dailyQuestion";

export const addDaily = async (req, res) => {
  const datas = req.body[0].label;
  console.log(datas);
  let i = 0;
  while (i < 70) {
    const label = req.body[i].label;
    const data = req.body[i].data;
    await dailyquestion.create({ label, data });
    i += 1;
    console.log(`${i} 성공`);
  }
  return res.status(200).json({ success: true });
};

export const findDaily = async (req, res) => {
  const count = await dailyquestion.count();
  console.log(count);

  const fixedDay = new Date("2021-12-1");
  fixedDay.setHours(0, 0, 0, 0);
  console.log(fixedDay);

  const today = new Date();
  console.log(today);

  const label = parseInt(((today - fixedDay) / (1000 * 3600 * 24)) % count);
  console.log(label);
  const daily = await dailyquestion.findDailyQ({ label });

  // console.log(daily);
  return res.status(200).json({ data: daily.data });
};
