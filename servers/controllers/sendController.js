import { dailyquestion } from "../models/dailyQuestion";
import { mycolor } from "../models/myColor";
import { mydaily } from "../models/myDaily";
import { mydiary } from "../models/myDiary";
import { survey } from "../models/survey";
import { User } from "../models/User";
import { feed } from "../models/feed";
import moment from "moment";

require("moment-timezone");
moment.tz.setDefault("Asia/Seoul");

// 유저 정보 보내기
export const userInformation = async (req, res) => {
  try {
    const today = moment().format("YYYY-MM-DD");
    console.log(today);
    const snsId = req.snsId;
    const user = await User.findOne({ snsId });
    const daily = await mydaily.findOne({ snsId, date: today });
    const color = await mycolor.findOne({ snsId, date: today });
    return res.status(200).json({ success: true, user, color, daily });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "유저 정보 찾기 실패", error });
  }
};

// 주관식 프론트로 보내는 함수
export const sendDailyQeustion = async (req, res) => {
  try {
    const count = await dailyquestion.count();

    const fixedDay = new Date("2021-12-23").setHours(0, 0, 0, 0);

    let today = moment().format("YYYY-MM-DD");

    today = new Date(today).setHours(0, 0, 0, 0);

    const label = parseInt(((today - fixedDay) / (1000 * 3600 * 24)) % count);

    const daily = await dailyquestion.findOne({ label });
    return res.status(200).json({ success: true, question: daily });
  } catch (error) {
    console.log("dailyQuestion Controller 오류");
    return res.status(400).json({
      success: false,
      message: "dailyQuestion Controller 오류",
      error,
    });
  }
};

// 랜덤 함수
function getRandomInt(min, max) {
  min = Math.floor(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 객관식 프론트로 보내는 함수
export const sendSurveyQuestion = async (req, res) => {
  try {
    const emotion = await survey.find({});
    const arr = emotion[0].emotions;
    // console.log(arr);
    const question = [];
    let k = 1;
    let numberArray = [];
    for (let a in arr) {
      let num;
      for (let j = 0; j < 3; j++) {
        let random = getRandomInt(0, 89);
        if (numberArray.includes(random)) {
          --j;
          continue;
        }
        let element = arr[a].data[random].qs;
        num = random;
        numberArray.push(num);
        question.push({ label: k, qs: element });
        k += 1;
      }
      numberArray = [];
    }
    return res.status(200).json({ success: true, question });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "surveyController 오류", error });
  }
};

// 캘린더 보내기
export const sendCalendar = async (req, res) => {
  try {
    const snsId = req.snsId;
    const date = req.body.date;
    const startDate = date.substring(0, 7) + "-01";
    const endDate = date.substring(0, 7) + "-31";

    const color = await mycolor.find({
      snsId,
      date: { $gte: startDate, $lte: endDate },
    });
    const daily = await mydaily
      .find({ snsId, date: { $gte: startDate, $lte: endDate } })
      .populate("question");

    const diary = await mydiary.find({
      snsId,
      date: { $gte: startDate, $lte: endDate },
    });
    console.log(daily);
    console.log(color);

    let mycalendar = [];
    let mydate = [];

    for (let i in diary) {
      let data = diary[i];
      mycalendar.push(data);
      mydate.push(data.date);
    }

    for (let i in color) {
      let data = color[i];
      mycalendar.push(data);
      mydate.push(data.date);
    }

    for (let i in daily) {
      let data = daily[i];
      console.log(data);
      console.log(data.date);
      let value = {
        date: data.date,
        question: data.question.data,
        answer: data.answer,
      };
      mycalendar.push(value);
      mydate.push(data.date);
    }

    let sendcalendar = [];
    const set = new Set(mydate);
    mydate = [...set];

    // 날짜별로 정렬
    mydate = mydate.sort();

    // 날짜별로 모으기
    for (let i in mydate) {
      let value = {};
      value.date = mydate[i];
      for (let j in mycalendar) {
        let data = mycalendar[j];
        if (mydate[i] === data.date) {
          if (data.color) {
            value.color = data.color;
          } else if (data.diary) {
            value.diary = data.diary;
          } else if (data.question) {
            value.question = data.question;
            value.answer = data.answer;
          }
        }
      }
      sendcalendar.push(value);
    }
    console.log(sendcalendar);
    return res.status(200).json({ success: true, sendcalendar });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};

// send feed
export const sendFeed = async (req, res) => {
  try {
    const snsId = req.snsId;
    console.log(snsId);
    const today = moment().format("YYYY-MM-DD");
    const onefeed = await feed
      .find({ date: today, "answer.index": 0 })
      .sort({ likeCount: -1 });
    const twofeed = await feed
      .find({ date: today, "answer.index": 1 })
      .sort({ likeCount: -1 });
    const threefeed = await feed
      .find({ date: today, "answer.index": 2 })
      .sort({ likeCount: -1 });

    for (let i in onefeed) {
      let post = onefeed[i].user.includes(snsId);
      onefeed[i].status = post;
    }
    for (let i in twofeed) {
      let post = twofeed[i].user.includes(snsId);
      twofeed[i].status = post;
    }

    for (let i in threefeed) {
      let post = threefeed[i].user.includes(snsId);
      threefeed[i].status = post;
    }

    const sendfeed = [onefeed, twofeed, threefeed];
    console.log(onefeed);
    return res.status(200).json({ success: true, sendfeed });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};

// admin
export const admin = async (req, res) => {
  try {
    const user = await User.count();
    const page = await feed.count();
    return res.status(200).json({ success: true, user, page });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};
