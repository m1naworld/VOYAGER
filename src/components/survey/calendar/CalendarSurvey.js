import React from "react";

const CalendarSurvey = ({ data, slideIndex, maxIndex, slidePosition }) => {
  let prevIndex;
  let nextIndex;

  if (slideIndex === 0) {
    prevIndex = 2;
    nextIndex = 1;
  } else if (slideIndex === 2) {
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
        <span>{data.qs}</span>
      </div>
      <textarea
        type="text"
        rows="5"
        cols="30"
        className={slideIndex === data.index ? "qs slide now" : "qs slide hide"}
      />
    </>
  );
};

export default CalendarSurvey;
