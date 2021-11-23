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

app.use('/auth', router) // 민아
app.use('/add',add_router)

//passport.js 사용
// const passport = require('passport');


// app.use('/auth', routes); //경덕


// import {emotion} from './models/emotion';

// import {jwtMiddleware} from '../servers/controllers/jwtsignin'

// app.get('/api/users/auth', jwtMiddleware, async(req, res) => {
//     res.status(200).json({
//         isAuth:true
//         // id: req.cookies.user
//     })
// } )
// 서버연결
app.listen(PORT, () => console.log(`Server is runngin on ${PORT}`))
