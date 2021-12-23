import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import cls from "./Peed.module.scss";
import { MdDoneAll } from "react-icons/md";
import { RiSpaceShipFill } from "react-icons/ri";
import FeedSelect from "./FeedSelect/FeedSelect";
import ErrorPage from "../../404";
import AstronautSpinner from "../../animations/Spinner/AstronautSpinner";
const Peed = () => {
  const [slide, setSlide] = useState(0);
  const qs = useSelector((state) => state.dailyQuestions.qs.qsList);
  const feeds = useSelector((state) => state.Feed.feeds);
  const loading = useSelector((state) => state.Feed.feedLoading);

  useEffect(() => {}, [slide]);
  return (
    <div
      style={{
        width: "100%",
        maxWidth: "800px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className={cls.peed__nav__wrapper}>
        <div style={{ display: "flex", height: "100px" }}>
          {qs.map((m) => {
            return (
              <div
                key={m.index}
                className={cls.btn}
                onClick={() => setSlide(m.index)}
              >
                {slide === m.index ? (
                  <MdDoneAll />
                ) : (
                  <RiSpaceShipFill style={{ color: "white" }} />
                )}
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
      </div>
      <div>
        <div className={cls.peed__title}>{qs[slide]?.qs}</div>
        <div
          style={{
            width: "100%",
            height: "80vh",
            overflowY: "auto",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-evenly",
          }}
        >
          {loading ? (
            <AstronautSpinner />
          ) : feeds && feeds?.length ? (
            feeds[slide].map((m, idx) => {
              return <FeedSelect m={m} slide={slide} key={idx} />;
            })
          ) : (
            <ErrorPage />
          )}
        </div>
      </div>
    </div>
  );
};

export default Peed;
