import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { getDailyQs, postDailyQs } from "../../redux/reducer/DailyQsReducer";
import { editUser } from "../../redux/reducer/ToggleReducer";
import { getCalendar } from "../../redux/reducer/CalendarReducer";
import styles from "./Detail.module.scss";
import Pal from "./Pal";
import { useSelector } from "react-redux";
import axios from "axios";

function Detail() {
  const stars = useRef();
  const moon = useRef();
  const mountains_behind = useRef();
  const mountains_front = useRef();
  const text = useRef();
  const btn = useRef();
  const nickBtn = useRef();
  const [testOpen, setTestOpen] = useState(false);
  const [fetch, setFetch] = useState(false);

  const dispatch = useDispatch();

  // const dd = useSelector(getCalendarList);

  const postDailyQsData = useSelector((state) => {
    const { answer, id } = state.dailyQuestions;
    const data = { question: { _id: id }, answer };
    return data;
  });

  const data = useCallback(async () => {
    const qs = await dispatch(getDailyQs());
    await dispatch(getCalendar());
    return qs;
  }, []);

  const scrollEvent = useCallback(() => {
    let value = window.scrollY;
    try {
      stars.current.style.left = value * 0.25 + "px";
      moon.current.style.top = value * 1 + "px";
      mountains_behind.current.style.top = value * 0.5 + "px";
      mountains_front.current.style.top = value * 0 + "px";
      btn.current.style.marginTop = value * 1.5 + "px";
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    data();
    if (fetch) {
      console.log(postDailyQsData);
      dispatch(postDailyQs(postDailyQsData));
      setFetch(false);
    }

    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [fetch]);
  return (
    <>
      <section className={styles.mainSection}>
        <img
          src={process.env.PUBLIC_URL + "/image/parallax/stars.png"}
          id={styles["stars"]}
          alt="stars"
          ref={stars}
        />
        <img
          src={process.env.PUBLIC_URL + "/image/parallax/moon_fix.png"}
          id={styles["moon"]}
          alt="moon"
          ref={moon}
        />
        <img
          src={
            process.env.PUBLIC_URL + "/image/parallax/mountains_behind11.png"
          }
          id={styles["mountains_behind"]}
          alt="mountains_behind"
          ref={mountains_behind}
        />
        {/* <h2 id={styles["text"]} ref={text}>
          Moon Light
        </h2> */}
        <Link to="/dailyQuestion" id={styles["btn"]} ref={btn}>
          Explore
        </Link>
        <img
          src={process.env.PUBLIC_URL + "/image/parallax/mountains_behind2.png"}
          id={styles["mountains_front"]}
          alt="mountains_front"
          ref={mountains_front}
        />
      </section>
      <div className={styles.sec} id="sec">
        {testOpen ? (
          <Pal toggle={setTestOpen} fetch={fetch} setFetch={setFetch} />
        ) : (
          <button onClick={() => setTestOpen(true)}>OPEN SURVEY</button>
        )}
      </div>
    </>
    // </div>
  );
}

export default Detail;
