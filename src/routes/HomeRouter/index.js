import NavTest from "../../components/Detail/Nav/NavTest";
import { Outlet, Navigate } from "react-router";
import classes from "./HomeRouter.module.scss";
// import { useSelector } from "react-redux";

function HomeRouter({ login }) {
  // const login = useSelector((state) => state.toggle.isLoggedIn);

  if (!login) {
    return (
      <div className={classes.homRouter__container}>
        <NavTest />
        <Outlet />
      </div>
    );
  } else if (login) {
    return <Navigate to="detail" />;
  }
  return (
    <>
      <Outlet />
    </>
  );
}

export default HomeRouter;
