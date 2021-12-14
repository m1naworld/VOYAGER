import express from "express";

// controller
import {
  myColor,
  myDiary,
  myDaily,
  deleteMyDiary,
} from "../servers/controllers/dataCalendarController";
import {
  changeImage,
  changeNickname,
  dropOut,
} from "../servers/controllers/dataUserController";
// middle
import { snsIdCheck } from "../servers/middle/snsIdCheck";

import multer from "multer";

const upload = multer({ dest: "uploads/", limits: 1024 * 1024 });
const data = express.Router();

data.use(snsIdCheck);

// calendar
data.post("/addDaily", myDaily);
data.post("/addDiary", myDiary);
data.post("/addColor", myColor);

// diary 삭제
data.post("/delete/myDiary", deleteMyDiary);

// 닉네임 수정
data.post("/user/modify", changeNickname);

// 이미지 변경
data.post("/userImg", upload.single("image"), changeImage);

// 회원 탈퇴
data.post("/user/dropout", dropOut);

export default data;
