import { User } from "../models/User";
import { mycalendar } from "../models/myCalendar";
import { addCalendar } from "./myDataController";

export const social = async (req, res, done) => {
  try {
    let { provider, snsId, email, name, gender, age, birth, birthyear, phone } =
      req.body;
    // email이 없을 경우
    console.log(email);
    if (email === undefined) {
      const onlySnsIdUser = await User.findBySnsId({ snsId });
      console.log(onlySnsIdUser);
      if (onlySnsIdUser) {
        console.log(`onlySnsIdUser: ${onlySnsIdUser}`);
        return done(null, onlySnsIdUser, { message: "로그인 성공" });
      }
    } else {
      const emailUser = await User.findByEmail({ email });
      console.log(emailUser);
      if (emailUser) {
        // kakao와 naver 이메일 겹치지 않도록
        console.log(`emailUser: ${emailUser}`);
        return done(null, emailUser, { message: "로그인 성공" });
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
    });
    console.log(`newUser: ${newUser}`);
    return done(null, newUser, { message: "회원가입 성공" });
  } catch (error) {
    console.log(error);
    return done(error);
  }
};
