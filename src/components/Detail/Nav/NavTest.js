import React, { useCallback, useState } from "react";
import classes from "./NavTest.module.scss";
import { MenuItems } from "./MenuItems";
import { Link } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import NavTestBtn from "./NavTestBtn";
import { useNavigate } from "react-router";

const NavTest = () => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = useCallback(() => {
    setClicked(!clicked);
  }, [clicked]);

  return (
    <nav className={classes.navbar__Items}>
      <Link to="/">
        <img src="image/logo.png" alt="logo" className={classes.navbar__logo} />
      </Link>

      <div className={classes.navbar__menu_icon} onClick={handleClick}>
        {clicked ? (
          <FaTimes className={classes.fa__times} />
        ) : (
          <FaBars className={classes.fa__bar} />
        )}
      </div>
      <ul
        className={
          clicked
            ? `${classes.navbar__menu} ${classes.active}`
            : `${classes.navbar__menu}`
        }
      >
        {MenuItems.map((m, idx) => {
          return (
            <li key={idx}>
              <Link className={classes[m.cName]} to={m.url}>
                {m.title}
              </Link>
            </li>
          );
        })}
      </ul>
      <NavTestBtn onClick={() => navigate("join")}>Sign Up</NavTestBtn>
    </nav>
  );
};

export default NavTest;
