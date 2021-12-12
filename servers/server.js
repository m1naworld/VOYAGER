import "./db";
import express from "express";
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors";
import api from "../routers/api";

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

app.use("/uploads", express.static("uploads"));
app.use("/api", api);

// 서버연결
app.listen(PORT, () => console.log(`Server is runngin on ${PORT}`));
