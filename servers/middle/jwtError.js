import { refresh } from "../models/refreshToken";

export const tokenError = async (req, res, next) => {
  const accesstoken = req.cookies.Authorization;
  const refreshtoken = req.cookies.reAuthorization;
  if (!accesstoken || !refreshtoken) {
    return res.status(419).json({ error: "Token does not exist in cookie" });
  }
  const refreshed = await refresh.findByRefresh({ refreshtoken });
  if (refreshed === null) {
    return res.status(419).json({ error: "Token does not exist in DB" });
  }
  next();
};
