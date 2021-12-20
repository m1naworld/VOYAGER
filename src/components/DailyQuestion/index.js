import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnswer,
  getSurveyQs,
  postSurveyQs,
} from "../../redux/reducer/DailyQsReducer";

const DailyQuestion = () => {
  const dispatch = useDispatch();
  const dailyQuestions = useSelector((state) => state.dailyQuestions.daily);

  const postData = useCallback(() => {
    dispatch(postSurveyQs(dailyQuestions.answer));
  }, [dispatch, dailyQuestions]);

  useEffect(() => {
    dispatch(getSurveyQs());
  }, [dispatch]);
  return !dailyQuestions.qsLoading ? (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {dailyQuestions.qs.map((m) => (
        <div key={m.label}>
          <h1>{m.label}</h1>
          <h1>{m.qs}</h1>
          <button
            style={{ margin: "0 auto" }}
            onClick={() => dispatch(addAnswer({ index: m.label, answer: 1 }))}
          >
            예
          </button>
          <button
            onClick={() => dispatch(addAnswer({ index: m.label, answer: 0 }))}
          >
            아니오
          </button>
        </div>
      ))}
      <button onClick={postData}>보내기</button>
      <video
        autoPlay={true}
        loop={true}
        muted={true}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: "-1",
        }}
      >
        <source
          style={{ width: "100vw", height: "100vh", position: "absolute" }}
          src={`${process.env.PUBLIC_URL}/image/bgvideo.mp4`}
          type="video/mp4"
        />
      </video>
    </div>
  ) : (
    <h1>Loading....</h1>
  );
};

export default DailyQuestion;
