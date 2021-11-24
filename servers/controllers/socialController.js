import {socialUser} from "../models/socialUser"


export const kakao =  async (req, res, done) => {
    try{
    const profile = req.body
    const exUser = await socialUser.findOne({
        snsId : profile.snsId, provider : 'kakao'
    });
    if (exUser) { 
        console.log(`exUser: ${exUser}`)
        return done(null, exUser)
    }

    const {provider , snsId, email, nickname:name, gender, age, birth} = profile
        const newUser = await socialUser.create({
        provider,
        snsId,
        email,
        name,
        gender,
        age,
        birth,
        refresh: "null"}); 

        // console.log(`newUser: ${newUser}`)
        return done(null, newUser);
    }catch(error){
        console.log(error);
        return done(error)
    }
} 


export const naver =  async (req, res, done) => {
    try{
    const profile = req.body
    const exUser = await socialUser.findOne({
        snsId :profile.snsId, provider : 'naver'
    });
    if (exUser) { 
        console.log(exUser)
        return done(null, exUser)
    }else {
        const {provide, snsId, email, name, gender, age, birthday:birth, birthyear, mobile:phone} = profile 
        const newUser = await socialUser.create({
        provide,
        snsId,
        email,
        name, 
        gender,
        age,
        birth,
        birthyear,
        phone}); 

    console.log(newUser)
    return done(null, newUser);
    }}catch(error){
        console.log(error);
        return done(error)
    }
} 