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
          const users = await User.findByEmail({ email });
          if (!users) {
            return done(null, false, {
              success: false,
              message: "등록되지 않은 이메일 입니다.",
            });
          }
          const validate = await bycrypt.compare(password, users.password);
          if (!validate) {
            return done(null, false, {
              success: false,
              message: "비밀번호가 틀렸습니다.",
            });
          }
          if (users.confirmation) {
            return done(null, users, {
              success: true,
              message: "로그인 성공!",
            });
          }
          return done(null, users, {
            success: false,
            message: "이메일 인증을 완료해 주세요!",
          });
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};
