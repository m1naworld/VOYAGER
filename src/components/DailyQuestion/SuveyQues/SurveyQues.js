import React, { useState } from "react";
import styled from "styled-components";
import "./SurveyQues.scss";
import { addAnswer } from "../../../redux/reducer/DailyQsReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import AstronautSpinner from "../../animations/Spinner/AstronautSpinner";

const BarSpot = styled.div`
  width: ${(props) => `${props.idx * 8.33}%`};
  border: 4px solid black;
  color: rgb(63, 62, 62);
  transition: width 0.5s linear;
  border-radius: 1em; ;
`;

const Question = styled.div`
  display: flex;
  position: relative;
  height: 70vh;
  overflow: hidden;
`;

const SlideContainer = styled.div`
  width: 1200%;
  height: 100%;
  display: flex;
  margin: 40px 0 0 0;
  flex: 0 0 auto;
  transform: ${({ idx }) => `translateX(-${(idx - 1) * 8.33}%)`};
`;

const Slide = styled.div`
  width: 8.33%;
  margin: 0;
  align-content: center;
  text-align: center;
`;

export default function SurveyQues({ setToggle }) {
  const [slide, setSlide] = useState(1);
  const dispatch = useDispatch();
  const Data = useSelector((state) => state.dailyQuestions.daily.qs);

  return Data ? (
    <>
      <div className="progressBar_content">
        <div className="progressBarText">
          <h4>{slide}/12</h4>
        </div>
        <div className="bar">
          <div className="barAll">
            <BarSpot idx={slide}></BarSpot>
          </div>
        </div>
      </div>
      <Question>
        <SlideContainer idx={slide}>
          {Data.map((m, idx) => {
            return (
              <Slide key={idx} className="Slide">
                <h2>{m.qs}</h2>
                <div
                  className="answerinner"
                  style={{
                    position: "relative",
                    top: "50%",
                    display: "flex",
                    justifyContent: "space-around",
                    padding: "0 15%",
                  }}
                >
                  <button
                    className="btn yesbtn"
                    onClick={() => {
                      dispatch(addAnswer({ label: m.label, answer: 1 }));
                      if (slide === 12) {
                        setToggle(true);
                      } else {
                        setSlide((slide) => slide + 1);
                      }
                    }}
                  >
                    yes
                  </button>
                  <button
                    className="btn nobtn"
                    onClick={() => {
                      dispatch(addAnswer({ label: m.label, answer: 0 }));
                      if (slide === 12) {
                        setToggle(true);
                      } else {
                        setSlide((slide) => slide + 1);
                      }
                    }}
                  >
                    no
                  </button>
                </div>
              </Slide>
            );
          })}
        </SlideContainer>
      </Question>
    </>
  ) : (
    <AstronautSpinner />
  );
}
