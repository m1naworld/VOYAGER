import React from "react";
import classes from "./Page2.module.scss";
import { useLocation } from "react-router-dom";

const Page2 = () => {
  const { hash: path } = useLocation();
  return (
    <div
      className={`${classes.home__section} ${classes.home__section__2} section`}
    >
      <div className={classes.section__page2}>
        <div className={classes.title}>
          <pre>
            {`
"
골든 레코드는
인간이 자신을 어떻게 보고 싶어 하는지를
보여주는
아름다운 예술품일 뿐이다
"`}
          </pre>
          <span>-세리 웰슨 얀센-</span>
        </div>
        <img
          className={
            path === "#page-2"
              ? `${classes.active} ${classes.disable}`
              : classes.disable
          }
          src={`${process.env.PUBLIC_URL}/image/page2_brush.png`}
          alt="page2_brush"
        />
      </div>
    </div>
  );
};

export default Page2;
