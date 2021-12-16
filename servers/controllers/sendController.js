import { dailyquestion } from "../models/dailyQuestion";
import { mydiary } from "../models/myDiary";
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
    const snsId = req.snsId;
    const user = await User.findBySnsId({ snsId }).populate("userCalendar");
    // const date = new Date("2022-01-01");
    const userCalendar = await user.userCalendar.populate("color");
    await user.userCalendar.populate("daily");
    await user.userCalendar.populate("diary");
    await userCalendar.daily.populate("data.question");
    console.log(userCalendar);
    return res.status(200).json({ success: true, calendar: userCalendar });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "sendCalendar 실패", error });
  }
};

export const sendDiary = async (req, res) => {
  try {
    const snsId = req.snsId;
    const date = req.body.date;

    const userDiary = await mydiary.find(
      {
        snsId,
      },
      { data: [{ date: { $in: [date, ["2021-12-12"]] } }] }
    );
    console.log(userDiary[0].data);
    // const result = userDiary.data.filter(
    //   (m) => new Date(m.date) >= new Date(date)
    // );
    // console.log(result);
    return res.status(200).json({ userDiary, success: true });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "sendDiary 실패", error });
  }
};
