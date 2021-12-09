import { mydiary } from "../models/myDiary";
import { mydaily } from "../models/myDaily";

export const deleteMyDiary = async (req, res) => {
  try {
    const snsId = req.snsId;
    const date = new Date(req.body.date);

    const user = await mydiary.findOne({ snsId });
    const data = user.data;
    console.log(data);
    const idx = data.findIndex((m) => m.date.getTime() === date.getTime());
    console.log(idx);
    if (idx !== -1) {
      data.splice(idx, 1);
      user.data = data;
      console.log(user.data);
      user.save();
    }
    return res.status(200).json({ delete: true, message: "MyDiary 삭제 성공" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ delete: false, message: "MyDiary 삭제 실패" });
  }
};

// export const deleteMyDaily = async (req, res) => {
//   try {
//     const snsId = req.snsId;
//     const date = new Date(req.body.date);
//     const index = req.body.index;

//     const user = await mydaily.findOne({ snsId });
//     const data = user.data;
//     console.log(data);
//     const idx = data.findIndex((m) => m.date.getTime() === date.getTime());
//     console.log(idx);
//     if (idx !== -1) {
//       console.log(data[idx].daily);
//       data[idx].daily.answer.splice(index - 1, 1);
//       user.data = data;
//       console.log(user.data);
//       //   user.save();
//     }
//     return res.status(200).json({ delete: true, message: "MyDaily 삭제 성공" });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ delete: false, message: "MyDaily 삭제 실패" });
//   }
// };

// 주관식 답변은 삭제하지 않는 것이 좋을 것 같음
// 1. 로직 복잡. 셋다 한번에 지우는건 쉬우나 셋중 하나씩 지우는걸 구현할 시 생각해봐야함
// 2. 지우지않는 것이 과거의 기록을 보존한다 요런 느낌 좋을 것 같음
