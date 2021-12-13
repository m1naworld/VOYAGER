import express from "express";

import {
  myColor,
  myDiary,
  myDaily,
} from "../servers/controllers/myDataController";
import { snsIdCheck } from "../servers/middle/Check";
import {
  changeImage,
  changeNickname,
} from "../servers/controllers/userModifyController";
import multer from "multer";

const register = express.Router();
const upload = multer({ dest: "uploads/", limits: 1024 * 1024 });

register.use(snsIdCheck);
// user data 추가
register.post("/addDaily", myDaily);
register.post("/addDiary", myDiary);
register.post("/addColor", myColor);

// user 회원 정보 수정
register.post("/user/modify", changeNickname);

register.post("/userImg", upload.single("image"), changeImage);

export default register;
