import { User } from "../models/User";

export const social = async (req, res, done) => {
  try {
    let { provider, snsId, email, name, gender, age, birth, birthyear, phone } =
      req.body;
    console.log(req.body);
    if (!email) {
      const user = await User.findOne({ snsId });
      console.log(user);
      if (user) {
        req.user = user;
        console.log(`onlySnsIdUser: ${user}`);
        return done(null, user, {
          success: true,
          message: "로그인 성공",
        });
      }
    }
    if (email) {
      const user = await User.findOne({ email });
      if (user) {
        console.log(user);
        if (user.snsId !== snsId) {
          return res.status(400).json({
            success: false,
            message: `${email}은 ${user.provider}로 이미 가입된 회원입니다.`,
          });
        }
        req.user = user;
        console.log(`emailUser: ${user}`);
        return done(null, user, { success: true, message: "로그인 성공" });
      }
    }

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
      confirmation: true,
    });
    console.log(`newUser: ${newUser}`);
    req.user = newUser;
    return done(null, newUser, { success: true, message: "회원가입 성공" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "소셜 로그인 실패", error });
  }
};
