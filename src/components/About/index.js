import React, { useEffect, useRef, useState } from "react";
import classes from "./index.module.scss";
import { BsGithub, BsInstagram } from "react-icons/bs";
import { Link } from "react-router-dom";

const About = () => {
  const [number, setNumber] = useState(6);
  const ship = useRef();
  const handleMove = (e) => {
    const CENTER_X = window.innerWidth / 2;
    const CENTER_Y = window.innerHeight / 2;
    const x = CENTER_X - e.clientX;
    const y = CENTER_Y - e.clientY;
    const radian = Math.atan2(y, x);
    const degree = ((radian * 180) / Math.PI).toFixed(0);
    const degreeNum = Number(degree) - 90;
    try {
      ship.current.style.transform = "rotateZ(" + degreeNum + "deg)";
    } catch (err) {}
  };
  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  });
  return (
    <section className={classes.about__section}>
      <Link to="/" className={classes.about__link__logo}>
        <img src={process.env.PUBLIC_URL + "/image/logo2.png"} alt="home" />
      </Link>
      <div
        className={classes.about__section__wrapper}
        onClick={(e) => {
          setNumber(Number(e.target.attributes["data-index"]?.value ?? 6));
        }}
      >
        <div
          data-index={0}
          className={
            number === 0
              ? classes.clicked
              : `${classes.slide__1} ${classes.about}`
          }
        >
          <div className={classes.about__img__wrapper}>
            <img
              data-index={0}
              src={process.env.PUBLIC_URL + "/image/icons/raymond.png"}
              alt="moon"
            />
          </div>
          <h1>RAYMOND</h1>
          <div className={classes.about__content}>
            <h2>FRONT-END</h2>
            <div className={classes.about__link__wrapper}>
              <a
                href="https://github.com/raymondanythings"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub />
              </a>
              <a
                href="https://www.instagram.com/raymondanything/"
                target="_blank"
                rel="noreferrer"
              >
                <BsInstagram />
              </a>
            </div>
          </div>
        </div>
        <div
          data-index={1}
          className={
            number === 1
              ? classes.clicked
              : `${classes.slide__2} ${classes.about}`
          }
        >
          <div className={classes.about__img__wrapper}>
            <img
              data-index={1}
              src={process.env.PUBLIC_URL + "/image/icons/mina.png"}
              alt="moon"
            />
          </div>

          <h1>MINA</h1>
          <div className={classes.about__content}>
            <h2>BACK-END</h2>
            <div className={classes.about__link__wrapper}>
              <a
                href="https://github.com/m1naworld"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub />
              </a>
              <a
                href="https://www.instagram.com/m1naworld/"
                target="_blank"
                rel="noreferrer"
              >
                <BsInstagram />
              </a>
            </div>
          </div>
        </div>
        <div
          data-index={2}
          className={
            number === 2
              ? classes.clicked
              : `${classes.slide__3} ${classes.about}`
          }
        >
          <div className={classes.about__img__wrapper}>
            <img
              data-index={2}
              src={process.env.PUBLIC_URL + "/image/icons/brave.png"}
              alt="moon"
            />
          </div>

          <h1>BRAVE</h1>
          <div className={classes.about__content}>
            <h2>BACK-END</h2>
            <div className={classes.about__link__wrapper}>
              <a
                href="https://github.com/x86osx"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <BsInstagram />
              </a>
            </div>
          </div>
        </div>
        <div
          data-index={3}
          className={
            number === 3
              ? classes.clicked
              : `${classes.slide__4} ${classes.about}`
          }
        >
          <div className={classes.about__img__wrapper}>
            <img
              data-index={3}
              src={process.env.PUBLIC_URL + "/image/icons/deok.png"}
              alt="moon"
            />
          </div>

          <h1>DEOK</h1>
          <div className={classes.about__content}>
            <h2>BACK-END</h2>
            <div className={classes.about__link__wrapper}>
              <a
                href="https://github.com/Kyung-Deok"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <BsInstagram />
              </a>
            </div>
          </div>
        </div>
        <div
          data-index={4}
          className={
            number === 4
              ? classes.clicked
              : `${classes.slide__5} ${classes.about}`
          }
        >
          <div className={classes.about__img__wrapper}>
            <img
              data-index={4}
              src={process.env.PUBLIC_URL + "/image/icons/yeeda.png"}
              alt="moon"
            />
          </div>

          <h1>YEEDA</h1>
          <div className={classes.about__content}>
            <h2>BACK-END</h2>
            <div className={classes.about__link__wrapper}>
              <a
                href="https://github.com/yeedacoding"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <BsInstagram />
              </a>
            </div>
          </div>
        </div>
        <div
          data-index={5}
          className={
            number === 5
              ? classes.clicked
              : `${classes.slide__6} ${classes.about}`
          }
        >
          <div className={classes.about__img__wrapper}>
            <img
              data-index={5}
              src={process.env.PUBLIC_URL + "/image/icons/dovard.png"}
              alt="moon"
            />
          </div>

          <h1>DOVARD</h1>
          <div className={classes.about__content}>
            <h2>BACK-END</h2>
            <div className={classes.about__link__wrapper}>
              <a
                href="https://github.com/dovard"
                target="_blank"
                rel="noreferrer"
              >
                <BsGithub />
              </a>
              <a href="#" target="_blank" rel="noreferrer">
                <BsInstagram />
              </a>
            </div>
          </div>
        </div>
      </div>
      {number === 6 && (
        <img
          src={process.env.PUBLIC_URL + "/image/airplane/ship.png"}
          alt="ship"
          className={classes.ship}
          ref={ship}
        />
      )}
    </section>
  );
};

export default About;
