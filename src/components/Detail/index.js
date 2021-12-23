import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDailyQs, getSurveyQs } from "../../redux/reducer/DailyQsReducer";
import styles from "./Detail.module.scss";

import { useSelector } from "react-redux";
import styled from "styled-components";

import TestMoon from "./TestMoon";
import Peed from "./Peed/Peed";
import { getFeeds } from "../../redux/reducer/FeedReducer";

const Sec = styled.div`
  position: relative;
  /* height: 100vh; */
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* &:before {
    content: "";
    width: 100%;
    height: 100px;
    position: absolute;
    top: -100px;
    background: linear-gradient(to top, #0b787f, transparent);
  } */
`;

export const MoonContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  mix-blend-mode: screen;
  /* background-color: ${(props) => props.color}; */
  /* background-color: transparent; */
`;

function Detail() {
  const stars = useRef();
  const moon = useRef();
  const mountains_behind = useRef();
  const mountains_front = useRef();
  const btn = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getColor = useSelector((state) => state.toggle.user.color);
  const getDaily = useSelector((state) => state.toggle.user.daily);

  const data = useCallback(async () => {
    const qs = dispatch(getDailyQs());
    dispatch(getSurveyQs());
    return qs;
  }, [dispatch]);

  const scrollEvent = useCallback(() => {
    let value = window.scrollY;
    // setScrollH((window.innerHeight - window.scrollY) / window.innerHeight);

    try {
      stars.current.style.left = value * 0.25 + "px";
      moon.current.style.top = value * 1 + "px";
      mountains_behind.current.style.top = value * 0.5 + "px";
      mountains_front.current.style.top = value * 0 + "px";
      btn.current.style.marginTop = value * 1.5 + "px";
    } catch (err) {}
  }, []);
  useEffect(() => {
    data();
    dispatch(getFeeds(1));
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);

  return (
    <>
      <section
        className={styles.mainSection}
        // style={{ opacity: `${scrollH}` }}
      >
        <img
          src={process.env.PUBLIC_URL + "/image/parallax/stars.png"}
          id={styles["stars"]}
          alt="stars"
          ref={stars}
        />
        <MoonContainer
          alt="moon"
          ref={moon}
          color={getColor ? getColor.color : "transparent"}
        >
          <TestMoon currentColor={getColor ? getColor.color : "#1eb599"} />
        </MoonContainer>
        <img
          src={
            process.env.PUBLIC_URL + "/image/parallax/mountains_behind11.png"
          }
          id={styles["mountains_behind"]}
          alt="mountains_behind"
          ref={mountains_behind}
        />

        <div
          ref={btn}
          style={{
            zIndex: "11",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <button
            disabled={getColor ?? false}
            id={getColor ? styles["btn__done"] : styles["btn"]}
            onClick={() => navigate("../dailyQuestion")}
          >
            {getColor ? "완료" : "Color Pick"}
          </button>
          <button
            disabled={getDaily ?? false}
            id={getDaily ? styles["btn__done"] : styles["btn"]}
            onClick={() => navigate("../surveyQuestion")}
          >
            {getDaily ? "완료" : "Survey"}
          </button>
        </div>
        <img
          src={process.env.PUBLIC_URL + "/image/parallax/mountains_behind2.png"}
          id={styles["mountains_front"]}
          alt="mountains_front"
          ref={mountains_front}
        />
      </section>

      <Sec className={styles.sec} id="sec">
        <Peed />
      </Sec>
    </>
  );
}

export default Detail;
