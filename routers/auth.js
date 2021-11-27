import express from "express";
import jwt from "jsonwebtoken";
import { social } from "../servers/controllers/socialController";
import { refresh } from "../servers/models/refreshToken";
import { register } from "../servers/controllers/register";
import { emailCheck } from "../servers/controllers/emailCheak";

import passport from "passport";
import { jwtVerify } from "../servers/middle/jwtVerify";
import { tokenError } from "../servers/middle/jwtError";

const router = express.Router();

router.post("/join", register);

router.post("/login", async (req, res, next) => {
  passport.authenticate("login", async (err, user) => {
    console.log(user, req.body);
    try {
      if (err || !user) {
        const error = new Error(err);
        return next(error);
      }
      req.login(user, { session: false }, async (error) => {
        if (error) return next(error);
        const accessToken = jwt.sign(
          { id: user.snsId },
          process.env.JWT_SECRET,
          { expiresIn: "3h", issuer: "m1na" }
        );
        const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
          expiresIn: "3h",
          issuer: "m1na",
        });

        //중복저장 해결해야함
        const response = { accessToken, refreshToken };

        // const myquery = { snsId : user.snsId};
        // const newvalues = { $set: {refresh : refreshToken}};
        // const refresh = await localUser.findOneAndUpdate(myquery, newvalues, {returnOriginal:false}).setOptions({ runValidators: true }).exec() ;
        const newRefresh = await refresh.create({
          snsId: user.snsId,
          token: refreshToken,
        });
        // const refresh = await socialUser.findOneAndUpdate(myquery, newvalues, {returnOriginal:false}).setOptions({ runValidators: true }).exec() ;
        console.log(newRefresh);
        res.cookie("Authorization", accessToken);
        // res.cookie("Authorization", refreshToken);

        // const tokensave = new Rtoken({userid : user._id, token:response.rToken})
        // tokensave.save(
        // //     (err,doc)=> {
        // //     if (err) return res.json({success:false,err});
        // //     res.status(204).json({token:doc, success:true})
        // // }
        // )

        // console.log(tokenList);
        console.log(user);
        return res.status(200).json(response);
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

// router.get('/logout', (req, res) => {

//     // 쿠키를 지웁니다.
//     req.logout()

//     return res.clearCookie("user").json({ logoutSuccess: true });
// });

// router.get('/refresh',(req,res)=> {

//     // db에 있는 refresh 토큰 불러오기, req.cookies.user랑 대조, 유효시간 있고 정보 맞으면 액세스 발급.
//     // jwt.verify로 user.email 추출, db의 refresh token도 verify 후 유효시간, 정보 맞아떨어지면 액세스 발급,
//     // 만료된 access의 user_id랑, refresh의 user_id 랑 맞으면 액세스 발급
//     // token스키마에서 참조된 userid 도큐먼트중 값이 있다면 발급 -> 이거는 만료시간을 확인 못함
//     console.log(req.cookies.user)
//     console.log(response)
//     res.status(200).send("success")
// })
router.post("/check", emailCheck);

router.post("/access", social, async (req, res) => {
  try {
    const snsId = req.body.snsId;
    console.log(snsId);
    const accessToken = jwt.sign({ id: snsId }, process.env.JWT_SECRET, {
      expiresIn: "10000",
      issuer: "m1na",
    });
    const refreshToken = jwt.sign({}, process.env.JWT_SECRET, {
      expiresIn: "1000000",
      issuer: "m1na",
    });

    const token = { access_token: accessToken };
    console.log(token);

    const newRefresh = await refresh.saveRefresh({ snsId, refreshToken });
    console.log(newRefresh);
    console.log("refresh DB 저장 성공!");
    res.cookie("Authorization", accessToken, { httpOnly: true });
    res.cookie("reAuthorization", refreshToken, { httpOnly: true });
    return res.status(200).json({ accessToken, refreshToken });
  } catch (error) {
    console.log(error);
    return res.status(401).send("user를 찾을 수 없습니다.");
  }
});

router.get("/user", tokenError, jwtVerify);

// 미들웨어
router.get("/logout");

module.exports = router;
