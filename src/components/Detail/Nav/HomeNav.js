import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import classes from "./HomeNav.module.scss";
const HomeNav = () => {
  const [toggle, setToggle] = useState(false);
  const handleClick = useCallback(() => {
    setToggle(!toggle);
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
        <Link to="" className={classes.link}>
          <span>Home</span>
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
        <Link to="/logout" className={classes.link}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default HomeNav;
