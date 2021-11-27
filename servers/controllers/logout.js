import { jwt } from "jsonwebtoken";
import { refresh } from "../models/refreshToken";

export const logOut = (req, res) => {
  const accesstoken = req.cookies.Authorization;
  const refreshtoken = req.cookies.reAuthorization;

  jwt.verify(accesstoken);
  if (accesstoken || refreshtoken) res.clearCookie("Authorization");
  res.clearCookie("reAuthorization");
};
