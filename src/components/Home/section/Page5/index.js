import React from "react";
import classes from "./Page5.module.scss";
import { Link, useLocation } from "react-router-dom";
const Page5 = () => {
  const { hash: path } = useLocation();
  return (
    <div className={`${classes.home__section5} section`}>
      <section className={classes.home__section5__section}>
        <div className={classes.page5__text}>
          <h2>Daily Questions</h2>
          <br />
          <h1>질문엔 답변을.</h1>
          <br />
          <pre>{`매일 제공되는 질문들에 대한 답변을 작성해주세요.
짧은 말로 답을 하기 위해 더 신중하게 생각하세요.

내가 살았던 오늘 하루의 작은 부분도 기록해보세요.`}</pre>
          <br />
          <br />
          <Link to="/about">
            <button>MORE</button>
          </Link>
        </div>
        <img
          className={
            path === "#page-5"
              ? `${classes.page5__img} ${classes.page5__img__active}`
              : classes.page5__img
          }
          src={`${process.env.PUBLIC_URL}/image/main/page5.png`}
          alt="svgpage4"
        />
      </section>
    </div>
  );
};

export default Page5;
