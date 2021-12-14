import React from "react";
import { useNavigate } from "react-router-dom";
import classes from "./SettingProfile.module.scss";
const SettingProfile = () => {
  const navigate = useNavigate();
  return (
    <div className={classes.setting__wrapper}>
      <button onClick={() => navigate("../password")} className={classes.btn}>
        비밀번호변경
      </button>
      <button
        onClick={() => navigate("../removeUser")}
        className={`${classes.btn} ${classes.exit}`}
      >
        회원탈퇴
      </button>
      <hr />
      <button
        onClick={() => navigate("../")}
        className={`${classes.btn} ${classes.last}`}
      >
        돌아가기
      </button>
    </div>
  );
};

export default SettingProfile;
