import axios from "axios";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toggleLogin, checkLoading } from "../redux/reducer/ToggleReducer";
function LoginRouter() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const login = useSelector((state) => state.toggle.isLoggedIn);
  const checkToken = useCallback(async () => {
    // const res =
    const res = await axios
      .get("/auth/user", { timeout: 3000 })
      .then((res) => {
        dispatch(toggleLogin(true));
        return res;
      })
      .catch(async (err) => {
        if (err.code === "ECONNABORTED") {
          return "TIMEOUT ERROR";
        }
        if (err.response.status === 401) {
          dispatch(toggleLogin(false));
          return err.response;
        } else {
          dispatch(toggleLogin(false));
          return err.response;
        }
      });
  }, [dispatch]);
  useEffect(() => {
    checkToken();
    setTimeout((state) => dispatch(checkLoading(false)), 1000);
  }, [checkToken, dispatch]);
  return login ? navigate("/home") : navigate("/");
}

export default LoginRouter;
