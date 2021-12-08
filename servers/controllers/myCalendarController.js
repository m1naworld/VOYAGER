import { mycalendar } from "../models/myCalendar";
import { mycolor } from "../models/myColor";
import { mydaily } from "../models/myDaily";
import { mydiary } from "../models/myDiary";

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
