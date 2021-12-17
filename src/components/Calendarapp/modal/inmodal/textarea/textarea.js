import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  changeLastDiary,
  getCalendar,
  getCurrentDiary,
  postDailyDiary,
} from "../../../../../redux/reducer/CalendarReducer";
import { useSelector } from "react-redux";
import { DiaryBtn } from "../diary/diary";
import axios from "axios";
// import Diary from './Diary'
// import './Textarea.css'

export const DiarySaveBtn = styled.div`
  margin: 10px;
  padding: 10px 20px;
  border: 2px solid #fff;
  border-radius: 3px;
  background: transparent;
  color: white;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  display: inline-block;
  cursor: pointer;
`;

function TextArea({ date, setShowMention }) {
  const dispatch = useDispatch();
  const btn = useRef();
  const { register, handleSubmit } = useForm();
  const diary = useSelector((state) => getCurrentDiary(state, date));
  const formStyle = {
    textArea: {
      border: 8,
      margin: 6,
      resize: "none",
      ariaHidden: "true",
      backgroundColor: "transparent",
      color: "white",
    },
  };

  const onSubmit = async (e) => {
    // try {
    //   const res = await axios.post("/api/data/addDiary", {
    //     date: date,
    //     diary: e.text,
    //   });
    //   console.log(res);
    // } catch (err) {
    //   console.log(err.response);
    // }

    dispatch(postDailyDiary(12, { date, diary: e.text }));
    // dispatch(getCalendar());
    setShowMention(false);
  };
  useEffect(() => {
    console.log(diary);
  }, [diary]);
  return (
    <>
      <form
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          padding: "0 5%",
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <textarea
          className="input"
          type="text"
          rows="10"
          cols="90"
          placeholder="일기(300자 제한)"
          style={formStyle.textArea}
          maxLength="300"
          defaultValue={!diary.length !== 0 ? diary[0]?.diary : ""}
          {...register("text")}
        />

        <DiaryBtn
          style={{ margin: "0 auto" }}
          onClick={() => btn.current.click()}
        >
          SUBMIT
        </DiaryBtn>
        <button
          // style={{ visibility: "hidden" }}
          ref={btn}
          // type="submit"
          onClick={() => dispatch(postDailyDiary())}
        >
          ssss
        </button>
      </form>
    </>
  );
}
export default TextArea;
