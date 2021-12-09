import { User } from "../models/User";
import jwt from "jsonwebtoken";

export const emailCheck = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  console.log(email);
  try {
    const exUser = await User.findOne({
      email,
    });

    if (exUser) {
      console.log(exUser);
      return res
        .status(400)
        .json({ error: "이메일이 중복되었습니다", check: false });
    }
    return res.status(200).json({ check: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
};

export const snsIdCheck = (req, res, next) => {
  try {
    const accesstoken = req.cookies.Authorization;
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
    req.snsId = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({ inAuth: false, message: "snsIdCheck 실패" });
  }
};
