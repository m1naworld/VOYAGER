import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./Error.module.scss";

const ErrorPage = () => {
  const navigate = useNavigate();
  console.log(classes);
  return (
    <div className={classes.error__wrapper}>
      <h1>4 0 4</h1>
      <button onClick={() => navigate("/")}>HOME</button>
    </div>
  );
};

export default ErrorPage;
