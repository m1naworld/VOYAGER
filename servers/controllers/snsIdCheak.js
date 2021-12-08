import jwt from "jsonwebtoken";

export const snsIdCheak = (req, res, next) => {
  try {
    const accesstoken = req.cookies.Authorization;
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
    const snsId = decoded.id;
    next();
  } catch (error) {
    return res.status(400).json({ inAuth: false, message: "snsIdCheak 불가" });
  }
};
