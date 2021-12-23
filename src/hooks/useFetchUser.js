import axios from "axios";
import { useDispatch } from "react-redux";
import { editUser } from "../redux/reducer/ToggleReducer";

export const useFetchUser = async () => {
  const dispatch = useDispatch();
  try {
    const res = await axios.get("/api/auth/user", { timeout: 3000 });
    const re = await axios.get("/api/send/user");
    dispatch(editUser(res.data.user));
    return res.data.user;
  } catch (err) {
    return err;
  }
};
