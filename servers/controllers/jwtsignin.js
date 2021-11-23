// import jwt from 'jsonwebtoken';
// import { User } from '../models/user';


// const cookie = require('cookie')
// export const jwtMiddleware = (req, res, next) => {

//     // 클라이언트 쿠키에서 token 가져옴 
//     // const cookies = cookie.parse(req.headers.cookie);
//     // var token = cookies.user;
//     // console.log(token)
//     const token = req.headers['Authorization']
//     console.log(req)
//     // token decode
//     jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
//         if(error) {
//             console.log("token decode실패")
//             return res.status(500).json({error: "token을 decode하는데 실패 했음"})
//         }

//         // decoded에는 jwt를 생성할 때 첫번째 인자로 전달한 객체가 있음
//         User.findOne({snsId: decoded.id}, (error, user) => {
//             if(error){
//                 console.log("db 오류 ")
//                 return res.json({error: "db에서 찾는 도중 오류 발생"})
//             }
//             if(!user){
//                 console.log("유저 없음")
//                 return res.status(404).json({isAuth: false, error: "token에 해당하는 유저가 없음"})
//             }
//             if(user){
//                 // 다음에 사용할 수 있도록 req 객체에 token과 user를 넣어준다
//                 console.log("성공")
//                 req.token = token;
//                 req.user = user;
//             }
//             next()
//         });
//     });
// };

// // exports.verifyToken = (req, res, next) => {
// //     try{
// //         const token = req.headers.authorization.split('Bearer ')[1];
// //         let jwt_secret = process.env.JWT_SECRET

// //         req.decoded = jwt.verify(token, jwt_secret);
// //         return next();
// //     } catch(err) {
// //         if(err.name == 'TokenExpiredError'){
// //             return res.status(419).json({success: false, message: "token 만료"});
// //         } return res.status(401).json({success: false, message: "token이 유효하지 않습니다."})
// //     }
// // }



