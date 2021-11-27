import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { refresh } from "../models/refreshToken";

export const jwtVerify = async (req, res, next) => {
  console.log(req.cookies);
  const accesstoken = req.cookies.Authorization;
  const refreshtoken = req.cookies.reAuthorization;
  console.log(`accesstoken: ${accesstoken}`);
  console.log(`refreshtoken: ${refreshtoken}`);

  const refreshed = await refresh.findByRefresh(refreshtoken);
  console.log(refreshed);
  const refreshToken = refreshed.refreshToken;
  console.log(refreshToken);
  jwt.verify(accesstoken, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      //   console.log("token decode 실패");
      if (refreshtoken === refreshToken) {
        const accessToken = jwt.sign(
          { id: refreshed.snsId },
          process.env.JWT_SECRET,
          { expiresIn: "10000", issuer: "m1na" }
        );
        console.log(accessToken);
        console.log("access 재발급");
        res.cookie("Authorization", accessToken);
        return res.status(200).send("access 재발급");
      }
      console.log("logout");
      return res.status(401).send("logout");
    }
    console.log(decoded);
    User.findOne({ snsId: decoded.id }, (error, user) => {
      if (error) {
        console.log("db 오류 ");
        return res.status(402).json({ error: "db에서 찾는 도중 오류 발생" });
      }
      if (!user) {
        console.log("유저 없음");
        return res
          .status(404)
          .json({ isAuth: false, error: "token에 해당하는 유저가 없음" });
      }
      if (user) {
        console.log(decoded);
        // 다음에 사용할 수 있도록 req 객체에 token과 user를 넣어준다
        console.log("인증 성공");

        return res.status(200).json({ isAuth: true });
        // req.token = accesstoken;
        // req.user = user;
      }
      next();
    });
  });
};

// export const jwtVerify = (req, res, next) => {

//       const accesstoken = req.cookies.Authorization;
//       console.log(accesstoken);

//       if(accesstoken === undefined) throw Error("API 사용 권한이 없음");

// }
