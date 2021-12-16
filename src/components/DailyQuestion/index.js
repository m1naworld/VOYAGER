import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAnswer,
  getDailyQs,
  postDailyQs,
} from "../../redux/reducer/DailyQsReducer";

const DailyQuestion = () => {
  const dispatch = useDispatch();
  const dailyQuestions = useSelector((state) => state.dailyQuestions);

  const postData = useCallback(() => {
    dispatch(postDailyQs(dailyQuestions.answer));
  }, [dispatch, dailyQuestions]);

  useEffect(() => {
    dispatch(getDailyQs());
  }, [dispatch]);
  return !dailyQuestions.qsLoading ? (
    <div style={{ width: "100vw", height: "100vh", background: "red" }}>
      {dailyQuestions.qs.map((m) => (
        <div key={m.label}>
          <h1>{m.label}</h1>
          <h1>{m.qs}</h1>
          <button
            onClick={() => dispatch(addAnswer({ label: m.label, answer: 1 }))}
          >
            예
          </button>
          <button
            onClick={() => dispatch(addAnswer({ label: m.label, answer: 0 }))}
          >
            아니오
          </button>
        </div>
      ))}
      <button onClick={postData}>보내기</button>
    </div>
  ) : (
    <h1>Loading....</h1>
  );
};

export default DailyQuestion;
