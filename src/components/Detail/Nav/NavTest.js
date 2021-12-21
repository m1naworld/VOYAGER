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
      <Link
        to="/#page-1"
        style={{
          display: "flex",
          alignItems: "center",
          textDecorationLine: "none",
          underline: "none",
          color: "#5ddae9",
        }}
      >
        <img
          src={`${process.env.PUBLIC_URL}/image/logo2.png`}
          alt="logo"
          className={classes.navbar__logo}
        />
        <span>VOYAGER</span>
      </Link>

      <ul
        className={
          clicked
            ? `${classes.navbar__menu} ${classes.active}`
            : `${classes.navbar__menu}`
        }
      >
        {MenuItems.map((m, idx) =>
          m.title !== "SIGN UP" ? (
            <li key={idx}>
              <a className={classes[m.cName]} href={m.url}>
                {m.title}
              </a>
            </li>
          ) : (
            <li key={idx}>
              <Link
                className={
                  clicked
                    ? `${classes[m.cName]} ${classes.active}`
                    : classes[m.cName]
                }
                to={m.url}
              >
                {m.title}
              </Link>
            </li>
          )
        )}
      </ul>
      <NavTestBtn onClick={() => navigate("login")}>LOG IN</NavTestBtn>
    </nav>
  );
};

export default NavTest;
