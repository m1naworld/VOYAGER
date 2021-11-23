const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const NaverStrategy = require('passport-naver').Strategy;
import {User} from "../models/user"

export const passportKakao = (app) => {
    passport.use('kakao', new KakaoStrategy({
        clientID: process.env.KAKAO_REST_KEY,
        clientSecret: process.env.KAKAO_SECRET,
        callbackURL: "http://localhost:3000/kiki",
    }, async(accessToken, refreshToken, profile, done) => {
        console.log(`accessToken: ${accessToken}`);
        console.log(`refreshToken: ${refreshToken}`);
        console.log(profile);
        try{
            const exUser = await User.findOne({
                snsId : profile.id, provider : 'kakao'
            });
            if (exUser) { 
                return done(null, exUser)
            }else { // 없으면? 생성 후 로그인 시키기
                const newUser = await User.create({
                provider: profile.provider, // 새로 추가한 가입 출처 컬럼
                snsId: profile.id, // 새로 추가한 sns Id 컬럼
                email: profile._json && profile._json.kakao_account.email,
                name: profile.displayName,
                gender: profile._json.kakao_account.gender,
                age: profile._json.kakao_account.age_range,
                brith: profile._json.kakao_account.birthday,
            });
            console.log('join success')
            return done(null, newUser);
            }
        }catch(error){
            console.log(error);
            done(error);
        }
    }));
}

export const passportNaver = (app) => {
    passport.use('naver', new NaverStrategy({
        clientID: process.env.NAVER_KEY,
        clientSecret: process.env.NAVER_SECRET,
        callbackURL: process.env.NAVER_CALLBACK_a, 
    }, async(accessToken, refreshToken, profile, done) => {
        console.log(`accessToken: ${accessToken}`);
        console.log(`refreshToken: ${refreshToken}`);
        console.log(profile);
        try{
            const exUser = await User.findOne({
                snsId : profile.id, provider: 'naver'
            });
            if (exUser) { // 가입자 있으면? 로그인 성공
                return done(null, exUser);
                console.log(exUser)
            }else { // 없으면? 생성 후 로그인 시키기
                const exUser = await User.create({
                provider: profile.provider, 
                snsId: profile.id, 
                email: profile._json.email,
                name: profile.displayName,
                gender: profile._json.gender,
                age: profile._json.age,
                birth: profile._json.birthday,
                birthyear: profile._json.birthyear,
                phone: profile._json.mobile,

            });
            console.log('join success')
            return done(null, exUser);
        }
        }catch(error){
            console.log(error);
            done(error);
        }
    }));
}

