import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addAnswer } from "../../../redux/reducer/DailyQsReducer";

const CalendarSurvey = ({
  data,
  slideIndex,
  maxIndex,
  slidePosition,
  toggle,
}) => {
  let prevIndex;
  let nextIndex;

  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    index: data.index,
    answer: "",
  });

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

  useEffect(() => {
    if (toggle) {
      dispatch(addAnswer(postData));
    }
  }, [toggle, dispatch, postData]);

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
        <span style={{ font: "IM_Hyemin-Bold", color: "white" }}>
          {data.qs}
        </span>
      </div>
      <textarea
        type="text"
        rows="5"
        cols="30"
        onChange={(v) => setPostData({ ...postData, answer: v.target.value })}
        className={slideIndex === data.index ? "qs slide now" : "qs slide hide"}
      />
    </>
  );
};

export default CalendarSurvey;
