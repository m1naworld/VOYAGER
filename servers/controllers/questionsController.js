import { dailyquestion } from "../models/dailyQuestion";
import { survey } from "../models/survey";

// dailyquestion 주관식 질문 DB저장 함수
export const dailyQuestionRegister = async (req, res) => {
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
};

// dailyquestion 주관식 프론트로 보내는 함수
export const sendDailyQeustion = async (req, res) => {
  try {
    const count = await dailyquestion.count();

    const fixedDay = new Date("2021-11-29").setHours(0, 0, 0, 0);

    const today = new Date();

    const label = parseInt(((today - fixedDay) / (1000 * 3600 * 24)) % count);

    const daily = await dailyquestion.findDailyQ({ label });
    console.log(daily);
    return res.status(200).json({ question: daily });
  } catch (error) {
    console.log("dailyQuestion Controller 오류");
    return res
      .status(400)
      .json({ success: false, message: "dailyQuestion Controller 오류" });
  }
};

// 객관식 문제 db저장
export const surveyRegister = async (req, res) => {
  try {
    const { happy, sad, joy, anger } = req.body;
    console.log(req.body);

    const result = await survey.register({ happy, sad, joy, anger });
    console.log(`결과: ${result}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }
};

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

export const sendSurveyQuestion = async (req, res) => {
  try {
    const id = "61b2e801c28e04f06cbd668a";
    const emotion = await survey.findById(id);
    console.log(emotion);
    const arr = emotion.emotions;
    console.log(arr);

    const question = [];
    const happy = [];
    const sad = [];
    const joy = [];
    const anger = [];

    // for(let a in arr){
    //   for (let j=0; j<3; j++){
    //   let random = getRandomInt(0, 90);
    //   let element = arr[a].data[random].qs;
    //   question.push(element);
    //   }
    // }

    for (let j = 0; j < 3; j++) {
      let random = getRandomInt(0, 90);
      let element = arr[0].data[random].qs;
      happy.push(element);
    }

    for (let j = 0; j < 3; j++) {
      let random = getRandomInt(0, 90);
      let element = arr[1].data[random].qs;
      sad.push(element);
    }

    for (let j = 0; j < 3; j++) {
      let random = getRandomInt(0, 90);
      let element = arr[2].data[random].qs;
      joy.push(element);
    }

    for (let j = 0; j < 3; j++) {
      let random = getRandomInt(0, 90);
      let element = arr[3].data[random].qs;
      anger.push(element);
    }
    // }
    return res
      .status(200)
      .json({ happy: happy, sad: sad, joy: joy, anger: anger });

    // console.log(question);
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "surveyController 오류" });
  }
};
