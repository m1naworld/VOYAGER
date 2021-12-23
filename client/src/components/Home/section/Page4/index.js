import React from "react";
import classes from "./Page4.module.scss";
import { Link, useLocation } from "react-router-dom";

const Page4 = () => {
  const { hash: path } = useLocation();
  return (
    <div className={`${classes.home__section4} section`}>
      <section className={classes.home__section4__section}>
        <img
          className={
            path === "#page-4"
              ? `${classes.page4__img} ${classes.page4__img__active}`
              : classes.page4__img
          }
          src={`${process.env.PUBLIC_URL}/image/main/page4.png`}
          alt="svgpage4"
        />
        <div className={classes.page4__text__form}>
          <h2>COLOR COLLECTION</h2>
          <br />
          <h1>오늘의 감정을 색깔로</h1>
          <br />
          <pre>{`오늘의 감정에 대한 질문에 답을 한다면 그에 맞는 색깔을 줄께요.
지금까지 수집한 색깔들로 당신의 우주를 채워 볼 수 있습니다.

오늘의 감정을 말해주세요. 색깔을 비춰드립니다.`}</pre>
          <br />
          <br />
          <Link to="/about">
            <button>MORE</button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page4;
