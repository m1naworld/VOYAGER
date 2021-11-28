const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local").Strategy;
import { User } from "../servers/models/User";
const bycrypt = require("bcrypt");
require("dotenv").config();
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

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
            return done(null, false, { message: "User not found" });
          }
          const validate = await bycrypt.compare(password, users.password);
          if (!validate) {
            return done(null, false, { message: "Wrong Password" });
          }
          return done(null, users, { message: "Logged in Successfully" });
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  passport.use(
    "refresh-token",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (jwtPayload, done) => {
        try {
          console.log("------------------------------------");
          console.log(jwtPayload);
          console.log("------------------------------------");
          const user = await User.findOne({ where: { id: jwtPayload.id } });
          if (!user) {
            return done("존재하지 않는 사용자입니다.", null);
          }
          return done(null, user);
        } catch (e) {
          console.error(e);
          return done(e);
        }
      }
    )
  );

  passport.use(
    "access-token",
    new JWTStrategy(
      {
        // jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("Bearer"),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (JwtPayload, done) => {
        try {
          console.log("------------------------------------");
          console.log(JwtPayload);
          console.log("------------------------------------");
          const user = await User.findById(JwtPayload.id);
          console.log(user);
          return done(null, user);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  passport.use(
    "aToken",
    new JWTStrategy(
      {
        secretOrKey: process.env.JWT_SECRET,
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      },
      async (token, done) => {
        try {
          console.log("in aToken auth");
          console.log(token);
          let expirationDate = new Date(token.exp * 1000);

          if (expirationDate < new Date()) {
            return done(null, false);
          }
          return done(null, token);
        } catch (error) {
          done(error);
        }
      }
    )
  );
};
