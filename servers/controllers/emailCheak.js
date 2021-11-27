import { User } from "../models/User";

export const emailCheck = async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  console.log(email);
  try {
    const exUser = await User.findOne({
      email,
    });

    if (exUser) {
      return res
        .status(400)
        .json({ error: "이메일이 중복되었습니다", check: false });
    }
    return res.status(200).json({ check: true });
  } catch (error) {
    console.log(error);
  }
};
