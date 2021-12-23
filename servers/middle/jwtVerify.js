import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { refresh } from "../models/refreshToken";

export const jwtVerify = async (req, res) => {
  // 쿠키에서 access refresh 토큰 가져오기
  try {
    const accesstoken = req.cookies.Authorization;
    const refreshtoken = req.cookies.reAuthorization;
    console.log({ accesstoken: accesstoken });
    console.log({ refreshtoken: refreshtoken });

    // DB에 저장된 refresh 가져오기
    const refreshed = await refresh.findOne({ refreshtoken });
    console.log({ refreshed: refreshed });
    let refreshjwt = refreshed.refreshjwt;
    console.log({ dbRefresh: refreshjwt });

    // access 유효성 검사
    jwt.verify(accesstoken, process.env.JWT_SECRET, async (error, decoded) => {
      if (error) {
        jwt.verify(
          refreshtoken,
          process.env.JWT_REFRESH_SECRET,
          async (error, decoded) => {
            if (error) {
              console.log("로그아웃");
              res.status(404).json({ success: false });
            } // refresh 유효할 때
            if (decoded) {
              if (refreshtoken === refreshjwt) {
                const accessToken = jwt.sign(
                  { id: refreshjwt.snsId },
                  process.env.JWT_SECRET,
                  { expiresIn: "6h", issuer: "m1na" }
                );
                let snsId = refreshjwt.snsId;
                let user = await User.findOne({ snsId });
                console.log(`new accessToken : ${accessToken}`);
                res.cookie("Authorization", accessToken, {
                  httpOnly: true,
                  expires: new Date(Date.now() + 1000 * 60 * 60 * 6),
                });
                console.log("access 재갱신 성공");
                return res
                  .status(200)
                  .json({ user, success: true, message: "access 재갱신 성공" });
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
        const user = await User.findOne({ snsId });
        console.log(user);
        if (user) {
          jwt.verify(
            refreshtoken,
            process.env.JWT_REFRESH_SECRET,
            async (error, decoded) => {
              console.log(decoded);
              if (error) {
                await refresh.deleteOne({ refreshjwt: refreshtoken });
                refreshjwt = jwt.sign({}, process.env.JWT_REFRESH_SECRET, {
                  expiresIn: "1h",
                  issuer: "m1na",
                });
                console.log(refreshjwt);
                await refresh.create({ snsId, refreshjwt });
                res.cookie("reAuthorization", refreshjwt, {
                  httpOnly: true,
                  expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                });
                console.log("refresh 갱신 성공 ");
                return res
                  .status(200)
                  .json({ user, success: true, message: "refresh 갱신 성공" });
              }
              console.log("access refresh 둘다 유효함");
              return res.status(200).json({ user, success: true });
            }
          );
        }
        if (!user) {
          console.log("유저 없음");
          return res
            .status(404)
            .json({ success: false, error: "token에 해당하는 유저가 없음" });
          // .redirect("/auth/logout");
        }
        if (error) {
          console.log("db 오류 ");
          return res
            .status(402)
            .json({ success: false, error: "db에서 찾는 도중 오류 발생" });
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
};
