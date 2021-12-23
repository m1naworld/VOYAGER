import { mycolor } from "../models/myColor";
import { mydaily } from "../models/myDaily";
import { mydiary } from "../models/myDiary";
import { resultcolor } from "../models/colors";
import moment from "moment";
import { feed } from "../models/feed";
import { User } from "../models/User";

// 날짜
require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

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
    const date = moment().format("YYYY-MM-DD");

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
    const exist = await mycolor.findOne({ snsId, date });
    if (exist) {
      console.log("myColor 이미 있음");
      return res
        .status(400)
        .json({ success: false, message: "myColor 중복 저장 오류" });
    }
    const data = await mycolor.create({ snsId, date, color });
    console.log(data);
    return res
      .status(200)
      .json({ data, success: true, message: "myColor 등록" });
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
    console.log(req.body);
    const date = moment().format("YYYY-MM-DD");
    const { question, answer } = req.body;
    const user = await User.findOne({ snsId });
    const exist = await mydaily.findOne({ snsId, date });
    if (exist) {
      console.log("myDaily 이미 있음");
      return res
        .status(400)
        .json({ success: false, message: "myDaily 중복 저장 오류" });
    }
    const data = await mydaily.create({
      snsId,
      date,
      question,
      answer,
    });

    for (let i in answer) {
      await feed.create({
        date,
        nickname: user.nickname,
        img: user.img,
        answer: answer[i],
      });
    }
    return res
      .status(200)
      .json({ data, success: true, message: "myDaily 등록 성공" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "myDaily DB 오류" });
  }
};

// 다이어리 추가 및 수정
export const myDiary = async (req, res) => {
  try {
    const snsId = req.snsId;
    console.log(req.body);
    const date = req.body.date;
    const diary = req.body.diary;
    const data = await mydiary.findOneAndUpdate(
      { snsId, date },
      { snsId, date, diary },
      { new: true, upsert: true }
    );
    return res
      .status(200)
      .json({ data, success: true, message: "myDiary 등록 성공" });
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
    await mydiary.findOneAndDelete({ snsId, date });
    return res
      .status(200)
      .json({ success: true, message: "MyDiary 삭제 성공" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "MyDiary 삭제 실패" });
  }
};
