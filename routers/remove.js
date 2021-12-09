import express from "express";
import { snsIdCheck } from "../servers/controllers/Cheak";
import {
  deleteMyDiary,
  deleteMyDaily,
} from "../servers/controllers/removeController";

const remove = express.Router();
// 회원탈퇴시 라우터 추가예정
remove.post("/myDiary", snsIdCheck, deleteMyDiary);

module.exports = remove;
