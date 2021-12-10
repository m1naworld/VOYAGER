import express from "express";
import { snsIdCheck } from "../servers/middle/Cheak";
import {
  deleteMyDiary,
  dropOut,
} from "../servers/controllers/removeController";

const remove = express.Router();

remove.post("/myDiary", snsIdCheck, deleteMyDiary);

remove.get("/user", snsIdCheck, dropOut);

module.exports = remove;
