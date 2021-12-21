// Routers
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRouter from "./utils/PrivateRouter";
import NicknameRouter from "./NicknameRouter";
import FallBackMain from "./utils/FallBackMain";
import AuthRouter from "./AuthRouter";
import HomeRouter from "./HomeRouter";
import DetailRouter from "./DetailRouter";

// Components
import KakaoAuth from "../components/oauth/KakaoAuth";
import Regist from "../components/Home/Regist";
import NaverAuth from "../components/oauth/NaverAuth";
import Detail from "../components/Detail";
import Profile from "../components/Detail/Profile";
import Home from "../components/Home";
import DailyQuestion from "../components/DailyQuestion";

// Utils
import { useSelector } from "react-redux";
import EmailRouter from "./EmailRouter";
import EmailCheck from "../components/EmailCheck";
import PasswordCheck from "../components/PasswordCheck";
import ProfileRouter from "./DetailRouter/ProfileRouter";
import SettingProfile from "../components/Detail/Profile/SettingProfile";
import ProfileLogin from "../components/Detail/Profile/ProfileLogin";
import RemoveUser from "../components/Detail/Profile/RemoveUser";
import Login from "../components/Home/Login/Login";
import MainLogo from "../components/animations/MainLogo";
import Find from "../components/Home/Find";
import About from "../components/About";
import FindRouter from "./HomeRouter/FindRouter";
import FindEmail from "./HomeRouter/FindRouter/FindEmail";
import FindPassword from "./HomeRouter/FindRouter/FindPassword";
import Calendar from "../components/Calendarapp/calendar";
import ErrorPage from "../components/404";
import Slider from "../components/Detail/Pal";

function Router() {
  const loggedIn = useSelector((state) => state.toggle.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<HomeRouter login={loggedIn} />}>
          <Route path="" element={<Home />}>
            <Route path="" element={<MainLogo />} />
            <Route path="login" element={<Login />} />
            <Route path="login/find" element={<FindRouter />}>
              <Route path="" element={<Find />} />
              <Route path="email" element={<FindEmail />} />
              <Route path="password" element={<FindPassword />} />
            </Route>
          </Route>
          <Route path="join" element={<Regist />} />
          <Route path="logout" element={<div>Logout</div>} />
        </Route>
        <Route path="detail" element={<DetailRouter login={loggedIn} />}>
          <Route path="" element={<NicknameRouter loggedIn={loggedIn} />} />
          <Route
            path="home"
            element={
              <PrivateRouter
                component={Detail}
                fallback={FallBackMain}
                user={loggedIn}
              />
            }
          />
          <Route path="dailyQuestion" element={<DailyQuestion />} />
          <Route path="surveyQuestion" element={<Slider />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="profile" element={<ProfileRouter />}>
            <Route path="" element={<Profile />} />
            <Route path="settings" element={<SettingProfile />} />
            <Route path="password" element={<ProfileLogin />} />
            <Route path="removeUser" element={<RemoveUser />} />
          </Route>
        </Route>
        <Route path="oauth" element={<AuthRouter />}>
          <Route path="kakao" element={<KakaoAuth />} />
          <Route path="naver" element={<NaverAuth />} />
        </Route>
        <Route path="auth" element={<EmailRouter />}>
          <Route path="password" element={<PasswordCheck />} />
          <Route path="email" element={<EmailCheck />} />
        </Route>
        <Route path="about" element={<About />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
