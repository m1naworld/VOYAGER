import express from "express";
import { snsIdCheck } from "../servers/controllers/Cheak";
import {
  deleteMyDiary,
  deleteMyDaily,
} from "../servers/controllers/removeController";

const remove = express.Router();

remove.post("/myDiary", snsIdCheck, deleteMyDiary);
remove.post("/myDaily", snsIdCheck, deleteMyDaily);

module.exports = remove;
