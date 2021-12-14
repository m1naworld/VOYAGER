import classes from "./ProfileRouter.module.scss";

import { Outlet } from "react-router-dom";

const ProfileRouter = () => {
  return (
    <section className={classes.profile__section}>
      <div className={classes.profile__wrapper}>
        <Outlet />
      </div>
    </section>
  );
};

export default ProfileRouter;
