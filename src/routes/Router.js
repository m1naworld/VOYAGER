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
import Detail from "../components/Detail/Detail";
import Profile from "../components/Detail/Profile";
import Nav from "../components/Detail/Nav/Nav";
import PrivateRouter from "./PrivateRouter";

import { useSelector } from "react-redux";
import Airplane from "../components/animations/airplane/Airplne";
import Ship from "../components/animations/airplane/Ship";
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
        <Route path="" element={<HomeRouter />}>
          <Route path="" element={<Ship />} />
          <Route path="join" element={<Regist />} />
        </Route>
        <Route path="/detail" element={<DetailRouter />}>
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
      <>
        <Outlet />
      </>
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
      <Outlet />
    </>
  );
}

export default Router;
