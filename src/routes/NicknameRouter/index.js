import { useDispatch, useSelector } from "react-redux";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { changeNickname } from "../../redux/reducer/ToggleReducer";
import { Navigate } from "react-router-dom";
import classes from "./nickname.module.scss";
import axios from "axios";

const NicknameRouter = ({ loggedIn }) => {
  const dispatch = useDispatch();
  const [nick, setNick] = useState("");
  const navigate = useNavigate();
  let user = useSelector((state) => state.toggle.user);

  const nickBtn = useRef();
  const handleClick = async (e) => {
    try {
      const nickname = nickBtn.current.value;
      const res = await axios.post("/api/register/user/modify", { nickname });
      if (res.status === 200) {
        dispatch(changeNickname(res.data.nickname));
        navigate("home");
      }
      return res;
    } catch (e) {
      console.log(e);
      return e;
    }
  };
  if (!loggedIn) {
    return <Navigate to="/" />;
  }

  return user.nickname === undefined || user.nickname === null ? (
    <div className={classes.nickname__container}>
      <div className={classes.nickname__form}>
        <label>닉네임을 설정해주세요</label>
        <div>
          <input
            type="text"
            value={nick}
            onChange={(v) => setNick(v.target.value)}
            ref={nickBtn}
          />
          <button onClick={handleClick}>DONE</button>
        </div>
      </div>
      <div className={classes.img__container}></div>
    </div>
  ) : (
    <Navigate to="home" />
  );
};

export default NicknameRouter;
