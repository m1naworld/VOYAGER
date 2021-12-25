import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleLogin, checkLoading } from "../../redux/reducer/ToggleReducer";
import { editUser } from "../../redux/reducer/ToggleReducer";

import Calendar from "../Calendarapp/calendar";
import Router from "../../routes/Router";
import axios from "axios";
import AstronautSpinner from "../animations/Spinner/AstronautSpinner";

function App() {
  const loading = useSelector((state) => state.toggle.isLoading);
  const dispatch = useDispatch();
  const checkToken = useCallback(async () => {
    try {
      const res = await axios.get("/api/auth/user", { timeout: 1000 });
      dispatch(editUser(res.data.user));
      dispatch(checkLoading(false));
      dispatch(toggleLogin(res.data.success));
      console.log(res);
      return res.data;
    } catch (err) {
      console.log(err);
      if (err.code === "ECONNABORTED") {
        dispatch(toggleLogin(false));
        return "TIMEOUT ERROR";
      }
      dispatch(toggleLogin(err.response.data.success));
      dispatch(checkLoading(false));
    }
  }, [dispatch]);
  useEffect(() => {
    checkToken();
  }, [checkToken, dispatch, toggleLogin]);

  return loading ? <AstronautSpinner /> : <Router />;
}

export default App;
