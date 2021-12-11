import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  Link,
} from "react-router-dom";
import KakaoAuth from "../components/oauth/KakaoAuth";
import Regist from "../components/Home/Regist";
import NaverAuth from "../components/oauth/NaverAuth";
import Detail from "../components/Detail/Detail";
import Profile from "../components/Detail/Profile";
import Nav from "../components/Detail/Nav/Nav";
import PrivateRouter from "./PrivateRouter";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";

import { changeNickname } from "../redux/reducer/ToggleReducer";

import Home from "../components/Home/Home";
import NavTest from "../components/Detail/Nav/NavTest";
import DailyQuestion from "../components/DailyQuestion";
import { useRef, useState } from "react";
import axios from "axios";

import classes from "./nickname.module.scss";

const GoToMain = () => {
  return <Navigate to="/" />;
};

const GoToDetail = ({ loggedIn }) => {
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
      {/* <img src={`${process.env.PUBLIC_URL}image/spacegif.`} */}
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
        {/* <img src={`${process.env.PUBLIC_URL}image/astrnt.gif`} alt="astrnt" /> */}
      </div>
      <div className={classes.img__container}></div>
    </div>
  ) : (
    <Navigate to="home" />
  );
};

function Router() {
  const loggedIn = useSelector((state) => state.toggle.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRouter />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<h1>ABOUT</h1>} />
          <Route path="join" element={<Regist />} />
          <Route path="logout" element={<div>123123</div>} />
        </Route>
        <Route path="detail" element={<DetailRouter />}>
          <Route path="" element={<GoToDetail loggedIn={loggedIn} />} />
          <Route
            path="home"
            element={
              <PrivateRouter
                component={Detail}
                fallback={GoToMain}
                user={loggedIn}
              />
            }
          />

          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="dailyQuestion" element={<DailyQuestion />} />
        <Route path="oauth" element={<AuthRouter />}>
          <Route path="kakao" element={<KakaoAuth />} />
          <Route path="naver" element={<NaverAuth />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function AuthRouter() {
  return (
    <>
      <Outlet />
    </>
  );
}

function HomeRouter() {
  const login = useSelector((state) => state.toggle.isLoggedIn);

  if (!login) {
    return (
      <div
        style={{
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 5vw",
        }}
        onScroll={() => console.log("SCROLL")}
      >
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

function DetailRouter() {
  let user = useSelector((state) => state.toggle.user);

  console.log(user);
  return (
    <>
      <Nav />
      <Link
        to="profile"
        style={{
          width: "50px",
          height: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // border: "1px solid coral",
          background: "linear-gradient(#202363, #138eb3)",
          borderRadius: "50%",
          position: "fixed",
          top: "3%",
          right: "2%",
          zIndex: 10000,
        }}
        onClick={() => console.log("click")}
      >
        <img
          src={
            process.env.REACT_APP_SERVER_URL +
            "/" +
            (user.img ?? process.env.REACT_APP_DEFAULT_IMG)
          }
          alt="moon"
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
          }}
        />
      </Link>
      <Outlet />
    </>
  );
}

export default Router;
