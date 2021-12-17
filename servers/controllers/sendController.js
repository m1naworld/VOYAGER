import { dailyquestion } from "../models/dailyQuestion";
import { survey } from "../models/survey";
import { User } from "../models/User";

// 유저 정보 보내기
export const userInformation = async (req, res) => {
  try {
    const snsId = req.snsId;
    const user = await User.findOne({ snsId });
    return res.status(200).json({ success: true, user });
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

    const fixedDay = new Date("2021-11-29").setHours(0, 0, 0, 0);

    const today = new Date();

    const label = parseInt(((today - fixedDay) / (1000 * 3600 * 24)) % count);

    const daily = await dailyquestion.findDailyQ({ label });

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
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

// 객관식 프론트로 보내는 함수
export const sendSurveyQuestion = async (req, res) => {
  try {
    const id = "61b2e801c28e04f06cbd668a";
    const emotion = await survey.findById(id);
    const arr = emotion.emotions;

    const question = [];
    let k = 1;
    for (let a in arr) {
      let num;
      for (let j = 0; j < 3; j++) {
        let random = getRandomInt(0, 90);
        if (random === num) {
          --j;
          continue;
        }
        let element = arr[a].data[random].qs;
        num = random;
        question.push({ label: k, qs: element });
        k += 1;
      }
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
    const date = req.body.date;
    const snsId = req.snsId;

    const user = await User.findBySnsId({ snsId }).populate("userCalendar");
    const userCalendar = await user.userCalendar.populate("color");
    await user.userCalendar.populate("daily");
    await user.userCalendar.populate("diary");
    await userCalendar.daily.populate("data.question");

    let diary = userCalendar.diary.data;
    let color = userCalendar.color.data;
    let daily = userCalendar.daily.data;

    let mycalendar = [];
    let mydate = [];

    for (let i in diary) {
      let data = diary[i];
      if (data.date.substring(0, 7) === date.substring(0, 7)) {
        mycalendar.push(data);
        mydate.push(data.date);
      }
    }

    for (let i in color) {
      let data = color[i];
      if (data.date.substring(0, 7) === date.substring(0, 7)) {
        mycalendar.push(data);
        mydate.push(data.date);
      }
    }

    for (let i in daily) {
      let data = daily[i];
      console.log(data);
      console.log(data.date);
      if (data.date.substring(0, 7) === date.substring(0, 7)) {
        let value = {
          date: data.date,
          question: data.question.data,
          answer: data.answer,
        };
        console.log(value.question[0]);
        mycalendar.push(value);
        mydate.push(data.date);
      }
    }

    let sendcalendar = [];
    const set = new Set(mydate);
    mydate = [...set];

    // 날짜별로 정렬
    mycalendar = mycalendar.sort();

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
    return res
      .status(400)
      .json({ success: false, message: "sendCalendar 실패", error });
  }
};
