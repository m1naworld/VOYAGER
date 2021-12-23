import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import classes from "./ProfileLogin.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import PwdOk from "./PwdOk";
const ProfileLogin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const [ok, setOk] = useState({ success: false, message: null });
  const navigate = useNavigate();
  const onSubmit = async (e) => {
    try {
      const res = await axios.post("/api/confirm/checkUser", e);
      setOk(res.data);
    } catch (err) {
      setOk(err.response.data);
    }
  };
  return !ok.success ? (
    <form
      className={classes.profileLogin__form}
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        placeholder="Email"
        {...register("email", {
          required: (
            <h1 style={{ fontSize: "0.5rem", color: "red" }}>
              This field required.
            </h1>
          ),
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "invalid email address",
          },
        })}
      />

      <ErrorMessage errors={errors} name="email" />
      <input
        placeholder="Password"
        type="password"
        {...register("password", {
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
      />

      <ErrorMessage errors={errors} name="password" />
      {ok.message && <h3>{ok.message}</h3>}
      <button type="submit">로그인</button>
      <button onClick={() => navigate("../")}>돌아가기</button>
    </form>
  ) : (
    <PwdOk />
  );
};

export default ProfileLogin;
