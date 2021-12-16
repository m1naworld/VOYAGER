import { User } from "../models/User";
import { mycalendar } from "../models/myCalendar";
import { addCalendar } from "../controllers/dataCalendarController";

export const social = async (req, res, done) => {
  try {
    let { snsId, email, name, gender, age, birth, birthyear, phone } = req.body;
    const provider = "social";
    // email이 없을 경우
    console.log(email);
    if (email === undefined) {
      const onlySnsIdUser = await User.findBySnsId({ snsId });
      if (onlySnsIdUser) {
        req.user = onlySnsIdUser;
        console.log(`onlySnsIdUser: ${onlySnsIdUser}`);
        return done(null, onlySnsIdUser, {
          success: true,
          message: "로그인 성공",
        });
      }
    } else {
      const emailUser = await User.findOne({ email });
      if (emailUser) {
        req.user = emailUser;
        console.log(`emailUser: ${emailUser}`);
        return done(null, emailUser, { success: true, message: "로그인 성공" });
      }
    }

    await mycalendar.registerSnsId({ snsId });
    const checkCalendar = await mycalendar.findOne({ snsId });

    addCalendar(snsId);

    console.log(`new ${checkCalendar}`);
    const userCalendar = checkCalendar._id;

    const newUser = await User.join({
      provider,
      snsId,
      email,
      name,
      gender,
      age,
      birth,
      birthyear,
      phone,
      userCalendar,
      confirmation: true,
    });
    console.log(`newUser: ${newUser}`);
    req.user = newUser;
    return done(null, newUser, { success: true, message: "회원가입 성공" });
  } catch (error) {
    console.log(error);
    return done(error, { success: false, message: "소셜 로그인 실패" });
    // return res
    //   .status(400)
    //   .json({ success: false, message: "소셜 로그인 실패", error });
  }
};
