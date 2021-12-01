import { useRef, useCallback, useEffect } from "react";
import "./naver.scss";

function NaverButton() {
  const btn = useRef();
  const naver = useCallback(async () => {
    const login = new window.naver.LoginWithNaverId({
      clientId: process.env.REACT_APP_NAVER_KEY,
      clientSecret: process.env.REACT_APP_NAVER_SECRET,
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
    login.logout();
  }, []);
  const callNaver = () => {
    btn.current.lastChild.click();
  };
  useEffect(() => {
    naver();
  }, [naver]);
  return (
    <>
      <button ref={btn} id="naverIdLogin" style={{ display: "none" }}></button>
      <button id="naver" onClick={callNaver}>
        <img src="image/naver.png" alt="naver" />
        Login with Naver
      </button>
    </>
  );
}

export default NaverButton;
