import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import classes from "./nav.module.scss";
import { editUser, toggleLogin } from "../../../redux/reducer/ToggleReducer";
import { useDispatch } from "react-redux";
import { HiArrowCircleLeft } from "react-icons/hi";

const Nav = ({ back }) => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = useCallback(() => {
    if (back) {
      navigate("/detail/home");
    } else {
      setToggle(!toggle);
    }
  }, [toggle, back]);

  const handleLogout = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth/logout");
      dispatch(toggleLogin(false));
      dispatch(editUser(""));
      console.log(res);
    } catch (err) {}
  }, [dispatch]);
  useEffect(() => {}, [back]);
  return back ? (
    <HiArrowCircleLeft
      style={{
        color: "white",
        fontSize: "2.5rem",
        position: "absolute",
        left: "3%",
        top: "4%",
        cursor: "pointer",
        zIndex: "1000",
      }}
      onClick={() => navigate("/detail/home")}
    ></HiArrowCircleLeft>
  ) : (
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
