import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { editMention } from "../../../../../redux/reducer/CalendarReducer";

const DiaryResults = styled.div`
  width: 80%;
  height: 80%;
  /* border: 2px solid tomato; */
  text-align: left;
  overflow: auto;
`;

const DiaryDelBtn = styled.div`
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
export const DiaryBtn = styled.div`
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
          <pre>{currentDiary[0].diary}</pre>
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
        {/* {check && <p>{window.localStorage.getItem('mention')}</p>} */}
      </div>
    </>
  );
}

export default Diary;
