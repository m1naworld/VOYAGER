import express from "express";
import router from "./auth";
import data from "./data";
import confirm from "./confirm";
import send from "./send";
import update from "./update";
const api = express.Router();

api.use("/auth", router);
api.use("/data", data);
api.use("/confirm", confirm);
api.use("/send", send);
api.use("/update", update);
export default api;
