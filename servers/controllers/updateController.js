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
