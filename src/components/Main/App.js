import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, checkLoading } from "../../redux/reducer/ToggleReducer";
import { editUser } from "../../redux/reducer/ToggleReducer";
import axios from "axios";
import Spinner from "../animations/Spinner/Spinner";
import Router from "../../routes/Router";

// 에러코드 , 성공코드 success 맞추기

function App() {
  const loading = useSelector((state) => state.toggle.isLoading);
  const dispatch = useDispatch();
  const checkToken = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth/user", { timeout: 3000 });
      // 이거왜있음????
      const re = await axios.get("/api/send/user", { timeout: 3000 });
      console.log(re);
      dispatch(editUser(re.data.user));
      dispatch(toggleLogin(true));
      dispatch(checkLoading(false));
      console.log(re);
      return res;
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        dispatch(toggleLogin(false));
        return "TIMEOUT ERROR";
      }
      console.log(err.response);
      dispatch(toggleLogin(err.response.data.success));
      dispatch(checkLoading(false));
    }
  }, [dispatch]);
  useEffect(() => {
    checkToken();
    // dispatch(checkLoading(false));
  }, [checkToken, dispatch, toggleLogin]);
  return loading ? <Spinner /> : <Router />;
}

export default App;
