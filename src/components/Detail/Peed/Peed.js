import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getFeeds } from "../../../redux/reducer/FeedReducer";
import cls from "./Peed.module.scss";

const Peed = () => {
  const [slide, setSlide] = useState(0);
  const qs = useSelector((state) => state.dailyQuestions.qs.qsList);
  const feeds = useSelector((state) => state.Feed.feeds);

  const dispatch = useDispatch();

  useEffect(() => {}, []);
  // post (api/send/peed , {count : number} )
  return (
    // <div className={cls.peed__wrapper}>
    <div style={{ width: "100vw", padding: "2% 20%" }}>
      {/* 4 */}
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
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "auto",
          // padding: "10%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {feeds &&
          feeds.map((m, idx) => {
            return (
              <div
                style={{
                  display: "flex",
                  // justifyContent: `${
                  //   idx % 2 === 0 ? "flex-start" : "flex-end"
                  // }`,
                  flexDirection: `${idx % 2 === 0 ? "row" : "row-reverse"}`,
                  margin: "50px 0",
                  backgroundColor: "white",
                  // width: "70%",
                  borderRadius: "2rem",
                  padding: "2%",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textAlign: "center",
                  }}
                >
                  <h3>{m.nickname}</h3>
                  <img
                    src={m.img}
                    alt={m.nickname}
                    style={{ width: "70px", height: "70px" }}
                  />
                </div>
                {m.answer.map((a) =>
                  a.index === slide ? (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <p>{a.answer}</p>
                    </div>
                  ) : (
                    ""
                  )
                )}
              </div>
            );
          })}
      </div>
      {/* </div> */}
      {/* </div> */}
    </div>
  );
};

export default Peed;
