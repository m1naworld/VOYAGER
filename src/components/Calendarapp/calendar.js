import React, { useEffect, useState } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import Modal from "./modal/modal";
import "./calendar.scss";
import {
  clickedDay,
  getCalendar,
  getCalendarList,
} from "../../redux/reducer/CalendarReducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Calendar() {
  const [weekendsVisible, setWeekendVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [modalDate, SetModalDate] = useState("");
  const dispatch = useDispatch();
  // const calendarList = useSelector(getCalendarList);

  const handleEvents = (events) => {
    setCurrentEvents(events);
  };

  // const handleWeekendsToggle = () => {
  //   setWeekendVisible(!weekendsVisible)
  // }

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
    dispatch(clickedDay(result));
    SetModalDate(result);
    setToggle(true);
  };

  useEffect(() => {
    dispatch(getCalendar());
    return () => {
      setTimeout(() => console.log("OK"), 3000);
    };
  }, [dispatch]);

  return (
    <>
      <div className="calendarmain">
        <div className="background-container">
          <div className="stars"></div>
          {/* <div className="twinkling"></div> */}
        </div>
        <div className="calendarapp">
          <FullCalendar
            // contentHeight={400}
            contentHeight={"75vh"}
            plugins={[dayGridPlugin, interactionPlugin]}
            // events={[
            //   {
            //     date: '2021-12-20',
            //     url: 'https://images.unsplash.com/photo-1638984849670-7f41daa1ba6c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=1000&q=60',
            //     title: ""
            //   },
            // ]}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "today",
            }}
            // locale={"ko"}
            titleFormat={function (date) {
              return `${date.date.year}년 ${date.date.month + 1}월`;
            }}
            dayHeaderContent={function (date) {
              let weekList = ["일", "월", "화", "수", "목", "금", "토"];
              return weekList[date.dow];
            }}
            // initialView='dayGridMonth'

            editable={false}
            selectable={true}
            // unselectAuto={true}
            weekends={weekendsVisible}
            dateClick={handleDateSelect}
            // eventContent={renderEventContent} // custom render function
            // eventClick={handleEventClick}
            eventsSet={handleEvents} // called after events are initialized/added/changed/removed
            /* you can update a remote database when these fire: */
            // eventAdd={addEvents}
            /* eventChange={function(){}}
                eventRemove={function(){}}
                */
          />
        </div>
        <Modal date={modalDate} toggle={toggle} />
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
              onClick={() => setToggle(false)}
            ></div>
          </>
        )}
      </div>
    </>
  );
}

export default Calendar;
