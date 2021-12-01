import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import KakaoAuth from "../components/oauth/KakaoAuth";
import Regist from "../components/Home/Regist";
import NaverAuth from "../components/oauth/NaverAuth";
import Home from "../components/Home/Home";
import Detail from "../components/Detail/Detail";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRouter />}>
          <Route path="" element={<Home />} />
          <Route path="profile" element={<Detail />} />
          <Route path="join" element={<Regist />} />
          <Route path="home" element={<Home />} />
          <Route path="detail" element={<Detail />} />
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

export default Router;
