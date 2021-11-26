import {User} from "../models/User"


export const social =  async (req, res, done) => {
    try{
    const profile = req.body
    console.log(profile)

    if(profile.email !== undefined){
    // 이메일이 중복되면 안되므로 email을 통해 user를 찾음
    const exUser = await User.findOne({
        email : profile.email });

    if (exUser) {
        // 디비와 user의 provider가 같은 경우 로그인 성공
        if(profile.provider === exUser.provider) {
            console.log(`exUser: ${exUser}`)
            return done(null, exUser)
        } console.log("이미 있는 아이디입니다.") 
        return res.send("이미 있는 아이디입니다.")   // 다를 경우 이미 있는 아이디라고 알려줌
        
    }}

    else if(profile.email === undefined){
        const snsUser = await User.findOne({
            snsId : profile.snsId
        });

        if(snsUser) {
            console.log(`snsUser: ${snsUser}`);
            return done(null, snsUser);
    }else{
    const {provider , snsId, email, name, gender, age, birth, birthyear, phone} = profile
        const newUser = await User.create({
        provider,
        snsId,
        email,
        name,
        gender,
        age,
        birth,
        birthyear, 
        phone
    }); 
        console.log(`newUser: ${newUser}`)
        return done(null, newUser);
    }
} }catch(error){
    console.log(error);
    return done(error)
}}

// MongoServerError:일때 회원가입되어있습니다. 

// export const naver =  async (req, res, done) => {
//     try{
//     const profile = req.body
//     const exUser = await socialUser.findOne({
//         snsId :profile.snsId, provider : 'naver'
//     });
//     if (exUser) { 
//         console.log(exUser)
//         return done(null, exUser)
//     }else {
//         const {provide, snsId, email, name, gender, age, birthday:birth, birthyear, mobile:phone} = profile 
//         const newUser = await socialUser.create({
//         provide,
//         snsId,
//         email,
//         name, 
//         gender,
//         age,
//         birth,
//         birthyear,
//         phone}); 

//     console.log(newUser)
//     return done(null, newUser);
//     }}catch(error){
//         console.log(error);
//         return done(error)
//     }
// } 