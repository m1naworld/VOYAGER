import axios from "axios";
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import Spinner from "../animations/Spinner/Spinner";
import { useDispatch } from "react-redux";
import {
  editError,
  editUser,
  toggleLogin,
} from "../../redux/reducer/ToggleReducer";

function NaverAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const naver = useCallback(async () => {
    const login = new window.naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_KEY,
      clientSecret: process.env.REACT_APP_NAVER_SECRET,
      callbackUrl: `${window.location.origin}/oauth/naver`,
      callbackHandle: true,
      isPopup: false,
      // loginButton: {
      //   color: "green",
      //   type: 3,
      //   height: 10,
      // },
    });
    login.init();
    login.getLoginStatus(async (status) => {
      if (status) {
        let {
          id: snsId,
          email,
          gender,
          age,
          birthday: birth,
          name,
          mobile: phone,
          birthyear,
        } = login.user;

        birth = birth.split("-").join("");
        phone = phone.split("-").join("");

        const data = {
          provider: "naver",
          snsId,
          email,
          name,
          gender,
          age,
          birth,
          birthyear,
          phone,
        };
        console.log(login.user);
        try {
          const result = await axios.post("/api/auth/access", data);
          dispatch(editUser(result.data.user));
          dispatch(toggleLogin(true));
          navigate("/");
        } catch (err) {
          dispatch(toggleLogin(err.response.data.success));
          dispatch(editError(err.response.data.message));
          navigate("/login");
        }
      }
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    naver();
  }, [naver]);

  return <Spinner />;
}

export default NaverAuth;
