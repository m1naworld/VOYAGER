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
    const snsId = req.snsId;
    const user = await User.findBySnsId({ snsId }).populate("userCalendar");
    // console.log(user);
    const userCalendar = await user.userCalendar.populate("color");
    await user.userCalendar.populate("daily");
    await user.userCalendar.populate("diary");

    console.log(userCalendar);
    console.log(userCalendar.daily);

    // const question = userCalendar.

    return res.status(200).json({ calendar: userCalendar });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ send: false, message: "sendCalendar 실패" });
  }
};
