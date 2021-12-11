import axios from "axios";
import { useCallback, useEffect } from "react";
import NaverButton from "../button/NaverButton";
import { useNavigate } from "react-router";
import KakaoButton from "../button/KakaoButton";
import Spinner from "../animations/Spinner/Spinner";
import { useDispatch } from "react-redux";
import { editUser, toggleLogin } from "../../redux/reducer/ToggleReducer";

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
    try {
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

          const result = await axios.post("/api/auth/access", data);
          console.log(result);
          if (result.status === 200) {
            const res = await axios
              .get("/api/auth/user", { timeout: 3000 })
              .then(async (res) => {
                const re = await axios.get("/api/send/user").then((res) => {
                  console.log(res);
                  dispatch(editUser(res.data.user));
                });

                dispatch(toggleLogin(true));
                return res;
              });
            navigate("/");
          }
        }
      });
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    naver();
  }, [naver]);

  return <Spinner />;
}

export default NaverAuth;
