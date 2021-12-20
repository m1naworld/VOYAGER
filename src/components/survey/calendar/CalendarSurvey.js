import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTextAnswer } from "../../../redux/reducer/DailyQsReducer";
import { useForm } from "react-hook-form";

const CalendarSurvey = ({
  data,
  slideIndex,
  maxIndex,
  slidePosition,
  postToggle,
  postDaily,
}) => {
  let prevIndex;
  let nextIndex;
  const { register, handleSubmit } = useForm();

  const dispatch = useDispatch();
  const [dis, setDis] = useState(false);

  const qsData = useSelector((state) => state.dailyQuestions.qs);

  if (slideIndex === 0) {
    prevIndex = maxIndex;
    nextIndex = 1;
  } else if (slideIndex === maxIndex) {
    prevIndex = 1;
    nextIndex = 0;
  } else {
    prevIndex = slideIndex - 1;
    nextIndex = slideIndex + 1;
  }
  console.log(slideIndex);
  console.log(postToggle);
  const onSubmit = (e) => {
    if (!dis) {
      console.log(e.dailyQs);
      dispatch(addTextAnswer({ index: data.index, answer: e.dailyQs }));
    }
    setDis(!dis);
  };

  return (
    <>
      <div
        className={
          slidePosition === "prev" && nextIndex === data.index
            ? "slide prev"
            : slideIndex === data.index
            ? "slide now"
            : slidePosition === "next" && prevIndex === data.index
            ? "slide next"
            : "slide"
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <span style={{ font: "IM_Hyemin-Bold", color: "white" }}>
            {data.qs}
          </span>
          <textarea
            disabled={dis}
            rows="5"
            cols="30"
            {...register("dailyQs")}
          />

          {slideIndex === 2 && postToggle ? (
            <button onClick={postDaily}>제출하기</button>
          ) : (
            <button type="submit">{dis ? "수정하기" : "등록하기"}</button>
          )}
        </form>
      </div>
    </>
  );
};

export default CalendarSurvey;
