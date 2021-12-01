import { useCallback, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Detail.module.scss";
import Pal from "./Pal";

function Detail() {
  const stars = useRef();
  const moon = useRef();
  const mountains_behind = useRef();
  const mountains_front = useRef();
  const text = useRef();
  const btn = useRef();

  const [testOpen, setTestOpen] = useState(false);

  const scrollEvent = useCallback(() => {
    let value = window.scrollY;
    stars.current.style.left = value * 0.25 + "px";
    moon.current.style.top = value * 1 + "px";
    mountains_behind.current.style.top = value * 0.5 + "px";
    mountains_front.current.style.top = value * 0 + "px";
    text.current.style.marginRight = value * 6 + "px";
    text.current.style.marginTop = value * 1.5 + "px";
    btn.current.style.marginTop = value * 1.5 + "px";
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", scrollEvent);
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, [scrollEvent]);
  return (
    <>
      <section className={styles.mainSection}>
        <img
          src="image/parallax/stars.png"
          id={styles["stars"]}
          alt="stars"
          ref={stars}
        />
        <img
          src="image/parallax/moon_fix.png"
          id={styles["moon"]}
          alt="moon"
          ref={moon}
        />
        <img
          src="image/parallax/mountains_behind11.png"
          id={styles["mountains_behind"]}
          alt="mountains_behind"
          ref={mountains_behind}
        />
        <h2 id={styles["text"]} ref={text}>
          Moon Light
        </h2>
        <Link to="#" id={styles["btn"]} ref={btn}>
          Explore
        </Link>
        <img
          src="image/parallax/mountains_behind2.png"
          id={styles["mountains_front"]}
          alt="mountains_front"
          ref={mountains_front}
        />
      </section>
      <div className={styles.sec} id="sec">
        {testOpen ? (
          <Pal toggle={setTestOpen} />
        ) : (
          <button onClick={() => setTestOpen(true)}>OPEN SURVEY</button>
        )}
      </div>
    </>
    // </div>
  );
}

export default Detail;
