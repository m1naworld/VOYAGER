import { dailyquestion } from "../models/dailyQuestion";
import { survey } from "../models/survey";

// dailyquestion 주관식 질문 DB저장 함수
export const dailyQuestionRegister = async (req, res) => {
  try {
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
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

// dailyquestion 주관식 프론트로 보내는 함수
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

// 객관식 문제 db저장
export const surveyRegister = async (req, res) => {
  try {
    const { happy, sad, joy, anger } = req.body;
    const result = await survey.register({ happy, sad, joy, anger });
    console.log(`결과: ${result}`);
    return res
      .status(200)
      .json({ success: true, message: "객관식 DB 저장 성공" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "객관식 DB 저장 실패" });
  }
};

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
