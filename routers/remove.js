import express from "express";
import { snsIdCheck } from "../servers/controllers/Cheak";
import {
  deleteMyDiary,
  dropOut,
} from "../servers/controllers/removeController";

const remove = express.Router();

remove.post("/myDiary", snsIdCheck, deleteMyDiary);

remove.get("/user", snsIdCheck, dropOut);

module.exports = remove;
