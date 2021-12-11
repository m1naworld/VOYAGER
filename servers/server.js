import "./db";
import express from "express";
import router from "../routers/auth";
import register from "../routers/register";
import send from "../routers/send";
import remove from "../routers/remove";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 4000;

const api = express.Router();

const passportConfig = require("./config/passport");
app.use(passport.initialize());
passportConfig();

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("ok");
});
app.use("/api", api);
api.use("/auth", router);
api.use("/register", register);
api.use("/send", send);
api.use("/delete", remove);
api.get("/", (req, res) => {
  console.log(res.locals.page);
  res.send("success");
});

// 서버연결
app.listen(PORT, () => console.log(`Server is runngin on ${PORT}`));
