import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { Link } from "react-router-dom";
import Nav from "../../components/Detail/Nav/Nav";

import classes from "./DetailRouter.module.scss";

function DetailRouter() {
  let user = useSelector((state) => state.toggle.user);
  // Object.keys(user).length
  // user ?? Object.keys(user).length

  return (
    <>
      <Nav />
      <Link to="profile" className={classes.detailRouter__links}>
        <img
          src={
            process.env.REACT_APP_SERVER_URL +
            "/" +
            (user?.img ?? process.env.REACT_APP_DEFAULT_IMG)
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
