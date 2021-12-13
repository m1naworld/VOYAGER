import React, { useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import CalendarSurvey from "../survey/calendar/CalendarSurvey";
import "./Pal.scss";
import {
  MdOutlineArrowBackIosNew,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

import { useSelector } from "react-redux";

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
    font-size: 2px;
    width: 30rem;
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
  /* .hide {
    animation: ${FadeOut} 1s ease-in-out forwards;
  } */
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
    top: 15rem;
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
  }
`;

const TOTAL_SLIDES = 2;

export default function Slider({ toggle, fetch, setFetch }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidePosition, setSlidePosition] = useState(null);

  const slideRef = useRef(null);
  const dataList = useSelector((state) => state.dailyQuestions.qs);

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

  return (
    <Container>
      <div className="wrapper">
        <SliderContainer ref={slideRef}>
          {dataList.map((m) => (
            <CalendarSurvey
              key={m.index}
              data={m}
              slideIndex={currentSlide}
              slidePosition={slidePosition}
              maxIndex={TOTAL_SLIDES}
              toggle={fetch}
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
      <button onClick={() => toggle(false)}>CLOSE SURVEY</button>
      <button onClick={() => setFetch(!fetch)}>send</button>
    </Container>
  );
}
