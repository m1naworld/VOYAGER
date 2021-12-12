import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { refresh } from "../models/refreshToken";

export const jwtVerify = async (req, res) => {
  try {
    const accesstoken = req.cookies.Authorization;
    const refreshjwt = req.cookies.reAuthorization;
    console.log({ accesstoken: accesstoken });
    console.log({ refreshtoken: refreshjwt });
    // DB에 저장된 refresh 가져오기
    const refreshed = await refresh.findByRefresh({ refreshjwt });
    let refreshToken = refreshed.refreshToken;
    console.log({ dbRefresh: refreshToken });

    // access 유효성 검사
    jwt.verify(accesstoken, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        jwt.verify(
          refreshjwt,
          process.env.JWT_REFRESH_SECRET,
          (error, decoded) => {
            if (error) {
              console.log("로그아웃");
              return res
                .status(400)
                .json({ success: false, message: " 토큰 존재 안함. 로그아웃" });
              // return res.redirect("/auth/logout"); >> 용현님한테 보내달라할것
            } // refresh 유효할 때
            else if (decoded) {
              if (refreshjwt === refreshToken) {
                const accessToken = jwt.sign(
                  { id: refreshToken.snsId },
                  process.env.JWT_SECRET,
                  { expiresIn: process.env.ACCESS_EXPIRE, issuer: "m1na" }
                );
                console.log(`new accessToken : ${accessToken}`);
                res.cookie("Authorization", accessToken, {
                  httpOnly: true,
                  expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
                });
                console.log("access 재갱신 성공");
                return res
                  .status(200)
                  .json({ success: true, message: "access 재갱신 성공" });
              }
              console.log("refreshtoken 일치 안함");
              return res.status(401).json({
                success: false,
                error: "refreshtokend이 일치하지 않습니다.",
              });
            }
          }
        );
      } else {
        console.log(decoded);
        let snsId = decoded.id;
        console.log(snsId);
        const user = await User.findBySnsId({ snsId });
        console.log(user);
        if (user) {
          jwt.verify(
            refreshjwt,
            process.env.JWT_REFRESH_SECRET,
            async (error, decoded) => {
              console.log(decoded);
              if (error) {
                await refresh.deleteRefresh({ refreshjwt });
                refreshToken = jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
                  expiresIn: process.env.NEW_REFRESH_EXPIRE,
                  issuer: "m1na",
                });
                console.log(refreshToken);
                await refresh.saveRefresh({ snsId, refreshToken });
                res.cookie("reAuthorization", refreshToken, {
                  httpOnly: true,
                  expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                });
                console.log("refresh 갱신 성공 ");
                return res
                  .status(200)
                  .json({ success: true, message: "refresh 갱신 성공" });
              }
              console.log("access refresh 둘다 유효함");
              return res
                .status(200)
                .json({ success: true, message: "assess refresh 둘다 유효함" });
            }
          );
        }
        if (!user) {
          console.log("유저 없음");
          return res
            .status(404)
            .json({ success: false, message: "token에 해당하는 유저가 없음" });
          // .redirect("/auth/logout");
        }
        if (error) {
          console.log("db 오류 ");
          return res
            .status(402)
            .json({ success: false, message: "db에서 찾는 도중 오류 발생" });
        }
      }
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "jwtVerify Error", error });
  }
};
