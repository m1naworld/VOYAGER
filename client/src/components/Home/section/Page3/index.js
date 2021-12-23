import React from "react";
import classes from "./Page3.module.scss";
import Logo from "./Logo";

const Page3 = () => {
  return (
    <div className={`${classes.home__section3} section`}>
      <section className={classes.home__section3__section}>
        <Logo />
        <pre className={classes.home__section3__pre}>
          {`
WE
ARE
TRAVELERS

`}
        </pre>
      </section>
    </div>
  );
};

export default Page3;
