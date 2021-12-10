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
};
