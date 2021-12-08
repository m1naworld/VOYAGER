import { mydaily } from "../models/myDaily";
import jwt from "jsonwebtoken";

export const myDaily = async (req, res) => {
  try {
    const accesstoken = req.cookies.Authorization;
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
    const snsId = decoded.id;
    console.log(snsId);
    console.log(req.body);
    const date = new Date(req.body.date);
    const question = req.body.question;
    const answer = req.body.answer;

    const user = await mydaily.findOne({ snsId });
    const data = user.data;
    console.log(data);
    const idx = data.findIndex((m) => m.date.getTime() === date.getTime());
    console.log(idx);
    if (idx === -1) {
      const a = await mydaily.registerDaily({ snsId, date, question, answer });
      console.log(a);
    } else {
      data[idx].answer = answer;
    }
    data.sort();
    user.data = data;
    user.save();

    return res.status(200);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "myDaily 오류" });
  }
};
