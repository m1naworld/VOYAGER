import React from "react";
import classes from "./AstronautSpinner.module.scss";

const AstronautSpinner = ({ setStyle }) => {
  return (
    <div className={classes.astSpinner__main} style={{ ...setStyle }}>
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
            width: "40%",
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
