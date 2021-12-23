import { useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import qs from "qs";
import { useDispatch } from "react-redux";
import { checkLoading } from "../../redux/reducer/ToggleReducer";
import axios from "axios";
import { useForm } from "react-hook-form";
import classes from "./PasswordCheck.module.scss";
import { ErrorMessage } from "@hookform/error-message";

const PasswordCheck = () => {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const vConfirm = useRef();
  vConfirm.current = watch("pwdConfirm");

  const postId = useCallback(async () => {
    dispatch(checkLoading(true));
    try {
      const id = qs.parse(search)["?id"];
      await axios.post("/api/auth/user/password/modify", {
        _id: id,
        password: vConfirm.current,
      });
      dispatch(checkLoading(false));
      window.location.href = "https://voyager.or.kr/";
    } catch (err) {
      dispatch(checkLoading(false));
      navigate("../../");
    }
  }, []);

  return (
    <div className={classes.password__container}>
      <form className={classes.password__form} onSubmit={handleSubmit(postId)}>
        <input
          placeholder="Password"
          type="password"
          {...register("pwd", {
            required: (
              <h1 style={{ fontSize: "0.5rem", color: "red" }}>
                This field required.
              </h1>
            ),
            minLength: {
              value: 5,
              message: "Minlength : 5",
            },
            validate: {
              checkPwd: (v) =>
                v === vConfirm.current || "비밀번호가 일치하지 않습니다.",
            },
          })}
        ></input>
        <ErrorMessage errors={errors} name="pwd" />
        <input
          placeholder="Password Confirm"
          type="password"
          {...register("pwdConfirm", {
            required: (
              <h1 style={{ fontSize: "0.5rem", color: "red" }}>
                This field required.
              </h1>
            ),
            minLength: {
              value: 5,
              message: "Minlength : 5",
            },
          })}
        ></input>
        <ErrorMessage errors={errors} name="pwdConfirm" />
        <button type="submit">비밀번호변경</button>
      </form>
      <div className={classes.img__container}></div>
    </div>
  );
};

export default PasswordCheck;
