import React from "react";
import { Link } from "react-router-dom";
import classes from "./MainLogo.module.scss";
const MainLogo = () => {
  return (
    <>
      <img
        className={classes.ship__logo}
        src={process.env.PUBLIC_URL + "/image/logo2.png"}
        alt="favicon"
      />
      <h1 className={classes.ship__title}>VOYAGER</h1>
      {/* <button onClick={handleClick} className={classes.ship__btn}> */}
      <Link className={classes.MainLogo__link} to="login">
        LOGIN
      </Link>
      {/* </button> */}
    </>
  );
};

export default MainLogo;
