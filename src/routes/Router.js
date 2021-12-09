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

import { useSelector } from "react-redux";
import Airplane from "../components/animations/airplane/Airplne";
import Ship from "../components/animations/airplane/Ship";
import Home from "../components/Home/Home";
import NavTest from "../components/Detail/Nav/NavTest";
const GoToMain = () => {
  return <Navigate to="/" />;
};

const GoToDetail = () => {
  return <Navigate to="/detail" />;
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
          <Route
            path=""
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
          background: "teal",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "0 5%",
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
          src="image/parallax/moon2.png"
          alt="moon"
          style={{
            width: "30px",
            height: "30px",
          }}
        />
      </Link>
      <Outlet />
    </>
  );
}

export default Router;
