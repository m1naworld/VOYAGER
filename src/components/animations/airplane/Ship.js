import { useEffect, useState } from "react";
import classes from "./Ship.module.scss";
import Login from "../../Home/Login";

const Ship = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setTimeout(() => setStep(true), 2000);
  }, []);
  return (
    <>
      <section className={classes.section}>
        <div class={classes.ship__container}>
          <img
            className={classes.ship__ship}
            src="image/airplane/ship.png"
            alt="airplane"
          />
          {step ? (
            <>
              <div
                className={`${classes.ship__hook} ${classes.ship__left}`}
              ></div>
              <div
                className={`${classes.ship__hook} ${classes.ship__right}`}
              ></div>
            </>
          ) : (
            <>
              <div
                className={`${classes.ship__torch} ${classes.ship__left}`}
              ></div>
              <div
                className={`${classes.ship__torch} ${classes.ship__right}`}
              ></div>
            </>
          )}
          <div className={classes.smoke}>
            <div className={classes.smoke_bubble} id="sb1"></div>
            <div className={classes.smoke_bubble} id="sb2"></div>
            <div className={classes.smoke_bubble} id="sb3"></div>
            <div className={classes.smoke_bubble} id="sb4"></div>
            <div className={classes.smoke_bubble} id="sb5"></div>
            <div className={classes.smoke_bubble} id="sb6"></div>
            <div className={classes.smoke_bubble} id="sb7"></div>
            <div className={classes.smoke_bubble} id="sb8"></div>
            <div className={classes.smoke_bubble} id="sb9"></div>
            <div className={classes.smoke_bubble} id="sb10"></div>
            <div className={classes.smoke_bubble} id="sb11"></div>
            <div className={classes.smoke_bubble} id="sb12"></div>
          </div>
          {/* <img
        className={`${classes.ship__fire} ${classes.ship__left}`}
        src="image/airplane/fire2.png"
        alt="fire"
      />
      <img
        className={`${classes.ship__fire} ${classes.ship__right}`}
        src="image/airplane/fire2.png"
        alt="fire"
      /> */}
        </div>
      </section>
      <Login />
    </>
  );
};

export default Ship;
