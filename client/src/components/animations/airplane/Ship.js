import { useEffect, useState } from "react";
import classes from "./Ship.module.scss";
import { Outlet } from "react-router-dom";

const Ship = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    setTimeout(() => setStep(true), 1000);
  }, []);
  return (
    <>
      <section className={classes.section}>
        <div className={classes.ship__container}>
          <div className={classes.ship__shipCon}>
            <img
              className={classes.ship__ship}
              src={process.env.PUBLIC_URL + "/image/airplane/ship.png"}
              alt="airplane"
            />
            {step ? (
              <>
                {/* <div
                className={`${classes.ship__hook} ${classes.ship__left}`}
              ></div>
              <div
                className={`${classes.ship__hook} ${classes.ship__right}`}
              ></div> */}
                <img
                  className={`${classes.ship__fire} ${classes.ship__left}`}
                  src={process.env.PUBLIC_URL + "/image/airplane/fire2.png"}
                  alt="fire"
                />
                <img
                  className={`${classes.ship__fire} ${classes.ship__right}`}
                  src={process.env.PUBLIC_URL + "/image/airplane/fire2.png"}
                  alt="fire"
                />
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
          </div>
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
          <div className={classes.ship__content}>
            <main className={classes.login}>
              <section className={classes.login__section}>
                <Outlet />
              </section>
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Ship;
