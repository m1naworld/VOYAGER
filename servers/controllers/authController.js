import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

// DB
import { refresh } from "../models/refreshToken";
import { User } from "../models/User";

const issuer = "m1na";

// Local 회원 가입
export const postJoin = async (req, res) => {
  // req의 body 정보를 사용하려면 server.js에서 따로 설정을 해줘야함
  let { email, password, name, birth, birthyear, phone } = req.body;
  const provider = "local";
  const snsId = email;
  try {
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    password = await bcrypt.hash(password, salt);

    // user에 name, email, password 등 값 할당
    let users = new User({
      provider,
      snsId,
      email,
      password,
      name,
      birth,
      birthyear,
      phone,
      confirmation: false,
    });
    console.log(users);
    await users.save(); // db에 user 저장
    res
      .status(200)
      .json({ success: true, message: "VOYAGER의 가족이 된 것을 환영합니다!" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

// Local 로그인
export const postLogin = async (req, res, next) => {
  passport.authenticate("login", async (err, user, msg) => {
    console.log(user, err, msg);
    try {
      if (err || !user) {
        // const error = new Error(err);
        console.log("회원가입이 안된 유저");
        return res.status(400).json(msg);
      }
      if (!user.confirmation) {
        console.log(msg);
        console.log("이메일 인증 안된 유저");
        return res.status(202).json(msg);
      }
      req.login(user, { session: false }, async (error) => {
        const snsId = user.snsId;
        if (error) return next(error);
        const accessToken = jwt.sign({ id: snsId }, process.env.JWT_SECRET, {
          expiresIn: process.env.ACCESS_EXPIRE,
          issuer,
        });
        const refreshjwt = jwt.sign({}, process.env.JWT_SECRET, {
          expiresIn: process.env.REFRESH_EXPIRE,
          issuer,
        });

        const existRefresh = await refresh.findOne({ snsId });
        if (existRefresh) {
          await refresh.deleteOne({ snsId });
          console.log("refreshDB snsId 중복 제거");
        }
        await refresh.create({ snsId, refreshjwt });
        console.log("refresh DB 저장 성공!");
        res.cookie("Authorization", accessToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
        });
        res.cookie("reAuthorization", refreshjwt, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
        });
        return res.status(204).json({ success: true, message: "로그인 성공!" });
      });
    } catch (error) {
      console.log(error);
      return next(error);
    }
  })(req, res, next);
};

// 소셜 로그인
export const postSocialLogin = async (req, res) => {
  try {
    const user = req.user;
    const snsId = req.body.snsId;
    const accessToken = jwt.sign({ id: snsId }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_EXPIRE,
      issuer,
    });
    const refreshjwt = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: process.env.REFRESH_EXPIRE,
      issuer,
    });
    console.log(accessToken, refreshjwt);
    const existRefresh = await refresh.findOne({ snsId });
    if (existRefresh) {
      await refresh.deleteOne({ snsId });
      console.log("refreshDB snsId 중복 제거");
    }
    await refresh.create({ snsId, refreshjwt });
    console.log("refresh DB 저장 성공!");
    res.cookie("Authorization", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
    });
    res.cookie("reAuthorization", refreshjwt, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    });
    return res
      .status(200)
      .json({ user, success: true, message: "토큰 발급 성공" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "user를 찾을 수 없습니다.", error });
  }
};

// 로그아웃
export const logOut = async (req, res) => {
  try {
    const snsId = req.snsId;
    res.clearCookie("Authorization");
    res.clearCookie("reAuthorization");

    const refreshed = await refresh.findOne({ snsId });
    if (refreshed) {
      await refresh.deleteOne({ snsId });
    }
    return res.status(200).json({ success: true, message: "로그아웃" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "로그아웃 실패", error });
  }
};

// 이메일 찾기
export const findEmail = async (req, res) => {
  try {
    console.log(req.body);
    let { name, birthday, phone } = req.body;
    birthday = birthday.split("-");
    const birthyear = birthday[0];
    const birth = birthday[1] + birthday[2];
    const user = await User.findOne({ phone });
    let email = user.email;
    email = email.split("@");
    let secret = email[0];
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "저장되지 않은 휴대폰 번호 입니다." });
    } else if (
      user.name === name &&
      user.birth === birth &&
      user.birthyear === birthyear
    ) {
      secret = secret.split("");
      secret.splice(-4, 4, "****");
      secret = secret.join("");
      email = secret + "@" + email[1];
      console.log(email);
      return res.status(200).json({ success: true, message: email });
    }
    return res
      .status(400)
      .json({ success: false, message: "정보를 다시 입력해주세요." });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "다시 시도해주세요.", error });
  }
};

// 비밀번호 변경
export const changePassword = async (req, res) => {
  try {
    console.log(req.body);
    let { _id, password } = req.body;
    const user = await User.findOne({ _id });
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    password = await bcrypt.hash(password, salt);
    user.password = password;
    user.save();
    return res
      .status(200)
      .json({ success: true, message: "비밀번호 변경 성공!" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "password 변경 실패", error });
  }
};
