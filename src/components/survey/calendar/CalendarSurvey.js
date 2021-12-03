import React from "react";

const CalendarSurvey = ({ data, slideIndex, maxIndex, slidePosition }) => {
  let prevIndex;
  let nextIndex;

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
        <span style={{ font: "IM_Hyemin-Bold" }}>{data.qs}</span>
      </div>
      <textarea
        type="text"
        rows="5"
        cols="30"
        onChange={(v) => console.log(v.target.value)}
        className={slideIndex === data.index ? "qs slide now" : "qs slide hide"}
      />
    </>
  );
};

export default CalendarSurvey;
