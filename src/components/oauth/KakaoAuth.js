import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";
import qs from "qs";
import axios from "axios";
import { useDispatch } from "react-redux";
import { editUser, toggleLogin } from "../../redux/reducer/ToggleReducer";
import Spinner from "../animations/Spinner/Spinner";
import myAxios from "../../hooks/myAxios";

const { Kakao } = window;
function KakaoAuth() {
  const param = new URLSearchParams(window.location.search).get("code");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
        // const res = await myAxios(
        //   "https://kauth.kakao.com/oauth/token",
        //   payload
        // );
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
        console.log(data);
        // birth = `${birth.substring(0, 2)}-${birth.substring(2, 4)}`;
        const userDate = { snsId, email, name, gender, age, birth };
        const result = await myAxios("/api/auth/access", {
          provider: "kakao",
          ...userDate,
        });
        // const result = await axios.post(
        //   "/api/auth/access",
        //   {
        //     provider: "kakao",
        //     ...userDate,
        //   },
        //   { withCredentials: true }
        // );
        console.log(result);

        // const user = await myAxios("/api/auth/user");
        const re = await myAxios("/api/send/user");
        console.log(re);
        dispatch(editUser(re.user));
        // const res = await axios
        //   .get("/api/auth/user", {
        //     timeout: 3000,
        //     withCredentials: true,
        //   })
        //   .then(async (res) => {
        //     const re = await axios
        //       .get("/api/send/user", {
        //         withCredentials: true,
        //       })
        //       .then((res) => {
        //         console.log(res);
        //         dispatch(editUser(res.data.user));
        //       });

        dispatch(toggleLogin(true));
        navigate("/");
      } catch (err) {
        // if (err.response.data.error_code === "KOE320") {
        // }
        console.log(err.response);
        navigate("/join");
      }
    },
    [navigate, dispatch]
  );
  useEffect(() => {
    postParam(param);
  }, [postParam, param]);
  return <Spinner />;
}

export default KakaoAuth;
