import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getFeeds } from "../../../redux/reducer/FeedReducer";
import cls from "./Peed.module.scss";

const Peed = () => {
  const [slide, setSlide] = useState(0);
  const qs = useSelector((state) => state.dailyQuestions.qs.qsList);
  const feeds = useSelector((state) => state.Feed.feeds);
  console.log(feeds);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    dispatch(getFeeds(0));
  }, []);

  useEffect(() => {}, []);
  // post (api/send/peed , {count : number} )
  return (
    <div className={cls.peed__wrapper}>
      <div
        style={{
          width: "100%",
          height: "100%",
          border: "2px solid black",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input />
        <div className={cls.peed__nav__wrapper}>
          {qs.map((m) => {
            return (
              <div
                key={m.index}
                className={cls.btn}
                onClick={() => setSlide(m.index)}
              >
                {m.qs}
              </div>
            );
          })}
        </div>
        <div className={cls.peed__selected}>
          <div
            className={cls.peed__selected__bar}
            style={{ marginLeft: `${slide * 33.4}%` }}
          ></div>
        </div>
        <div style={{ width: "100%", height: "100%", overflowY: "auto" }}>
          {feeds.map((m) => {
            return (
              <div>
                <h3>{m.nickname}</h3>
                <img
                  src={m.img}
                  alt={m.nickname}
                  style={{ width: "70px", height: "70px" }}
                />
                {m.answer.map((a) => {
                  return (
                    <>
                      <h3>{a.index}</h3>
                      <p>{a.answer}</p>
                    </>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <button onClick={handleClick}>데이터 가져오기 </button>
    </div>
  );
};

export default Peed;
