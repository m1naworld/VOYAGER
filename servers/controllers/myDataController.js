import { mycolor } from "../models/myColor";
import { mydaily } from "../models/myDaily";
import { mydiary } from "../models/myDiary";

export const myColor = async (req, res) => {
  try {
    const snsId = req.snsId;
    console.log(req.body);
    const date = new Date(req.body.date);
    const color = req.body.color;
    await mycolor.registerColor({ snsId, date, color });
    return res.status(200).json({ register: true, message: "myColor 등록" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "myColor 오류" });
  }
};

export const myDaily = async (req, res) => {
  try {
    const snsId = req.snsId;

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
      const newPush = await mydaily.registerDaily({
        snsId,
        date,
        question,
        answer,
      });
      newPush.data.sort();
      newPush.save();
      return res.status(200).json({ message: "myDaily 등록 성공" });
    }
    data[idx].answer = answer;
    user.data = data;
    user.save();
    return res.status(200).json({ message: "myDaily 수정 성공" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "myDaily 오류" });
  }
};

export const myDiary = async (req, res) => {
  try {
    const snsId = req.snsId;
    const date = new Date(req.body.date);
    const diary = req.body.diary;

    const user = await mydiary.findOne({ snsId });
    const data = user.data;
    console.log(data);
    const idx = data.findIndex((m) => m.date.getTime() === date.getTime());
    console.log(idx);
    if (idx === -1) {
      const newPush = await mydiary.registerDiary({ snsId, date, diary });
      newPush.data.sort();
      newPush.save();
      return res
        .status(200)
        .json({ register: true, message: "myDiary 등록 성공" });
    }
    data[idx].diary = diary;
    user.data = data;
    user.save();
    return res
      .status(200)
      .json({ register: true, message: "myDiary 수정 성공" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "myDiary 오류" });
  }
};
