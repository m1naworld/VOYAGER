import express from "express";
import { snsIdCheck } from "../servers/middle/Cheak";
import {
  deleteMyDiary,
  dropOut,
} from "../servers/controllers/removeController";

const remove = express.Router();

remove.use(snsIdCheck);
remove.post("/myDiary", deleteMyDiary);

remove.get("/user", dropOut);

export default remove;
