import React from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import classes from "./RemoveUser.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EXIT_MESSAGE =
  "그동안의 제 흔적을 지우고 지구로 돌아가겠습니다. VOYAGER 안녕.";

const RemoveUser = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e) => {
    const re = await axios.post("/api/user/dropout", e.exit);
    console.log(re);
  };

  return (
    <form className={classes.removeUser} onSubmit={handleSubmit(onSubmit)}>
      <h1 className={classes.exit__message}>{EXIT_MESSAGE}</h1>
      <input
        placeholder="명령입력"
        {...register("exit", {
          required: (
            <h1 style={{ fontSize: "0.5rem", color: "red" }}>
              This field required.
            </h1>
          ),
          validate: (v) => v !== EXIT_MESSAGE || "일치하지않음",
        })}
      />

      <ErrorMessage errors={errors} name="exit" />
      <button type="submit">신호전송</button>
      <hr />
      <button className={classes.last} onClick={() => navigate("../")}>
        돌아가기
      </button>
    </form>
  );
};

export default RemoveUser;
