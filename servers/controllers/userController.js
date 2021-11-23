import {User} from "../models/user"


export const kakao =  async (req, res, done) => {
    try{
    const profile = req.body
    const exUser = await User.findOne({
        snsId : profile.snsid, provider : 'kakao'
    });
    if (exUser) { 
        console.log(exUser)
        return done(null, exUser)
    }else {
        const newUser = await User.create({
        provider: profile.provider, // 새로 추가한 가입 출처 컬럼
        snsId: profile.snsid, // 새로 추가한 sns Id 컬럼
        email: profile.email,
        name: profile.nickname,
        gender: profile.gender,
        age: profile.age,
        brith: profile.birth}); 
    console.log(newUser)
    return done(null, newUser);
    }}catch(error){
        console.log(error);
        return done(error)
    }
} 




export const naver =  async (req, res, done) => {
    try{
    const profile = req.body
    const exUser = await User.findOne({
        snsId : profile.snsid, provider : 'naver'
    });
    if (exUser) { 
        console.log(exUser)
        return done(null, exUser)
    }else {
        const newUser = await User.create({
        provider: profile.provider, // 새로 추가한 가입 출처 컬럼
        snsId: profile.snsid, // 새로 추가한 sns Id 컬럼
        email: profile.email,
        name: profile.nickname,
        gender: profile.gender,
        age: profile.age,
        brith: profile.birth}); 
    console.log(newUser)
    return done(null, newUser);
    }}catch(error){
        console.log(error);
        return done(error)
    }
} 