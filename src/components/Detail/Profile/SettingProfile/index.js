import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import classes from "./SettingProfile.module.scss";
let birthday;
const SettingProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [social, setSocial] = useState(false);
  const { state } = location;
  if (state?.birth) {
    console.log(state);
    if (state.birthyear) {
      birthday = `${state?.birthyear}-${state?.birth?.substring(
        0,
        2
      )}-${state?.birth?.substring(2, 4)}`;
    } else {
      birthday = `${state?.birth?.substring(0, 2)}-${state?.birth?.substring(
        2,
        4
      )}`;
    }
  }
  useEffect(() => {
    if (state.provider === "local") {
      setSocial(true);
    }
  }, []);
  return (
    <div className={classes.setting__wrapper}>
      <label htmlFor="name">이름</label>
      <input
        readOnly
        name="name"
        value={state?.name}
        className={classes.profile__input}
      />

      <label htmlFor="email">이메일</label>
      <input
        readOnly
        name="email"
        style={{ backgroundColor: `${!state?.email ? "#4e4e4e" : "white"}` }}
        value={state?.email ?? "-"}
        className={classes.profile__input}
      />
      <label htmlFor="birthday">생일</label>
      <input
        readOnly
        name="birthday"
        style={{ backgroundColor: `${!birthday ? "#4e4e4e" : "white"}` }}
        value={birthday ?? "-"}
        className={classes.profile__input}
      />
      <label htmlFor="phone]">전화번호</label>
      <input
        readOnly
        className={classes.profile__input}
        name="phone"
        style={{ backgroundColor: `${!state?.phone ? "#4e4e4e" : "white"}` }}
        value={state.phone ?? "-"}
      />
      {social ? (
        <button onClick={() => navigate("../password")} className={classes.btn}>
          비밀번호변경
        </button>
      ) : (
        ""
      )}

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
