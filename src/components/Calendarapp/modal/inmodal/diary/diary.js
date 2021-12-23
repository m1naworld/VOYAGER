import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { editMention } from "../../../../../redux/reducer/CalendarReducer";

const DiaryResults = styled.div`
  width: 80%;
  height: 80%;
  text-align: left;
  overflow: auto;
  text-align: center;
  font-size: 1.8rem;
  padding: 110px 0;
  height: 300px;
  overflow-x: hidden;
  word-wrap: break-word;
  & span {
    white-space: pre;
  }
  @media screen and (max-width: 420px) {
    height: 200px;
    padding: 0;
    & span {
      white-space: normal;
    }
  }
`;

export const DiaryBtn = styled.button`
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
  @media screen and (max-width: 400px) {
    padding: 0;
  }
`;

function Diary({ currentDiary }) {
  const dispatch = useDispatch();

  return (
    <>
      <DiaryResults className="diary-result">
        {currentDiary !== undefined && currentDiary?.length !== 0 && (
          <span>{currentDiary[0].diary}</span>
        )}
      </DiaryResults>
      <div>
        <DiaryBtn
          onClick={() => {
            dispatch(editMention(true));
          }}
        >
          수정
        </DiaryBtn>
        <DiaryBtn>삭제</DiaryBtn>
      </div>
    </>
  );
}

export default Diary;
