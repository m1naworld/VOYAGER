import axios from "axios";
import { useEffect, useCallback } from "react";
import { useNavigate } from "react-router";

function Profile() {
  const history = useNavigate();

  const getProfile = useCallback(async () => {
    try {
      let data = await window.Kakao.API.request({
        url: "/v2/user/me",
      });

      const {
        id: snsid,
        kakao_account: { email, gender, age_range: age, birthday: birth },
        properties: { nickname },
      } = data;
      const result = await axios.post("/auth/kakaoo", {
        provider: "kakao",
        snsid,
        email,
        gender,
        age,
        birth,
        nickname,
      });
      console.log(result);
      history("../");
    } catch (err) {
      console.log(err);
    }
  }, [history]);

  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <>
      <button onClick={() => history("/")}>DD</button>
    </>
  );
}

export default Profile;
