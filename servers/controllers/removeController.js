import { User } from "../models/User";
import { mycalendar } from "../models/myCalendar";
import { mycolor } from "../models/myColor";
import { mydiary } from "../models/myDiary";
import { mydaily } from "../models/myDaily";
import { refresh } from "../models/refreshToken";
import fs from "fs";

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
    return res
      .status(200)
      .json({ success: true, message: "MyDiary 삭제 성공" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: "MyDiary 삭제 실패" });
  }
};

export const dropOut = async (req, res) => {
  try {
    const snsId = req.snsId;
    console.log(snsId);
    const message = req.body.message;
    const MSG =
      "그동안의 제 흔적을 지우고 지구로 돌아가겠습니다. VOYAGER 안녕.";
    if (message === MSG) {
      res.clearCookie("Authorization");
      res.clearCookie("reAuthorization");
      const user = await User.findOneAndDelete({ snsId });
      console.log(user.img);
      if (user.img !== process.env.IMG) {
        fs.unlink(user.img, function (error) {
          if (error) {
            console.log(error);
            return res
              .status(400)
              .json({ success: false, message: "IMG Delete 실패 ", error });
          }
        });
      }
      await mydiary.findOneAndDelete({ snsId });
      await mydaily.findOneAndDelete({ snsId });
      await mycolor.findOneAndDelete({ snsId });
      await mycalendar.findOneAndDelete({ snsId });
      await refresh.findOneAndDelete({ snsId });
      console.log("탈퇴 성공 ㅠㅠ");
      return res.status(200).json({ success: true, message: " 회원탈퇴ㅠㅠ" });
    }
    return res
      .status(400)
      .status.json({ success: false, message: "회원탈퇴 실패 " });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "회원탈퇴 실패", error });
  }
};
