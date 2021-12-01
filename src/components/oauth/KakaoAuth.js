import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import qs from "qs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editUser, toggleLogin } from "../../redux/reducer/ToggleReducer";

const { Kakao } = window;
function KakaoAuth() {
  const param = new URLSearchParams(window.location.search).get("code");
  const dispatch = useDispatch();
  const history = useNavigate();
  const postParam = useCallback(
    async (param) => {
      try {
        const payload = qs.stringify({
          grant_type: "authorization_code",
          client_id: process.env.REACT_APP_KAKAO_REST_KEY,
          redirect_uri: `${window.location.origin}/oauth/kakao`,
          code: param,
          client_secret: process.env.REACT_APP_KAKAO_SECRET,
        });

        const res = await axios.post(
          "https://kauth.kakao.com/oauth/token",
          payload
        );

        Kakao.Auth.setAccessToken(res.data.access_token);
        let data = await Kakao.API.request({
          url: "/v2/user/me",
        });

        let {
          id: snsId,
          kakao_account: { email, gender, age_range: age, birthday: birth },
          properties: { nickname: name },
        } = data;
        // birth = `${birth.substring(0, 2)}-${birth.substring(2, 4)}`;

        const result = await axios.post("/auth/access", {
          provider: "kakao",
          snsId,
          email,
          name,
          gender,
          age,
          birth,
        });
        console.log(result);

        if (result.status === 200) {
          console.log(email);
          dispatch(editUser(snsId));
          dispatch(toggleLogin(true));
          history("/");
        }
      } catch (err) {
        if (err.response.data.error_code === "KOE320") {
          history(-1);
        }
        history("/join");
      }
    },
    [history, dispatch]
  );
  useEffect(() => {
    postParam(param);
  }, [postParam, param]);

  return <h1>123123</h1>;
}

export default KakaoAuth;
