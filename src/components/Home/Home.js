import React, { useEffect, useCallback, useState } from "react";
import Ship from "../animations/airplane/Ship";
import HomeNav from "../Detail/Nav/HomeNav";
import NavTest from "../Detail/Nav/NavTest";
import classes from "./Home.module.scss";
import ReactFullpage from "@fullpage/react-fullpage";

const Home = () => {
  return (
    <div
      style={{
        width: "100vw",
        background: "teal",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 5%",
      }}
      onScroll={() => console.log("SCROLL")}
    >
      {/* <NavTest /> */}

      <ReactFullpage
        //fullpage options
        licenseKey={"2E84F30F-B2A14C7F-AA0EA463-F1F631DC"}
        scrollBar={false}
        scrollingSpeed={800}
        lazyLoading={true}
        autoScrolling={true}
        continuousVertical={true}
        recordHistory={true}
        // anchors={["pre-1800", "1800", "1810", "1820"]}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className={`${classes.home__section} section`}>
                <div
                  style={{
                    width: "100%",
                    height: "90%",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="image/space.gif"
                    loop={true}
                    alt="space-background"
                    className={classes.home__img}
                  />
                  <Ship />
                </div>
              </div>
              <div className={`${classes.home__section} section`}></div>
              <div className={`${classes.home__section} section`}></div>
              <div className={`${classes.home__section} section`}></div>
              <div className={`${classes.home__section} section`}></div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Home;
