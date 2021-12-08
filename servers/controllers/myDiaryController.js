import jwt from "jsonwebtoken";
import { mydiary } from "../models/myDiary";

export const myDiary = async (req, res) => {
  try {
    const accesstoken = req.cookies.Authorization;
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
    const snsId = decoded.id;
    console.log(snsId);
    console.log(req.body);
    const date = new Date(req.body.date);
    const diary = req.body.diary;

    // await mydiary.find({ snsId }).sort();
    const user = await mydiary.findOne({ snsId });
    const data = user.data;
    console.log(data);
    const idx = data.findIndex((m) => m.date.getTime() === date.getTime());
    console.log(idx);
    if (idx === -1) {
      await mydiary.registerDiary({ snsId, date, diary });
      //   return res.status(200).json({ register: true, message: "myDiary 등록" });
    } else {
      data[idx].diary = diary;
    }
    data.sort();
    user.data = data;
    user.save();
    return res
      .status(200)
      .json({ register: true, message: "myDiary 등록 성공" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "myDiary 오류" });
  }
};
