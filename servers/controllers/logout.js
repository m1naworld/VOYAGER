import { refresh } from "../models/refreshToken";

export const logOut = async (req, res) => {
  try {
    const accesstoken = req.cookies.Authorization;
    const refreshtoken = req.cookies.reAuthorization;
    console.log({ accessToken: accesstoken });
    console.log({ refreshToken: refreshtoken });
    res.clearCookie("Authorization");
    res.clearCookie("reAuthorization");

    const refreshed = await refresh.findByRefresh({ refreshtoken });
    console.log(refreshed);
    if (refreshed) {
      await refresh.deleteRefresh({ refreshtoken });
    }
    return res.status(401).json({ inAuth: false, message: "LogOut" });
  } catch (error) {
    console.log(error);
  }
};
