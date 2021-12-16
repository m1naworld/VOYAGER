import { mycalendar } from "../models/myCalendar";
import { mycolor } from "../models/myColor";
import { mydaily } from "../models/myDaily";
import { mydiary } from "../models/myDiary";
import { resultcolor } from "../models/colors";

// 랜덤함수
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// 객관식 질문 저장
export const myColor = async (req, res) => {
  try {
    const snsId = req.snsId;
    console.log(req.body);
    const date = req.body.date;

    const { happy, sad, joy, anger } = req.body;
    let x = 25 - happy * 7 + sad * 7;
    let y = 25 - anger * 7 + joy * 7;

    if (x <= 0) {
      x = 0;
    } else if (x >= 50) {
      x = 50;
    }

    if (y <= 0) {
      y = 0;
    } else if (y >= 50) {
      y = 50;
    }

    x = getRandomInt(x - 3, x + 4);
    y = getRandomInt(y - 3, y + 4);

    console.log(x, y);

    const position = [x, y];
    const mycolors = await resultcolor.findOne({ position });
    const color = mycolors.color;
    const exist = await mycolor.findOne({ snsId, "data.date": date });
    if (exist) {
      console.log("myColor 이미 있음");
      return res
        .status(400)
        .json({ success: false, message: "myColor 중복 저장 오류" });
    }
    const user = await mycolor.registerColor({ snsId, date, color });
    console.log(user);
    return res.status(200).json({ success: true, message: "myColor 등록" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "myColor DB 오류", error });
  }
};

// 주관식 질문 저장
export const myDaily = async (req, res) => {
  try {
    const snsId = req.snsId;
    const date = req.body.date;
    const { question, answer } = req.body;
    const exist = await mydaily.findOne({ snsId, "data.date": date });
    if (exist) {
      console.log("myDaily 이미 있음");
      return res
        .status(400)
        .json({ success: false, message: "myDaily 중복 저장 오류" });
    }
    await mydaily.registerDaily({
      snsId,
      date,
      question,
      answer,
    });
    return res
      .status(200)
      .json({ success: true, message: "myDaily 등록 성공" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "myDaily DB 오류" });
  }
};

// 다이어리 추가 및 수정
export const myDiary = async (req, res) => {
  try {
    const snsId = req.snsId;
    const date = req.body.date;
    console.log(date);
    const diary = req.body.diary;
    console.log(diary);
    const user = await mydiary.findOne({ snsId });
    console.log(user);
    const data = user.data;
    console.log(data);
    const idx = data.findIndex((m) => m.date === date);
    if (idx === -1) {
      const newPush = await mydiary.registerDiary({ snsId, date, diary });
      newPush.data.sort();
      newPush.save();
      return res
        .status(200)
        .json({ success: true, message: "myDiary 등록 성공" });
    }
    data[idx].diary = diary;
    user.data = data;
    user.save();
    return res
      .status(200)
      .json({ success: true, message: "myDiary 수정 성공" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "myDiary DB 오류", error });
  }
};

// 다이어리 삭제
export const deleteMyDiary = async (req, res) => {
  try {
    const snsId = req.snsId;
    const date = req.body.date;
    const user = await mydiary.findOne({ snsId });
    const data = user.data;
    console.log(data);
    const idx = data.findIndex((m) => m.date === date);
    console.log(idx);
    if (idx !== -1) {
      data.splice(idx, 1);
      user.data = data;
      console.log(user.data);
      user.save();
    }
    return res
      .status(200)
      .json({ success: true, message: "MyDiary 삭제 성공" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "MyDiary 삭제 실패" });
  }
};

// 캘린더 참조
export const addCalendar = async (snsId) => {
  try {
    // await mycolor.registerSnsId({ snsId });
    // await mydiary.registerSnsId({ snsId });
    // await mydaily.registerSnsId({ snsId });

    await mycolor.create({ snsId });
    await mydiary.create({ snsId });
    await mydaily.create({ snsId });

    let color = await mycolor.findOne({ snsId });
    let diary = await mydiary.findOne({ snsId });
    let daily = await mydaily.findOne({ snsId });

    color = color._id;
    diary = diary._id;
    daily = daily._id;

    await mycalendar.registerData({ snsId, color, diary, daily });
  } catch (error) {
    console.log(error);
  }
};
