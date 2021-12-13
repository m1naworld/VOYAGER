import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { useDispatch } from "react-redux";
import { checkLoading } from "../../redux/reducer/ToggleReducer";
import axios from "axios";

const EmailCheck = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  console.log("IN");
  const postId = async (id) => {
    try {
      await axios.post("/api/auth/confirm", { id });
      dispatch(checkLoading(false));
      console.log("DONE");
      navigate("/");
    } catch (err) {
      console.log(err.response);
      console.log("ERROR");
      dispatch(checkLoading(false));
      navigate("/");
    }
  };

  useEffect(() => {
    const id = qs.parse(search)["?id"];
    postId(id);
  }, []);
  return <div></div>;
};

export default EmailCheck;
