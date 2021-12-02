import express from "express";
import { findDaily } from "../servers/controllers/dailyQuestionsController";

const send = express.Router();

send.get("/dailyQ", findDaily);

module.exports = send;
