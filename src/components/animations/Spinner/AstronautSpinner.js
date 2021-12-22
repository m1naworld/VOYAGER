import React from "react";
import classes from "./AstronautSpinner.module.scss";

const AstronautSpinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(32,32,32,0.9)",
        zIndex: "1000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          position: "relative",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginBottom: "120px",
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/image/ast.gif`}
          alt="loading"
          style={{
            // position: "absolute",
            // top: "50%",
            // left: "50%",

            width: "40%",
            // marginBottom: "50px",
            // transform: "translate(-50%,-50%)",
          }}
        />

        <div className={classes.astSpinner__loading}>
          <span>L</span>
          <span>O</span>
          <span>A</span>
          <span>D</span>
          <span>I</span>
          <span>N</span>
          <span>G</span>
        </div>
      </div>
    </div>
  );
};

export default AstronautSpinner;
