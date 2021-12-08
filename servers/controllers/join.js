import { User } from "../models/User";
import { calendar } from "../models/calendar";
import { addCalendar } from "./myCalendarController";
import dotenv from "dotenv";
dotenv.config();

const bcrypt = require("bcrypt");

export const join = async (req, res) => {
  // req의 body 정보를 사용하려면 server.js에서 따로 설정을 해줘야함
  let { provider, email, password, name, birth, birthyear, phone } = req.body;
  // let {snsId} = email
  console.log(req.body);
  try {
    //   email을 비교하여 user가 이미 존재하는지 확인
    let users = await User.findOne({ email, provider: "local" });
    if (users) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }
    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    console.log(typeof salt);
    password = await bcrypt.hash(password, salt);

    const snsId = email;
    const newCalendar = await calendar.registerSnsId({ snsId });
    console.log(`new ${newCalendar}`);

    // snsId를 통해 calendar db ObjectId를 user와 연결
    const checkCalendar = await calendar.findUser({ snsId });
    const userCalendar = checkCalendar._id;

    addCalendar(snsId);

    // user에 name, email, password 등 값 할당
    users = new User({
      provider,
      snsId,
      email,
      password,
      nickname: name,
      name,
      birth,
      birthyear,
      phone,
      userCalendar,
    });
    console.log(users);
    // password를 암호화 하기
    await users.save(); // db에 user 저장

    res.send("Success");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
};