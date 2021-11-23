import express from 'express';
import jwt from 'jsonwebtoken';
import userontroller, { kakao } from '../servers/controllers/userController';
//경덕
import { jwtMiddleware } from '../servers/middle/jwtmiddle';
import { localUser } from '../servers/models/userSchema';
import { Rtoken } from '../servers/models/tokenSchema';
import { response } from 'express';
const {register} = require("../servers/controllers/register");


const passport = require('passport')
const router = express.Router()

router.post('/join', register);

router.post('/login', async(req, res, next) => {
    passport.authenticate('login', async(err, user) => {
        console.log(user, req.body)
        try {
            if (err || !user) {
                const error = new Error(err)
                return next(error);
            }
            req.login(user, { session: false }, async(error) => {
                if (error) return next(error)
                const body = { _id: user._id };            
                const token = jwt.sign({ user: body }, process.env.JWT_SECRET,{expiresIn:10});   
                const rToken = jwt.sign({ user: body }, 'r_Key',{expiresIn:300});


                //중복저장 해결해야함
                const response = { token , rToken};
                res.cookie('Authorization',token)
                const tokensave = new Rtoken({userid : user._id, token:response.rToken})
                tokensave.save(
                //     (err,doc)=> {
                //     if (err) return res.json({success:false,err});
                //     res.status(204).json({token:doc, success:true})
                // }
                )

                // console.log(tokenList);
                console.log(user)
                return res.status(200).json(response);
            });
        } catch (error) {
            return next(error);
        }
    })(req, res, next);
});

router.get('/user', jwtMiddleware, (req, res) => {
    res.status(200).json({
        message: 'You made it to the secure route',
        user: req.cookies['user'],
        token: req.cookies['user']
    })
});
router.get('/logout', (req, res) => {

    // 쿠키를 지웁니다.
    req.logout()

    return res.clearCookie("user").json({ logoutSuccess: true });
});


router.get('/refresh',(req,res)=> {
    // db에 있는 refresh 토큰 불러오기, req.cookies.user랑 대조, 유효시간 있고 정보 맞으면 액세스 발급.
    // jwt.verify로 user.email 추출, db의 refresh token도 verify 후 유효시간, 정보 맞아떨어지면 액세스 발급,
    // 만료된 access의 user_id랑, refresh의 user_id 랑 맞으면 액세스 발급
    // token스키마에서 참조된 userid 도큐먼트중 값이 있다면 발급 -> 이거는 만료시간을 확인 못함 
    console.log(req.cookies.user)
    console.log(response)
    res.status(200).send("success")
})

router.post('/kakaoo', kakao, async (req, res, error) => {
    try {
        const user = req.body
        console.log(user)
        const accessToken = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: '1d', issuer: 'm1na'})
        const refreshToken = jwt.sign({ _id: user._id}, process.env.JWT_SECRET, { expiresIn: '14d', issuer: 'm1na'})
        const token = {access_token : accessToken}
        console.log(token)
        res.cookie('Authorization', accessToken)
        res.status(200).json({accessToken, refreshToken})
    }catch(error){
        console.log(error)
        res.status(401).send("user를 찾을 수 없습니다.")
    }
})


router.get('/login/naver', passport.authenticate('naver'));
router.get('/naver', passport.authenticate('naver', {
    failureRedirect : '/login',
    session: false}),
    async (req, res, error) => {
        try {
            const user = req.user
            console.log(user)
            const accessToken = jwt.sign({ id: user.snsId}, process.env.JWT_SECRET, { expiresIn: '1d', issuer: 'm1na'})
            const token = {access_token : accessToken}
            console.log(token)
            res.cookie('Authorization', accessToken, {httpOnly: true, maxAge:  12 * 60 * 60 * 1000})
            // res.header('Authorization', accessToken);
            res.send(token)
        }catch(error){
            console.log(error)
            res.status(401).send("user를 찾을 수 없습니다.")
        // error(res, 200, '/', token)
        
        }
    })


    


module.exports = router 