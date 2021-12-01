import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Login from "./Login";
import Airplane from "../animations/airplane/Airplne";
import Detail from "../Detail/Detail";
function Home() {
  const start = useSelector((state) => state.toggle.isStart);
  const login = useSelector((state) => state.toggle.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      navigate("/");
    }
  }, [login, navigate]);
  return (
    <>
      <Detail />
      {start ? <Login /> : ""}
    </>
  );
}

export default Home;
