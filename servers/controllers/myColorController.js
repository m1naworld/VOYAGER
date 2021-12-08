import { mycolor } from "../models/myColor";
import jwt from "jsonwebtoken";

export const myColor = async (req, res) => {
  try {
    const accesstoken = req.cookies.Authorization;
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
    const snsId = decoded.id;
    console.log(snsId);
    console.log(req.body);
    const date = new Date(req.body.date);
    const color = req.body.color;
    await mycolor.registerColor({ snsId, date, color });
    return res.status(200).json({ register: true, message: "myColor 등록" });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "myColor 오류" });
  }
};
