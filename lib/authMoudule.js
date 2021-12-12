import jwt from "jsonwebtoken";

import { refresh } from "../servers/models/refreshToken";
export async function jwtToken(res, snsId, issuer) {
  try {
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
    res.cookie("Authorization", accessToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 3),
    });
    res.cookie("reAuthorization", refreshToken, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    });
    return res.status(200).json({ accessToken, refreshToken });
  } catch (err) {
    console.log(err);
    return "ERROR";
  }
}
