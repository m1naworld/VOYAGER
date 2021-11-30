import "./db";
import express from "express";
import router from "../routers/auth";
import routers from "../routers/register";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = 4000;

const passportConfig = require("./config/passport");
app.use(passport.initialize());
passportConfig();

app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use("/auth", router);
app.use("/register", routers);

app.get("/", (req, res) => {
  res.send("success");
});

// 서버연결
app.listen(PORT, () => console.log(`Server is runngin on ${PORT}`));
