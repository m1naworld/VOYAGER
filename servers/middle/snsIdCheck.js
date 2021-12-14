import jwt from "jsonwebtoken";

export const snsIdCheck = (req, res, next) => {
  try {
    const accesstoken = req.cookies.Authorization;
    const decoded = jwt.verify(accesstoken, process.env.JWT_SECRET);
    req.snsId = decoded.id;
    req.snsId !== undefined
      ? next()
      : res.status(400).json({ success: false, message: "snsIdCheck 실패" });
  } catch (error) {
    return res
      .status(400)
      .json({ success: false, message: "snsIdCheck 실패", error });
  }
};
