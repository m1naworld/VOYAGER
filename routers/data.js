import express from "express";
import CloudinaryStorage from "multer-storage-cloudinary";
import cloudinary from "cloudinary";

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
import { pushLike } from "../servers/controllers/dataFeedController";

// middle
import { snsIdCheck } from "../servers/middle/snsIdCheck";

import multer from "multer";

const cloud = cloudinary.v2;
cloud.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloud,
  params: {
    folder: "profiles",
  },
});

const upload = multer({ storage: storage });

const data = express.Router();

data.use(snsIdCheck);

// calendar
data.post("/addDaily", myDaily);
data.post("/addDiary", myDiary);
data.post("/addColor", myColor);

// feed
data.post("/likeFeed", pushLike);

// diary 삭제
data.post("/delete/myDiary", deleteMyDiary);

// 닉네임 수정
data.post("/user/modify", changeNickname);

// 이미지 변경
data.post("/userImg", upload.single("image"), changeImage);

// 회원 탈퇴
data.post("/user/dropout", dropOut);

export default data;
