import React from "react";
import classes from "./Logo.module.scss";
const Logo = () => {
  return (
    <div className={classes.logo__wrapper}>
      <div className={classes.logo__background}>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
        <div className={classes.logo__stars}></div>
      </div>
      {/* <img
        src={`${process.env.PUBLIC_URL}/image/main/page3.svg`}
        alt="page3"
        className={classes.logo__main}
      /> */}
    </div>
  );
};

export default Logo;
