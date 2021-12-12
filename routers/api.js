import express from "express";
import router from "./auth";
import register from "./register";
import send from "./send";
import remove from "./remove";
import update from "./update";

const api = express.Router();

api.use("/auth", router);
api.use("/register", register);
api.use("/send", send);
api.use("/delete", remove);
api.use("/update", update);
export default api;
