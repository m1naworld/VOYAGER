import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import KakaoAuth from "../components/oauth/KakaoAuth";
import Regist from "../components/Home/Regist";
import NaverAuth from "../components/oauth/NaverAuth";
import Home from "../components/Home/Home";
import Detail from "../components/Detail/Detail";
import Profile from "../components/Detail/Profile";
import Nav from "../components/Detail/Nav/Nav";
import PrivateRouter from "./PrivateRouter";

import { useSelector } from "react-redux";
const GoToMain = () => {
  return <Navigate to="/" />;
};

function Router() {
  const loggedIn = useSelector((state) => state.toggle.isLoggedIn);
  console.log(loggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRouter />}>
          <Route path="" element={<Home />} />
          <Route path="join" element={<Regist />} />
          <Route path="home" element={<Home />} />
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
        </Route>
        <Route path="/oauth" element={<AuthRouter />}>
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
      <Outlet />
    </>
  );
}

export default Router;
