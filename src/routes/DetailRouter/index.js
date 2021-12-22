import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate, useLocation } from "react-router";
import { Link } from "react-router-dom";
import Nav from "../../components/Detail/Nav/Nav";

import classes from "./DetailRouter.module.scss";

function DetailRouter({ login }) {
  const [back, setBack] = useState(false);
  const user = useSelector((state) => state.toggle.user);
  const nickname = useSelector((state) => state.toggle.user?.nickname);
  const location = useLocation();

  // Object.keys(user).length
  // user ?? Object.keys(user).length
  console.log(location.pathname);
  useEffect(() => {
    if (
      location.pathname.includes("profile") ||
      location.pathname.includes("dailyQuestion") ||
      location.pathname.includes("surveyQuestion") ||
      location.pathname.includes("calendar")
    ) {
      setBack(true);
    } else {
      setBack(false);
    }
  }, [location]);

  if (!login) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {nickname && <Nav back={back} />}
      <Link to="profile" className={classes.detailRouter__links}>
        <img
          src={
            user?.img ??
            process.env.REACT_APP_PROFILE_IMG +
              "/" +
              process.env.REACT_APP_DEFAULT_IMG
          }
          alt="moon"
          className={classes.detailRouter__img}
        />
      </Link>
      <Outlet />
    </>
  );
}

export default DetailRouter;
