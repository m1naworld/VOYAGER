import "./db"
import express from "express";
import router from "../routers/auth";
import add_router from "../routers/add_router"
import morgan from "morgan";
import passport from "passport";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();
const dotenv = require('dotenv').config();
const PORT = 3000;

// 간편로그인 구현 
// import {passportKakao, passportNaver} from './controllers/socialPassport'

// passportKakao(app);
// passportNaver(app);
const passportConfig = require("../config/passport")
app.use(passport.initialize());
passportConfig();

app.use(cors({origin : true, credentials:true}))
app.use(express.urlencoded({ extended: false}));
app.use(express.json({ extended : false} ));
app.use(morgan('dev'));
app.use(cookieParser(process.env.COOKIE_SECRET));

app.use('/BDBED56AB94C1CDF3880049215E077FF/auth', router) // 민아
app.use('/add',add_router)

//passport.js 사용
// const passport = require('passport');


// app.use('/auth', routes); //경덕


// 서버연결
app.listen(PORT, () => console.log(`Server is runngin on ${PORT}`))
