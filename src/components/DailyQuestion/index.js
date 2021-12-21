import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnswer,
  getSurveyQs,
  postSurveyQs,
} from "../../redux/reducer/DailyQsReducer";
import styled from "styled-components";
import classes from "./DailyQuestion.module.scss";
import Spinner from "../animations/Spinner/Spinner";
import { useNavigate } from "react-router-dom";

// let width = window.innerWidth;
// const circleWidth = 3969;
const circleWidth = 7937;
const backWidth = 4248;
const DailyQuestion = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dailyQuestions = useSelector((state) => state.dailyQuestions.daily);
  const [test, setTest] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(false);

  const postData = useCallback(() => {
    dispatch(postSurveyQs(dailyQuestions.answer));
    navigate("../");
  }, [dispatch, dailyQuestions]);

  const handleWidth = useCallback(() => {
    setWidth(window.innerWidth);
  }, []);

  useEffect(() => {
    dispatch(getSurveyQs());
    setLoading(true);
    window.addEventListener("resize", handleWidth);
    return () => {
      window.removeEventListener("resize", handleWidth);
    };
  }, [dispatch]);
  return loading && !dailyQuestions.qsLoading ? (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      <div className={classes.daily__form}>
        {dailyQuestions.qs.map((m) => (
          <div
            className={
              test + 1 === m.label
                ? classes.daily_inside
                : `${classes.daily_inside} ${classes.daily__disabled}`
            }
          >
            <div key={m.label}>
              <h1>{m.label}</h1>
              <h1>{m.qs}</h1>
              <div>
                <input
                  type="radio"
                  id={`${m.label}-1`}
                  name={m.label}
                  onClick={() => {
                    dispatch(addAnswer({ index: m.label, answer: 1 }));
                    if (m.label !== 12) {
                      setTest(m.label);
                    }
                  }}
                />
                <label htmlFor={`${m.label}-1`}>예</label>
                <input
                  name={m.label}
                  type="radio"
                  id={`${m.label}-0`}
                  onClick={() => {
                    dispatch(addAnswer({ index: m.label, answer: 0 }));
                    if (m.label !== 12) {
                      setTest(m.label);
                    }
                  }}
                />
                <label htmlFor={`${m.label}-0`}>아니요</label>
              </div>
              {m.label === 12 && <button onClick={postData}>보내기</button>}
              {/* <button
            style={{ margin: "0 auto" }}
            onClick={() => {
              dispatch(addAnswer({ index: m.label, answer: 1 }));
              setTest(m.label);
            }}
          >
            예
          </button>
          <button
            onClick={() => {
              dispatch(addAnswer({ index: m.label, answer: 0 }));
              setTest(m.label);
            }}
          >
            아니오
          </button> */}
            </div>
          </div>
        ))}
      </div>

      <MoveSection slot={0} circleW={width}>
        <div className={classes.logo__background}>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
          <div className={classes.logo__stars}></div>
        </div>
        <MoveCircle
          src={`${process.env.PUBLIC_URL}/image/circleBack4.png`}
          alt="back"
          slot={test}
          circleW={width}
        />
        {/* <img
          src={`${process.env.PUBLIC_URL}/image/starBack.png`}
          alt="back"
          style={{
            position: "absolute",
            height: "300%",
            zIndex: "-1",
            left: "-100%",
          }}
        /> */}
      </MoveSection>
    </div>
  ) : (
    <Spinner />
  );
};

export default DailyQuestion;

const MoveSection = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 0;
`;

const MoveCircle = styled.img`
  position: absolute;
  top: 0%;
  /* background : ${`${process.env.PUBLIC_URL}/image/circleBack.png;`} */
  right: ${(props) => `-${(circleWidth - props.circleW) / 2}px;`}
  left: ${(props) => `-${(circleWidth - props.circleW) / 2}px;`}
  transform: ${(props) => `rotateZ(-${(360 / 12) * props.slot}deg);`};
  /* transition: all 4s cubic-bezier(0.470, 0.640, 0.535, 0.325); */
  transition: all 8s linear;
  @media screen and (max-width: 420px) {
    top:-20%;
    transform: ${(props) => `rotateZ(-${(360 / 36) * props.slot}deg);`};
  }
`;
