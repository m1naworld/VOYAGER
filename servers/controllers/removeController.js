import { User } from "../models/User";
import { mycalendar } from "../models/myCalendar";
import { mycolor } from "../models/myColor";
import { mydiary } from "../models/myDiary";
import { mydaily } from "../models/myDaily";
import { refresh } from "../models/refreshToken";

export const deleteMyDiary = async (req, res) => {
  try {
    const snsId = req.snsId;
    const date = new Date(req.body.date);

    const user = await mydiary.findOne({ snsId });
    const data = user.data;
    console.log(data);
    const idx = data.findIndex((m) => m.date.getTime() === date.getTime());
    console.log(idx);
    if (idx !== -1) {
      data.splice(idx, 1);
      user.data = data;
      console.log(user.data);
      user.save();
    }
    return res.status(200).json({ delete: true, message: "MyDiary 삭제 성공" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ delete: false, message: "MyDiary 삭제 실패" });
  }
};

export const dropOut = async (req, res) => {
  try {
    const snsId = req.snsId;
    console.log(snsId);
    if (snsId !== undefined) {
      await mydiary.findOneAndDelete({ snsId });
      await mydaily.findOneAndDelete({ snsId });
      await mycolor.findOneAndDelete({ snsId });
      await mycalendar.findOneAndDelete({ snsId });
      await User.findOneAndDelete({ snsId });
      await refresh.findOneAndDelete({ snsId });
      console.log("탈퇴 성공 ㅠㅠ");
      return res
        .status(200)
        .json({ delete: true, message: " 회원탈퇴 성공ㅠㅠ" });
    }
    return res
      .status(400)
      .json({ delete: false, message: "토큰없어서 회원탈퇴 실패" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ delete: false, message: "error로 회원탈퇴 실패" });
  }
};
