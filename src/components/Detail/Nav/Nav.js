import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./nav.module.scss";

const Nav = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  const handleLogout = useCallback(async () => {
    try {
      const res = await axios.get("/auth/logout");
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    const b = document.querySelector("body");
    // b.style.overflow = "hidden";
  }, [toggle]);

  return (
    <nav
      className={toggle ? `${classes.nav} ${classes.nav_open}` : classes.nav}
    >
      <div className={classes.menu_btn} onClick={handleClick}>
        <div
          className={
            toggle
              ? `${classes.line} ${classes.line__1} ${classes.line_cross}`
              : `${classes.line} ${classes.line__1}`
          }
        ></div>
        <div
          className={
            toggle
              ? `${classes.line} ${classes.line__2} ${classes.line_fade_out}`
              : `${classes.line} ${classes.line__2}`
          }
        ></div>
        <div
          className={
            toggle
              ? `${classes.line} ${classes.line__3} ${classes.line_cross}`
              : `${classes.line} ${classes.line__3}`
          }
        ></div>
      </div>

      <div
        className={
          toggle ? `${classes.nav_links} ${classes.fade_in}` : classes.nav_links
        }
      >
        <div
          style={{
            width: "100px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            // border: "1px solid coral",
            background: "linear-gradient(#202363, #138eb3)",
            borderRadius: "50%",
          }}
        >
          <img
            src="image/parallax/moon2.png"
            alt="moon"
            style={{
              width: "70px",
              height: "70px",
            }}
          />
        </div>
        <Link to="" className={classes.link}>
          Home
        </Link>
        <Link to="" className={classes.link}>
          Contact
        </Link>
        <Link to="profile" className={classes.link}>
          Profile
        </Link>
        <Link to="" className={classes.link}>
          About
        </Link>
        <Link to="" className={classes.link} onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
