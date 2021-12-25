import { dailyquestion } from "../models/dailyQuestion";
import { survey } from "../models/survey";
import { resultcolor } from "../models/colors";
import dailyQuestion from "../../Json/dailyQuestion.json";
import emotions from "../../Json/emotions.json";
import data from "../../Json/colors.json";

// dailyquestion 주관식 질문 DB저장 함수
export const dailyQuestionRegister = async (req, res) => {
  try {
    const datas = dailyQuestion;
    let i = 0;
    while (i < datas.length) {
      const label = datas[i].label;
      const data = datas[i].data;
      await dailyquestion.create({ label, data });
      i += 1;
      console.log(`${i} 성공`);
    }
    return res
      .status(200)
      .json({ success: true, message: "주관식 DB 저장 성공" });
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

// development
export const surveyRegister = async (req, res) => {
  try {
    const { happy, sad, joy, anger } = emotions;
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

// development
export const colorRegister = async (req, res) => {
  try {
    console.log("ON");
    for (let i = 0; i < data.colors.length; i++) {
      let colors = data.colors[i];
      let position = colors.position;
      let color = colors.color;
      await resultcolor.create({ position, color });
    }
    return res
      .status(200)
      .json({ success: true, message: "color DB 저장 성공" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "color DB 저장 실패" });
  }
};
