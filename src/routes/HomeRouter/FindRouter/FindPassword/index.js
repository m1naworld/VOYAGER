import React from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import { checkEmail } from "../../../../hooks/checkEmail";

const FindPassword = () => {
  const location = useLocation();
  const classes = location.state.classes;
  const {
    handleSubmit,
    register,

    formState: { errors },
  } = useForm();

  const onSubmit = async ({ email }) => {
    const res = await checkEmail(email);
    console.log(res);
  };

  return (
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
            // validate: {
            //   checkUrl: async (v) => {
            //     let re = await checkEmail(v);
            //     re = re.success;
            //     return (
            //       !re || (
            //         <h1 style={{ fontSize: "0.5rem", color: "red" }}>
            //           없는 이메일 입니다.
            //         </h1>
            //       )
            //     );
            //   },
            // },
          })}
        />
        <ErrorMessage errors={errors} name="email" as="h3" />
        <button className={classes.button} type="submit">
          비밀번호찾기
        </button>
      </form>
      <button className={classes.button}>
        <Link style={{ textDecoration: "none", color: "white" }} to="../">
          돌아가기
        </Link>
      </button>
    </>
  );
};

export default FindPassword;
