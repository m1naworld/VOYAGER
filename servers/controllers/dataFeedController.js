import { feed } from "../models/feed";

export const pushLike = async (req, res) => {
  try {
    console.log(req.body);
    const snsId = req.snsId;
    const post = req.body._id;
    const postLike = await feed.findOne({ _id: post });
    console.log(postLike);
    const myLike = postLike.user.includes(snsId);
    console.log(myLike);
    if (!myLike) {
      postLike.user.push(snsId);
      postLike.likeCount += 1;
      postLike.save();
      return res.status(200).json({ success: true, status: true });
    }
    postLike.user = postLike.user.filter((element) => element !== snsId);
    postLike.likeCount -= 1;
    postLike.save();
    return res.status(200).json({ success: true, status: false });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, error });
  }
};
