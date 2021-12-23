import React, { useState, useRef, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import CalendarSurvey from "../survey/calendar/CalendarSurvey";
import "./Pal.scss";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postDailyQs } from "../../redux/reducer/DailyQsReducer";
import { Navigate, useNavigate } from "react-router-dom";

const Container = styled.div`
  width: 100%;
  overflow: hidden;
  @media screen and (max-width: 420px) {
    width: 100vw;
    display: flex;
    flex-direction: column;
  }
`;
const ButtonLeft = styled(MdOutlineArrowBackIosNew)`
  all: unset;
  fill: white;
  height: 3em;
  position: absolute;
  transition: all 0.3s ease-in-out;
  &:hover {
    transition: all 0.3s ease-in-out;
    color: #fff;
    opacity: 0.6;
  }
`;

const ButtonRight = styled(MdOutlineArrowForwardIos)`
  all: unset;
  fill: white;
  height: 3em;
  position: absolute;
  transition: all 0.3s ease-in-out;
  &:hover {
    transition: all 0.3s ease-in-out;
    color: #fff;
    opacity: 0.6;
  }
`;

const FadeIn = keyframes`
  from {
    visibility: hidden;
    opacity: 0;
  }
  to {
    visibility: visible;
   opacity: 1;
  }
`;

const FadeOut = keyframes`
  from {
    visibility: visible;
    opacity: 1;
    
  }
  to {
    visibility: hidden;
    opacity: 0;
    
  }
`;

const Prev = keyframes`
  0% {
    visibility: visible;
    opacity: 1;
    transform: translate3d(0,0,0);
  }
  50%{
    opacity: 0.7;
  }
  100%{
    visibility: hidden;
    opacity: 0;
    transform: translate3d(40%,0,0);
  }
`;

const Next = keyframes`
  0% {
    visibility: visible;
    opacity: 1;
    transform: translate3d(0,0,0);
  }
  50%{
    opacity: 0.7;
  }
  100%{
    visibility: hidden;
    opacity: 0;
    transform: translate3d(-40%,0,0);
  }
`;

const SliderContainer = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  & div {
    flex: 0 0 auto;
    width: 100%;
    text-align: center;
    position: absolute;
  }
  & span {
    display: inline-block;
    width: 55%;
    font-size: 2rem;
    text-align: center;
    word-wrap: break-word;
  }

  & textarea {
    flex: 0 0 auto;
    top: 10rem;
    left: 50%;
    transform: translate(-50%, -50%);
    position: absolute;
    background: black;
    color: white;
    height: 8rem;
    /* font-size: 2px; */
    width: 50%;
  }
  --x1: 0.1;
  --y1: 0.67;
  --x2: 0.29;
  --y2: 0.98;

  --originalCurve: cubic-bezier(var(--x1), var(--y1), var(--x2), var(--y2));
  --reversedCurve: cubic-bezier(
    calc(1 - var(--x2)),
    calc(1 - var(--y2)),
    calc(1 - var(--x1)),
    calc(1 - var(--y1))
  );

  --length: 1300ms;
  .slide {
    visibility: hidden;
    font-size: 2rem;
  }
  .now {
    animation: ${FadeIn} 2300ms forwards var(--reversedCurve);
  }
  .prev {
    animation: ${Prev} var(--length) forwards var(--originalCurve);
  }
  .next {
    animation: ${Next} var(--length) forwards var(--originalCurve);
  }
  .qs {
    font-size: 1rem;
  }
  button {
    color: white;
    position: absolute;
    left: 50%;
    top: 17rem;
    transform: translate(-50%, -50%);
  }

  @media screen and (max-width: 420px) {
    display: flex;
    flex-direction: column;
    .slide {
      top: -3rem;
    }
    .qs {
      top: 10rem;
      width: 80%;
    }
    & textarea {
      flex: 0 0 auto;
      left: 50%;
      transform: translate(-50%, -50%);
      position: absolute;
      background: black;
      color: white;
      height: min-content;
      width: 70%;
    }
    & span {
      display: inline-block;
      width: 55%;
      font-size: 1rem;
      text-align: center;
      word-wrap: break-word;
    }
  }
`;

const TOTAL_SLIDES = 2;

export default function Slider({ toggle, fetch, setFetch }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidePosition, setSlidePosition] = useState(null);
  const answers = useSelector((state) => state.dailyQuestions.qs.answer);
  const [postToggle, setPostToggle] = useState(false);
  const dispatch = useDispatch();
  const slideRef = useRef(null);
  const dataList = useSelector((state) => state.dailyQuestions.qs);
  const navigate = useNavigate();
  const getDaily = useSelector((state) => state.toggle.user.daily);
  const nextSlide = () => {
    if (currentSlide >= TOTAL_SLIDES) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
    setSlidePosition("next");
  };
  const prevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(TOTAL_SLIDES);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
    setSlidePosition("prev");
  };
  const postDaily = useCallback(() => {
    const { question, answer } = dataList;
    dispatch(postDailyQs({ question, answer }));
    navigate("../../detail");
  }, [dataList]);

  useEffect(() => {
    if (answers.length === 3) {
      setPostToggle(true);
    }
  }, [postToggle, answers, dataList]);
  if (getDaily) {
    return <Navigate to="../" />;
  }

  return (
    <Container>
      <div className="wrapper">
        <SliderContainer ref={slideRef}>
          {dataList.qsList.map((m) => (
            <CalendarSurvey
              key={m.index}
              data={m}
              slideIndex={currentSlide}
              slidePosition={slidePosition}
              maxIndex={TOTAL_SLIDES}
              postToggle={postToggle}
              postDaily={postDaily}
            />
          ))}
        </SliderContainer>
        <ButtonLeft
          style={{ left: "2%", zIndex: 1000 }}
          onClick={prevSlide}
        ></ButtonLeft>
        <ButtonRight
          style={{ right: "2%", zIndex: 1000 }}
          onClick={nextSlide}
        ></ButtonRight>
      </div>
    </Container>
  );
}
