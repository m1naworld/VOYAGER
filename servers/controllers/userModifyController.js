import { User } from "../models/User";

export const userInformation = async (req, res) => {
  try {
    const snsId = req.snsId;
    const user = await User.findOne({ snsId });
    return res.status(200).json({ user });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "유저 정보 실패 " });
  }
};

export const changeNickname = async (req, res) => {
  try {
    const snsId = req.snsId;
    const nickname = req.body.nickname;
    const user = await User.modify({ snsId, nickname });
    console.log(user);
    return res
      .status(200)
      .json({ modify: true, message: "유저 정보 수정 성공" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ modify: false, message: "nickname 변경 실패" });
  }
};
