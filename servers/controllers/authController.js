import passport from "passport";
import jwt from "jsonwebtoken";
import { refresh } from "../models/refreshToken";

const issuer = "m1na";

export const postLogin = async (req, res, next) => {
  passport.authenticate("login", async (err, user, msg) => {
    console.log(user, err, msg);
    try {
      if (err || !user) {
        // const error = new Error(err);
        console.log("회원가입이 안된 유저");
        return res.status(400).json(msg);
      }
      req.login(user, { session: false }, async (error) => {
        const snsId = user.snsId;
        if (error) return next(error);
        const accessToken = jwt.sign({ id: snsId }, process.env.JWT_SECRET, {
          expiresIn: process.env.ACCESS_EXPIRE,
          issuer,
        });
        const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
          expiresIn: process.env.REFRESH_EXPIRE,
          issuer,
        });

        const existRefresh = await refresh.findBysnsId({ snsId });
        if (existRefresh) {
          await refresh.deleteSnsId({ snsId });
          console.log("refreshDB snsId 중복 제거");
        }
        await refresh.saveRefresh({ snsId, refreshToken });
        console.log("refresh DB 저장 성공!");

        res.cookie("Authorization", accessToken, { httpOnly: true });
        res.cookie("reAuthorization", refreshToken, { httpOnly: true });

        return res.status(200).json({ accessToken, refreshToken });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
};

export const postSocialLogin = async (req, res) => {
  try {
    console.log(req.body);
    const snsId = req.body.snsId;
    const accessToken = jwt.sign({ id: snsId }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_EXPIRE,
      issuer,
    });
    const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_EXPIRE,
      issuer,
    });

    const existRefresh = await refresh.findBysnsId({ snsId });
    if (existRefresh) {
      await refresh.deleteSnsId({ snsId });
      console.log("refreshDB snsId 중복 제거");
    }
    await refresh.saveRefresh({ snsId, refreshToken });
    console.log("refresh DB 저장 성공!");

    res.cookie("Authorization", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
    });
    res.cookie("reAuthorization", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    });

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res
      .status(401)
      .json({ inAuth: false, error: "user를 찾을 수 없습니다." });
  }
};
