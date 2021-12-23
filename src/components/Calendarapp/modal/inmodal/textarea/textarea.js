import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
  editMention,
  getCalendar,
  postDailyDiary,
} from "../../../../../redux/reducer/CalendarReducer";
import { DiaryBtn } from "../diary/diary";

export const DiarySaveBtn = styled.button`
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

const TextBox = styled.textarea`
  /* border: 8;
  margin: 6; */
  resize: none;

  overflow-y: hidden;
  /* aria-hiddden: true; */
  background-color: transparent;
  color: white;
  text-align: center;
  font-size: 1.8rem;
  padding: 110px 0;
  height: 300px;
  &::placeholder {
    font-size: 1.8rem;
  }
  @media screen and (max-width: 420px) {
    height: 200px;
    padding: 0;
  }
`;

function TextArea({ date, currentDiary }) {
  const dispatch = useDispatch();
  const btn = useRef();
  const { register, handleSubmit } = useForm();

  const formStyle = {
    textArea: {
      border: 8,
      margin: 6,
      resize: "none",
      ariaHidden: "true",
      backgroundColor: "transparent",
      color: "white",
      fontSize: "2.2rem",
      height: "100%",
    },
  };

  const onSubmit = async (e) => {
    dispatch(postDailyDiary({ date, diary: e.text }));
    dispatch(getCalendar(date));
    dispatch(editMention(false));
  };
  useEffect(() => {}, [dispatch]);
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
        <TextBox
          className="input"
          type="text"
          placeholder="일기(300자 제한)"
          // style={formStyle.textArea}

          maxLength="300"
          // rows="5"
          defaultValue={
            currentDiary !== undefined && currentDiary?.length !== 0
              ? currentDiary[0].diary
              : ""
          }
          {...register("text")}
        />

        <DiaryBtn style={{ margin: "0 auto", marginTop: "10px" }} type="submit">
          SUBMIT
        </DiaryBtn>
      </form>
    </>
  );
}
export default TextArea;
