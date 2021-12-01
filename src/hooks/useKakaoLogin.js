import { useCallback, useEffect } from "react";

const KAKAO_SDK = "https://developers.kakao.com/sdk/js/kakao.js";
const KAKAO_TOKEN = ""; // 카카오 로그인 토큰;
const KAKAO_REDIRECT = ""; // 카카오 로그인에 추가한 Redirect URI;

const useKakaoLogin = () => {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = KAKAO_SDK;
    script.onload = () => handleSuccess();

    document.body.appendChild(script);

    return () => script.remove();
  }, []);

  const handleSuccess = useCallback(() => {
    Kakao.init(KAKAO_TOKEN);
  }, []);

  return useCallback(() => {
    const path = location.href.split("?");

    if (path[1]) {
      sessionStorage.setItem(LOGIN_UTM, path[1]);
    }
    Kakao.Auth.authorize({
      redirectUri: KAKAO_REDIRECT,
    });
  }, []);
};

export default useKakaoLogin;
