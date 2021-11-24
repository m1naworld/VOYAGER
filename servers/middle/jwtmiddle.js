import jwt, { decode } from 'jsonwebtoken';
import { localUser } from '../models/localUser';
import { socialUser} from '../models/socialUser';

const cookie = require('cookie')
export const jwtMiddleware = async (req, res, next) => {
    console.log(req.headers.cookie)
    // 클라이언트 쿠키에서 token 가져옴 
    const cookies = cookie.parse(req.headers.cookie);
    const accesstoken = req.cookies.Authorization
    const refreshtoken = await User.findOne({
        snsId: req.body.snsId
    }).refresh
    console.log(refreshtoken)

    // token decode
    jwt.verify(accesstoken, process.env.JWT_SECRET, (error, decoded) => {
        if(error) {
            console.log("token decode실패")

            return res.status(401).send('test')
        }
        console.log(decoded.user)
        // decoded에는 jwt를 생성할 때 첫번째 인자로 전달한 객체가 있음
        localUser.findOne({_id: decoded.user._id }, (error, user) => {
            if(error){
                console.log("db 오류 ")
                return res.status(402).json({error: "db에서 찾는 도중 오류 발생"})
            }
            if(!user){
                console.log("유저 없음")
                return res.status(404).json({isAuth: false, error: "token에 해당하는 유저가 없음"})
            }
            if(user){
                // 다음에 사용할 수 있도록 req 객체에 token과 user를 넣어준다
                console.log("인증 성공")
                req.token = token;
                req.user = user;
            }
            next()
        });
    });
};