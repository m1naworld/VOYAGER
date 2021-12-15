import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, checkLoading } from "../../redux/reducer/ToggleReducer";
import { editUser } from "../../redux/reducer/ToggleReducer";

import Spinner from "../animations/Spinner/Spinner";
import Router from "../../routes/Router";
import myAxios from "../../hooks/myAxios";

// 에러코드 , 성공코드 success 맞추기

function App() {
  const loading = useSelector((state) => state.toggle.isLoading);
  const dispatch = useDispatch();
  const checkToken = useCallback(async () => {
    try {
      // const res = await axios.get("/api/auth/user", { timeout: 3000 });
      const res = await myAxios("/api/auth/user");
      dispatch(toggleLogin(res.success));
      // 이거왜있음????
      const re = await myAxios("/api/send/user");
      // console.log(re);
      dispatch(editUser(re.user));
      dispatch(checkLoading(false));

      return res;
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        dispatch(toggleLogin(false));
        return "TIMEOUT ERROR";
      }
      console.log(err.response.success);
      dispatch(toggleLogin(err.response.success));
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
