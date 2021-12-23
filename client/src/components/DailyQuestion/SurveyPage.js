import React, { useEffect, useState } from "react";
import SurveyQues from "./SuveyQues/SurveyQues";
import "./SurveyPage.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postSurveyQs } from "../../redux/reducer/DailyQsReducer";
import AstronautSpinner from "../animations/Spinner/AstronautSpinner";
import { Navigate } from "react-router-dom";

export default function Question1() {
  const [toggle, setToggle] = useState(false);
  const getColor = useSelector((state) => state.toggle.user.color);
  if (getColor) {
    return <Navigate to="../" />;
  }
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#363636",
      }}
    >
      <div className="surveySp">
        <div>
          {toggle ? <HereResult /> : <SurveyQues setToggle={setToggle} />}
        </div>
      </div>
    </div>
  );
}

export function HereResult() {
  const result = useSelector((state) => state.dailyQuestions.daily.answer);
  const loading = useSelector((state) => state.dailyQuestions.qsLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postSurveyQs(result));
  }, []);
  return (
    <div>
      {loading ? (
        <AstronautSpinner
          setStyle={{
            width: "100%",
            height: "100%",
            backgroundColor: "transparent",
          }}
        />
      ) : (
        <span>결과</span>
      )}
    </div>
  );
}
