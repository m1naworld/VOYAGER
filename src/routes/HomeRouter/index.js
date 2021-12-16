import NavTest from "../../components/Detail/Nav/NavTest";
import { Outlet, Navigate } from "react-router";
import classes from "./HomeRouter.module.scss";
// import { useSelector } from "react-redux";

function HomeRouter({ login }) {
  if (!login) {
    return (
      <div className={classes.homRouter__container}>
        <NavTest />
        <Outlet />
      </div>
    );
  }
  return <Navigate to="detail" />;
}

export default HomeRouter;
