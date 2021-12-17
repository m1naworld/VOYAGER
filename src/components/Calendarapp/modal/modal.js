import React, { useEffect, useState } from "react";
import "./modal.scss";
import Flipcard from "./inmodal/card/card";
import Diary from "./inmodal/diary/diary";
import TextArea, { DiarySaveBtn } from "./inmodal/textarea/textarea";

// import styled from 'styled-components'

function Modal({ date, toggle }) {
  const [showMention, setShowMention] = useState(false);
  const [showTextarea, setShowTextarea] = useState(true);
  // const Savediary = () => {
  //   setShowMention(true);
  // };

  // const ShowupTextarea = () => setShowTextarea(false);

  const [mention, setMention] = useState(null);

  useEffect(() => {}, [toggle]);

  return (
    <div className={`ModalBack ${toggle ? "" : "hidden"}`}>
      <div className="title">
        <p>{date}</p>
      </div>
      <div className="body_card">
        <Flipcard />
      </div>
      <div className="body_textarea">
        {showMention ? (
          <>
            <TextArea date={date} setShowMention={setShowMention}>
              {/* {!diary.length !== 0 ? diary[0]?.mention : ""} */}
            </TextArea>
            {/* <DiarySaveBtn className="diary-save" onClick={Savediary}>
              저장fd
            </DiarySaveBtn> */}
          </>
        ) : (
          <Diary setShowMention={setShowMention} date={date} />
        )}

        {/* {showMention && <Diary setShowMention={setShowMention} date={date} />} */}
        {/* <div className="saveBtn" onClick={SaveBtn}>저장</div> */}
        {/* <SaveBtn /> */}
      </div>
    </div>
  );
}

export default Modal;
