import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { checkEmail } from "../../../../hooks/checkEmail";
import axios from "axios";

const FindPassword = () => {
  const location = useLocation();
  const classes = location.state.classes;
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();

  const [ok, setOk] = useState({ success: false, message: null });

  const onSubmit = async ({ email }) => {
    const res = await checkEmail(email);
    if (res.find) {
      const res = await axios.post("/api/confirm/change", {
        email,
        target: "password",
      });
      setOk(res.data);
      return;
    }
    setOk({ success: !res.success, message: "존재하지 않는 이메일입니다." });
    console.log(res.success);
  };

  return !ok.success ? (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <input
          placeholder="Email"
          style={{ width: "100%" }}
          {...register("email", {
            required: "This field required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
              message: "invaild Email Address",
            },
          })}
        />
        <ErrorMessage errors={errors} name="email" as="h3" />
        {ok.message && <h3>{ok.message}</h3>}
        <button className={classes.button} type="submit">
          비밀번호찾기
        </button>
      </form>
      <Link
        style={{ textDecoration: "none", color: "white", width: "100%" }}
        to="../"
      >
        <button
          className={classes.button}
          style={{ backgroundColor: "#202363" }}
        >
          돌아가기
        </button>
      </Link>
    </>
  ) : (
    <div className={classes.profile__popup__view}>
      <h1>{ok.message}</h1>
      <Link
        style={{ textDecoration: "none", color: "white", width: "100%" }}
        to="../"
      >
        <button
          className={classes.button}
          style={{ backgroundColor: "#202363" }}
        >
          돌아가기
        </button>
      </Link>
    </div>
  );
};

export default FindPassword;
