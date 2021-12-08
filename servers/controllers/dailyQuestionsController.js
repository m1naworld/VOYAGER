import { dailyquestion } from "../models/dailyQuestion";

// dailyquestion 주관식 질문 DB저장 함수
export const addDaily = async (req, res) => {
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
export const findDaily = async (req, res) => {
  try {
    const count = await dailyquestion.count();

    const fixedDay = new Date("2021-11-29");
    fixedDay.setHours(0, 0, 0, 0);

    const today = new Date();

    const label = parseInt(((today - fixedDay) / (1000 * 3600 * 24)) % count);

    const daily = await dailyquestion.findDailyQ({ label });
    console.log(daily);
    return res.status(200).json({ question: daily });
  } catch (error) {
    console.log("dailyQuestion Controller 오류");
    return res.status(400).send("dailyQuestion Controller 오류");
  }
};