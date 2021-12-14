import { User } from "../models/User";
import { mycalendar } from "../models/myCalendar";
import { mycolor } from "../models/myColor";
import { mydiary } from "../models/myDiary";
import { mydaily } from "../models/myDaily";
import { refresh } from "../models/refreshToken";

import bcrypt from "bcrypt";
import fs from "fs";

export const changeNickname = async (req, res) => {
  try {
    const snsId = req.snsId;
    const nickname = req.body.nickname;
    const user = await User.findOne({ snsId });
    user.nickname = nickname;
    user.save();

    return res.status(200).json({ success: true, nickname });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "nickname 변경 실패", error });
  }
};

export const changePassword = async (req, res) => {
  try {
    console.log(req.body);
    let { _id, password } = req.body;
    // let password = req.body.password;
    const user = await User.findOne({ _id });
    console.log(user);
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    password = await bcrypt.hash(password, salt);
    user.password = password;
    user.save();
    return res
      .status(200)
      .json({ success: true, message: "비밀번호 변경 성공!" });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "password 변경 실패", error });
  }
};

// 프로필 사진 변경
export const changeImage = async (req, res) => {
  try {
    const snsId = req.snsId;
    // console.log(req);
    console.log(req.blob);
    console.log("====================================");
    console.log(req.file);
    const img = req.file.path;
    console.log("=====================================");
    console.log(img);
    const user = await User.findOne({ snsId });
    if (user.img !== process.env.IMG) {
      fs.unlink(user.img, function (error) {
        if (error) {
          console.log(error);
          return res
            .status(400)
            .json({ success: false, message: "IMG Upload 실패 " });
        }
      });
    }
    user.img = img;
    user.save();
    return res.status(200).json({ success: true, img });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "image 변경 실패 ", error });
  }
};

// 회원 탈퇴
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
      return res
        .status(200)
        .json({ success: true, message: " 지구로 돌아가도 잘지내세요. " });
    }
    return res.status(400).status.json({
      success: false,
      message: "message 불일치. 회원탈퇴 실패 ",
    });
  } catch (error) {
    console.log(error);
    return res
      .status(400)
      .json({ success: false, message: "회원탈퇴 실패", error });
  }
};
