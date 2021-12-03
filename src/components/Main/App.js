import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, checkLoading } from "../../redux/reducer/ToggleReducer";
import axios from "axios";
import Spinner from "../animations/Spinner/Spinner";
import Router from "../../routes/Router";

function App() {
  const loading = useSelector((state) => state.toggle.isLoading);
  const dispatch = useDispatch();
  const checkToken = useCallback(async () => {
    const res = await axios
      .get("/auth/user", { timeout: 3000 })
      .then((res) => {
        dispatch(toggleLogin(true));
        return res;
      })
      .catch(async (err) => {
        if (err.code === "ECONNABORTED") {
          dispatch(toggleLogin(false));
          return "TIMEOUT ERROR";
        }
        if (err.response.status === 401) {
          dispatch(toggleLogin(false));
          return err.response;
        } else if (err.response.status === 404) {
          return err.response;
        } else if (err.response.status === 419) {
          dispatch(toggleLogin(false));
          return err.response;
        }
      });
    dispatch(checkLoading(false));
  }, [dispatch]);
  useEffect(() => {
    checkToken();
  }, [checkToken, dispatch]);
  return loading ? <Spinner /> : <Router />;
}

export default App;
