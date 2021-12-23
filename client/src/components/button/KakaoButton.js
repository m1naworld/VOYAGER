import "./authBtn.scss";

const { Kakao } = window;
Kakao.init(process.env.REACT_APP_KAKAO_JS_KEY);
Kakao.isInitialized();
function KakaoButton({ ...res }) {
  const loginWithKakao = async (e) => {
    e.preventDefault();
    if (!Kakao) {
      console.log("ERROR");
    }
    Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/oauth/kakao`,
    });
  };
  return (
    <button className="kakao" onClick={loginWithKakao}>
      <img src="image/kakao.png" alt="kakao" />
      {/* Login with Kakao */}
    </button>
  );
}

export default KakaoButton;
