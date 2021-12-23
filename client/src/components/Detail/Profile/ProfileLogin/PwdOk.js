import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import classes from "./ProfileLogin.module.scss";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PwdOk = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const [ok, setOk] = useState({ success: false, message: null });

  const _id = useSelector((state) => state.toggle.user._id);

  const password = useRef({});
  password.current = watch("password");
  const onSubmit = async (e) => {
    const { password } = e;
    const data = { _id, password };
    try {
      const res = await axios.post("/api/auth/user/password/modify", data);
      console.log(res.data);
      setOk(res.data);
    } catch (err) {
      console.log(err.response);
    }
  };
  useEffect(() => {
    if (ok.message) {
      setTimeout(() => {
        setOk({ success: false, message: null });
        navigate("../");
      }, 3000);
    }
  }, [ok]);
  return (
    <form
      className={classes.profileLogin__form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder="Password"
        type="password"
        {...register("password", {
          required: "This field required.",
          minLength: {
            value: 5,
            message: "Minlength : 5",
          },
        })}
      />

      <ErrorMessage errors={errors} name="password" />
      <input
        placeholder="Password Confirm"
        type="password"
        {...register("passwordConfirm", {
          required: "This field required.",
          minLength: {
            value: 5,
            message: "Minlength : 5",
          },
          validate: (value) =>
            value === password.current || "Passwords do not Match",
        })}
      />

      <ErrorMessage errors={errors} name="passwordConfirm" />
      <div
        className={
          ok.message ? classes.profile__popup__view : classes.profile__popup
        }
      >
        <h1>{ok.message}</h1>
      </div>
      <button type="submit">비밀번호변경</button>
      <button onClick={() => navigate("../")}>돌아가기</button>
    </form>
  );
};

export default PwdOk;
