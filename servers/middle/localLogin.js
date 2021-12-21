const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
import { User } from "../models/User";
const bycrypt = require("bcrypt");
require("dotenv").config();

module.exports = () => {
  // Local Strategy
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          console.log(email);
          console.log(password);
          const users = await User.findOne({ email });
          console.log(users);
          if (!users) {
            return done(null, false, {
              success: false,
              message: "등록되지 않은 이메일 입니다.",
            });
          }
          if (users && users.provider === "local") {
            const validate = await bycrypt.compare(password, users.password);
            if (!validate) {
              return done(null, false, {
                success: false,
                message: "비밀번호가 틀렸습니다.",
              });
            }
            if (!users.confirmation) {
              return done(null, users, {
                success: false,
                message: "이메일 인증을 완료해 주세요!",
              });
            }
            return done(null, users, {
              success: true,
              message: "로그인 성공!",
            });
          }
          if (users && users.provider !== "local") {
            return done(null, users.email, {
              success: false,
              message: `${users.provider}로 이미 가입된 유저 입니다.`,
            });
          }
        } catch (error) {
          console.log(error);
          return done(error);
        }
      }
    )
  );
};
