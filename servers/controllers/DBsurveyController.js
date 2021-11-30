import { survey } from "../models/survey";

export const surveyRegister = async (req, res) => {
  try {
    let { happy, sad, joy, anger } = JSON.stringify(req.body);
    console.log(happy);

    const result = await survey.register({ happy, sad, joy, anger });
    console.log(`결과: ${result}`);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false });
  }
};
