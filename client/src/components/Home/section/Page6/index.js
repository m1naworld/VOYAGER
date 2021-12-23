import React from "react";
import classes from "./Page6.module.scss";
import { useLocation } from "react-router-dom";

const Page6 = () => {
  const { hash: path } = useLocation();
  return (
    <div className={`${classes.home__section6} section`}>
      <section className={classes.home__section6__section}>
        <img
          className={
            path === "#page-6"
              ? `${classes.page6__img} ${classes.page6__img__active}`
              : classes.page6__img
          }
          src={`${process.env.PUBLIC_URL}/image/main/page6.svg`}
          alt="page6"
        />
        <div className={classes.page6__text}>
          <h1>다다를때까지</h1>
          <pre>{`
얼마나 표류할지, 어디에 도착할지,
그리고 그 다음이 무엇일지 까지

이 광활한 우주에서는 도무지 알 길이 없습니다.`}</pre>
        </div>
        <img
          className={classes.page6__ship}
          src={`${process.env.PUBLIC_URL}/image/main/ship.png`}
          alt="ship"
        />
      </section>
    </div>
  );
};

export default Page6;
