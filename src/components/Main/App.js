import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, checkLoading } from "../../redux/reducer/ToggleReducer";
import { editUser } from "../../redux/reducer/ToggleReducer";

import Spinner from "../animations/Spinner/Spinner";
import Router from "../../routes/Router";
import axios from "axios";
// import Calendar from "../Calendarapp/calendar";
// import ShipSpinner from "../animations/ShipSpinner/ShipSpinner";

// 에러코드 , 성공코드 success 맞추기

function App() {
  const loading = useSelector((state) => state.toggle.isLoading);
  const dispatch = useDispatch();
  const checkToken = useCallback(async () => {
    try {
      // const res = await axios.get("/api/auth/user", { timeout: 3000 });
      const res = await axios.get("/api/auth/user");
      // 이거왜있음????
      // const re = await axios.get("/api/send/user");
      // // console.log(re);
      // console.log(res);
      dispatch(editUser(res.data.user));
      dispatch(checkLoading(false));
      dispatch(toggleLogin(res.data.success));

      return res.data;
    } catch (err) {
      if (err.code === "ECONNABORTED") {
        dispatch(toggleLogin(false));
        return "TIMEOUT ERROR";
      }
      // dispatch(toggleLogin(err.response.success));
      dispatch(toggleLogin(err.response.data.success));
      console.log(err.response.data.success);
      dispatch(checkLoading(false));
    }
  }, [dispatch]);
  useEffect(() => {
    checkToken();
    // dispatch(checkLoading(false));
  }, [checkToken, dispatch, toggleLogin]);
  return loading ? <Spinner /> : <Router />;
  // return <ShipSpinner />;
}

export default App;
