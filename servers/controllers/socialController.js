import { User } from "../models/User";
import { calendar } from "../models/calendar";
export const social = async (req, res, done) => {
  try {
    let { provider, snsId, email, name, gender, age, birth, birthyear, phone } =
      req.body;
    // email이 있을 경우
    if (email !== undefined) {
      // 이메일이 중복되면 안되므로 email을 통해 user를 찾음
      const emailUser = await User.findByEmail({ email });
      if (emailUser) {
        // kakao와 naver 이메일 겹치지 않도록
        if (provider === emailUser.provider) {
          console.log(`emailUser: ${emailUser}`);
          return done(null, emailUser);
        }
        console.log("이미 있는 아이디입니다.");
        return res.send("이미 있는 아이디입니다."); // 중복확인
      }

      const newCalendar = await calendar.registerSnsId({ snsId });
      console.log(`new ${newCalendar}`);

      const checkCalendar = await calendar.findUser({ snsId });
      console.log(`new ${checkCalendar}`);

      const userCalendar = checkCalendar._id;
      console.log(userCalendar);

      const newUser = await User.join({
        provider,
        snsId,
        email,
        nickname: name,
        name,
        gender,
        age,
        birth,
        birthyear,
        phone,
        userCalendar,
      });
      console.log(`newUser: ${newUser}`);
      return done(null, newUser);
    }
    // 이메일이 없을 경우
    else if (email === undefined) {
      const onlySnsIdUser = await User.findBySnsId({ snsId });
      if (onlySnsIdUser) {
        console.log(`onlySnsIdUser: ${onlySnsIdUser}`);
        return done(null, onlySnsIdUser);
      }
      const newCalendar = await calendar.registerSnsId({ snsId });
      console.log(`new ${newCalendar}`);

      const checkCalendar = await calendar.findUser({ snsId });
      console.log(`new ${checkCalendar}`);

      const userCalendar = checkCalendar._id;

      const newUser = await User.join({
        provider,
        snsId,
        email,
        nickname: name,
        name,
        gender,
        age,
        birth,
        birthyear,
        phone,
        userCalendar,
      });
      console.log(`newUser: ${newUser}`);
      // const newCalendar = await calendar.registerSnsId({ snsId });
      // console.log(`new ${newCalendar}`);
      return done(null, newUser);
    }
  } catch (error) {
    console.log(error);
    return done(error);
  }
};

// MongoServerError:일때 회원가입되어있습니다.
