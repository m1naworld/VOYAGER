import { mycalendar } from "../models/myCalendar";
import { mycolor } from "../models/myColor";
import { mydaily } from "../models/myDaily";
import { mydiary } from "../models/myDiary";
import { User } from "../models/User";

export const addCalendar = async (snsId) => {
  await mycolor.registerSnsId({ snsId });
  await mydiary.registerSnsId({ snsId });
  await mydaily.registerSnsId({ snsId });

  let color = await mycolor.findOne({ snsId });
  let diary = await mydiary.findOne({ snsId });
  let daily = await mydaily.findOne({ snsId });

  color = color._id;
  diary = diary._id;
  daily = daily._id;

  const a = await mycalendar.registerData({ snsId, color, diary, daily });
  console.log({ "calendar 참조 success": a });
};

export const sendCalendar = async (req, res) => {
  try {
    const date = new Date("2022-01-01");
    const snsId = req.snsId;
    const user = await User.findBySnsId({ snsId }).populate("userCalendar");
    console.log(user);
    const userCalendar = await user.userCalendar.populate("color");

    console.log(userCalendar.color);
    await user.userCalendar.populate("daily");
    await user.userCalendar.populate("diary");
    // console.log(userCalendar.color.data.color);
    console.log(userCalendar.daily.data);
    // userCalendar.daily.data.daily.populate("question");
    // console.log(userCalendar.diary);
    // console.log (userCalendar.diary.data[0].diary);
    // const c = await mycalendar.findOne({ snsId });

    // console.log(c);

    // console.log(d);
    // console.log(d.color.data);
    // console.log(d.diary.data.diary);

    // const color = Calendar.color;
    // const data = color.data;
    // console.log(data);
    // const data = myCalendar.userCalendar.data;
    // console.log(data);
    // const calendar = await data.populate("color");
    // console.log(calendar.color.data);
    // const obj = { ...calendar.color.data };
    // const a = a;
    // const ob = Object.assign({ a }, calendar.color);
    // console.log(ob);
    // console.log(Object.setPrototypeOf(calendar.color, Object.prototype));
    // console.log(obj);
    // console.log(obj._id);
    // console.log(object.assign(calendar.data));
    // const myDiary = await data.populate("diary");
    // const myDaily = await data.populate("daily");
    // console.log(myColor);
    // console.log(myDiary);
    // console.log(myDaily);
    // console.log(myDiary.diary.data.diary);
    // const myCalendar = await user.populate("userCalendar");
    // console.log(user);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ send: false, message: "sendCalendar 실패" });
  }
};
