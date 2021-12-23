import Ship from "../../../animations/airplane/Ship";
import classes from "./Page1.module.scss";

const FirshPage = () => {
  return (
    <div className={`${classes.home__section} section`}>
      <div className={classes.home__section__wrapper}>
        <img
          src={`${process.env.PUBLIC_URL}/image/space.gif`}
          loop={true}
          alt="space-background"
          className={classes.home__img}
        />
        <Ship />
      </div>
    </div>
  );
};

export default FirshPage;
