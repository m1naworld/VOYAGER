import axios from "axios";
import { useCallback, useEffect } from "react";
import NaverButton from "../button/NaverButton";
import { useNavigate } from "react-router";
import KakaoButton from "../button/KakaoButton";
import { useDispatch } from "react-redux";
import { editUser, toggleLogin } from "../../redux/reducer/ToggleReducer";

function NaverAuth() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const naver = useCallback(async () => {
    const login = new window.naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_KEY,
      clientSecret: process.env.REACT_APP_KAKAO_SECRET,
      callbackUrl: `${window.location.origin}/oauth/naver`,
      callbackHandle: true,
      isPopup: false,
      loginButton: {
        color: "green",
        type: 3,
        height: 10,
      },
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

        const result = await axios
          .post("/auth/access", data)
          .then((res) => {
            dispatch(editUser(login.user.email));
            dispatch(toggleLogin(true));
            navigate("/");
          })
          .catch((err) => console.log(err.response));
      }
    });
  }, [dispatch, navigate]);

  useEffect(() => {
    naver();
  }, [naver]);

  return (
    <div>
      <NaverButton />
      <KakaoButton />
    </div>
  );
}

export default NaverAuth;
