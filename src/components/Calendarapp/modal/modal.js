import React, { useEffect, useState } from "react";
import "./modal.scss";
import Flipcard from "./inmodal/card/card";
import Diary from "./inmodal/diary/diary";
import TextArea from "./inmodal/textarea/textarea";
import { useSelector } from "react-redux";

// import styled from 'styled-components'

function Modal({ date, toggle, calendarList }) {
  const toggleMention = useSelector((state) => state.Calendar.showMention);
  const currentDiary = calendarList?.filter((m) => m.date === date);
  useEffect(() => {}, [toggleMention]);
  return (
    <div className={`ModalBack ${toggle ? "" : "hidden"}`}>
      <div className="title">
        <p>{date}</p>
      </div>
      <div className="body_card">
        <Flipcard currentDiary={currentDiary} />
      </div>
      <div className="body_textarea">
        {toggleMention ? (
          <>
            <TextArea date={date} currentDiary={currentDiary}></TextArea>
          </>
        ) : (
          <Diary date={date} currentDiary={currentDiary} />
        )}
      </div>
    </div>
  );
}

export default Modal;
