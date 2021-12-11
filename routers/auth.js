import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { join, logOut } from "../servers/controllers/loginController";
import { emailCheck } from "../servers/middle/Cheak";
import { social } from "../servers/controllers/socialController";
import { jwtVerify } from "../servers/middle/jwtVerify";
import { refresh } from "../servers/models/refreshToken";
import { tokenError } from "../servers/middle/jwtError";
import { userCheck } from "../servers/middle/Cheak";
import { findEmail } from "../servers/controllers/userModifyController";
const router = express.Router();

// 회원가입
router.post("/join", join);

// 로컬 로그인
router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user, msg) => {
    console.log(user, err, msg);
    try {
      if (err || !user) {
        // const error = new Error(err);
        console.log("회원가입이 안된 유저");
        return res.status(400).json(msg);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const accessToken = jwt.sign(
          { id: user.snsId },
          process.env.JWT_SECRET,
          {
            expiresIn: process.env.ACCESS_EXPIRE,
            issuer: "m1na",
          }
        );
        const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
          expiresIn: process.env.REFRESH_EXPIRE,
          issuer: "m1na",
        });

        const token = { access_token: accessToken };
        console.log(token);

        const snsId = user.snsId;
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
});

// 소셜 로그인 토큰 발급
router.post("/access", social, async (req, res) => {
  try {
    console.log(req.body);
    const snsId = req.body.snsId;
    const accessToken = jwt.sign({ id: snsId }, process.env.JWT_SECRET, {
      expiresIn: process.env.ACCESS_EXPIRE,
      issuer: "m1na",
    });
    const refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
      expiresIn: process.env.REFRESH_EXPIRE,
      issuer: "m1na",
    });

    const token = { access_token: accessToken };
    console.log(token);

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
});

// 토큰 검증
router.get("/user", tokenError, jwtVerify);

// 비밀번호 변경시 userCheck
router.get("/userCheck", userCheck);

// 로그아웃
router.get("/logout", logOut);

// 이메일 중복 체크
router.post("/check", emailCheck);

router.post("/findEmail", findEmail);

module.exports = router;
