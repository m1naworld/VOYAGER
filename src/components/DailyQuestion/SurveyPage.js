import React, { useEffect, useState } from "react";
import SurveyQues from "./SuveyQues/SurveyQues";
import "./SurveyPage.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { postSurveyQs } from "../../redux/reducer/DailyQsReducer";
import AstronautSpinner from "../animations/Spinner/AstronautSpinner";
import { Navigate, useNavigate } from "react-router-dom";
import TestMoon from "../Detail/TestMoon";

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
  const getColor = useSelector((state) => state.toggle.user.color.color);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        <section
          style={{
            height: "100vh",
            padding: "10% 0",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h1>오늘의 색깔</h1>
            <button
              onClick={() => {
                navigate("../../detail");
              }}
              style={{
                padding: "20px 30px",
                fontSize: "20px",
                width: "fit-content",
                margin: "0 auto",
                border: "2px solid black",
                backgroundColor: "white",
                cursor: "pointer",
                marginBottom: "10%",
              }}
            >
              HOME
            </button>
          </div>
          <div
            style={{
              width: "200%",
              height: "100%",
              top: "65%",
              left: "55%",
              transform: "translate(-50%,-50%)",
              zIndex: "-1",
              position: "absolute",
            }}
          >
            <TestMoon currentColor={getColor} style={{ height: "100vh" }} />
          </div>
        </section>
      )}
    </div>
  );
}
