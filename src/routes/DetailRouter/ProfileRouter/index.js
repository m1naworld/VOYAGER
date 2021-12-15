import classes from "./ProfileRouter.module.scss";

import { Outlet } from "react-router-dom";

const ProfileRouter = () => {
  return (
    <section className={classes.profile__section}>
      <div className={classes.profile__wrapper}>
        <Outlet />
      </div>
      <img
        src={process.env.PUBLIC_URL + "/image/parallax/stars.png"}
        className={classes.profile__star}
        alt="stars"
      />
    </section>
  );
};

export default ProfileRouter;
