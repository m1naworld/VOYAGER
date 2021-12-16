import axios from "axios";
import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./nav.module.scss";
import { editUser, toggleLogin } from "../../../redux/reducer/ToggleReducer";
import { useDispatch } from "react-redux";

const Nav = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const handleClick = useCallback(() => {
    setToggle(!toggle);
  }, [toggle]);

  const handleLogout = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      dispatch(toggleLogin(false));
      dispatch(editUser(""));
      console.log(res);
    } catch (err) {}
  }, [dispatch]);

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
        <Link to="" className={classes.link} onClick={handleClick}>
          Home
        </Link>
        <Link to="calendar" className={classes.link} onClick={handleClick}>
          Calendar
        </Link>
        <Link to="profile" className={classes.link} onClick={handleClick}>
          Profile
        </Link>
        <Link to="/about" className={classes.link} onClick={handleClick}>
          About
        </Link>
        <Link to="/logout" className={classes.link} onClick={handleLogout}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default Nav;
