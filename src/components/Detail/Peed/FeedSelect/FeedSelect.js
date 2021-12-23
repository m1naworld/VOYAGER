import React, { useEffect, useState } from "react";
import cls from "../Peed.module.scss";
import { FaHeart } from "react-icons/fa";
import axios from "axios";
const FeedSelect = ({ m, slide }) => {
  const [feedInfo, setFeedInfo] = useState({
    _id: m._id,
    index: slide,
  });
  const [like, setLike] = useState(m.status);
  const [likeCount, setLikeCount] = useState(m.likeCount);

  const postLike = async () => {
    try {
      const res = await axios.post("/api/data/likeFeed", {
        _id: feedInfo._id,
      });
      setLike(!like);
      if (like) {
        setLikeCount((c) => c - 1);
      } else {
        setLikeCount((c) => c + 1);
      }
    } catch (err) {}
  };

  useEffect(() => {
    setLikeCount(m.likeCount);
    setLike(m.status);
    setFeedInfo({
      _id: m._id,
      index: slide,
    });
  }, [slide]);
  return (
    <div className={cls.profile__wrapper}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: "10px",
          left: "10px",
        }}
      >
        <div
          style={{
            width: "fit-content",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#cecece",
            marginRight: "5px",
            borderRadius: "50%",
          }}
        >
          <img
            src={m.img}
            alt={m.nickname}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
            }}
          />
        </div>
        <h3>{m.nickname}</h3>
      </div>
      <button
        style={{
          position: "absolute",
          bottom: "10px",
          right: "15px",
          backgroundColor: "transparent",
          border: "none",
        }}
        onClick={postLike}
      >
        <FaHeart className={like ? `${cls.heart} ${cls.red}` : cls.heart} />
      </button>
      <div style={{ position: "absolute", bottom: "10px", right: "35px" }}>
        {likeCount}
      </div>
      {m.answer.index === slide ? (
        <div
          style={{ margin: "0 20px", overflow: "auto", padding: "10% 0" }}
          key={m.answer.index}
        >
          <p>{m.answer.answer}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default FeedSelect;
