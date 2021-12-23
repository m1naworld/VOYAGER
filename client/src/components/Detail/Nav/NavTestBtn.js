import React from "react";
import classes from "./NavTestBtn.module.scss";

const STYLES = ["btn__primary", "btn__outline"];
const SIZES = ["btn__medium", "btn__large"];

const NavTestBtn = ({ children, type, onClick, buttonStyle, buttonSize }) => {
  const checkBtnStyle = STYLES.includes(buttonStyle)
    ? classes[buttonStyle]
    : classes[STYLES[0]];

  const checkBtnSize = SIZES.includes(buttonSize)
    ? classes[buttonSize]
    : classes[SIZES[0]];
  return (
    <button
      className={`${classes.btn} ${checkBtnStyle} ${checkBtnSize}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

export default NavTestBtn;
