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

function Router() {
  const loggedIn = useSelector((state) => state.toggle.isLoggedIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeRouter login={loggedIn} />}>
          <Route path="" element={<Home />} />
          <Route path="join" element={<Regist />} />
          <Route path="about" element={<h1>ABOUT</h1>} />
          <Route path="logout" element={<div>Logout</div>} />
        </Route>
        <Route path="detail" element={<DetailRouter />}>
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

          <Route path="profile" element={<ProfileRouter />}>
            <Route path="" element={<Profile />} />
            <Route path="settings" element={<SettingProfile />} />
            <Route path="password" element={<ProfileLogin />} />
            <Route path="removeUser" element={<RemoveUser />} />
          </Route>
        </Route>
        <Route path="dailyQuestion" element={<DailyQuestion />} />
        <Route path="oauth" element={<AuthRouter />}>
          <Route path="kakao" element={<KakaoAuth />} />
          <Route path="naver" element={<NaverAuth />} />
        </Route>
        <Route path="auth" element={<EmailRouter />}>
          <Route path="password" element={<PasswordCheck />} />
          <Route path="email" element={<EmailCheck />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
