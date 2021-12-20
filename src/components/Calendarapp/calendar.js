import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "./modal/modal";
import "./calendar.scss";
import {
  editMention,
  getCalendar,
  getCalendarList,
} from "../../redux/reducer/CalendarReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Calendar() {
  const [toggle, setToggle] = useState(false);
  const [modalDate, SetModalDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
  );
  const [calendarDate, setCalendarDate] = useState(
    `${new Date().getFullYear()}-${new Date().getMonth() + 1}`
  );
  const dispatch = useDispatch();
  const calendarList = useSelector(getCalendarList);

  const handleDateSelect = (e) => {
    const date = e.date;
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    if (month < 10) {
      month = `0${month}`;
    }
    const result = `${year}-${month}-${day}`;
    SetModalDate(result);
    setToggle(true);
  };

  useEffect(() => {
    dispatch(getCalendar(calendarDate));
  }, [dispatch, getCalendarList]);

  return (
    <>
      <div className="calendarmain">
        <div className="background-container">
          <div className="stars"></div>
        </div>
        <div className="calendarapp">
          <FullCalendar
            contentHeight={"75vh"}
            plugins={[dayGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "today",
            }}
            titleFormat={function (date) {
              const currentDate = date.date;
              const year = currentDate.year;
              let month = currentDate.month + 1;
              let day = currentDate.day;
              if (day < 10) {
                day = `0${day}`;
              }
              if (month < 10) {
                month = `0${month}`;
              }
              const result = `${year}-${month}`;
              setCalendarDate(result);
              return `${date.date.year}년 ${date.date.month + 1}월`;
            }}
            dayHeaderContent={function (date) {
              let weekList = ["일", "월", "화", "수", "목", "금", "토"];
              return weekList[date.dow];
            }}
            // editable={true}
            // selectable={true}
            dateClick={handleDateSelect}
            eventDisplay="background"
            events={calendarList?.map((m) => {
              return {
                date: m.date,
                description: m.diary,
                Pcolor: m.color,
                style: {
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  zIndex: -1,
                },
              };
            })}
            eventContent={(eventInfo) => {
              return eventInfo.event.extendedProps.Pcolor ? (
                <div
                  style={{
                    height: "100%",
                  }}
                >
                  <div style={{ ...eventInfo.event.extendedProps.style }}>
                    <div
                      className="event-content__wrapper"
                      style={{
                        backgroundColor: eventInfo.event.extendedProps.Pcolor,
                      }}
                    >
                      <img
                        src={`${process.env.PUBLIC_URL}/image/planetmark.png`}
                        alt="mark"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                ""
              );
            }}
          />
        </div>
        <Modal date={modalDate} toggle={toggle} calendarList={calendarList} />
        {toggle && (
          <>
            <div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: "0",
                left: "0",
                backgroundColor: "gray",
                opacity: "0.55",
                zIndex: 2,
              }}
              onClick={() => {
                dispatch(editMention(false));
                setToggle(false);
              }}
            ></div>
          </>
        )}
      </div>
    </>
  );
}

export default Calendar;
