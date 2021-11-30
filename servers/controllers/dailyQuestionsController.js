import { datas } from "../models/dailyQuestion";

export const addDaily = async (req, res) => {
  // const data = req.body.data[0];
  // console.log(data);
  let i = 0;
  while (i < 70) {
    const data = req.body.data[i];
    await datas.create({ datas: [data] });
    i += 0;
  }
  console.log("success");
  return res.status(200).json({ success: true });
};
