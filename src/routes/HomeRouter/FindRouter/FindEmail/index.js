import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import DatePick from "../../../../components/Home/Login/DatePick";
import "./resetInput.css";
import myAxios from "../../../../hooks/myAxios";
let birthResult;

const FindEmail = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [birthday, setBirthday] = useState({
    year: null,
    month: null,
    day: null,
  });
  const classes = location.state.classes;
  const {
    handleSubmit,
    control,
    register,

    formState: { errors },
  } = useForm();

  if (birthday.year !== null) {
    birthResult = `${birthday.year}-${birthday.month}-${birthday.day}`;
  }

  const onSubmit = async (value) => {
    const { name, p_1, p_2, p_3 } = value;
    const data = { name, birthday: birthResult, phone: `${p_1}${p_2}${p_3}` };
    const res = await myAxios("/api/auth/findEmail", data);
    console.log(res);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
        <input
          placeholder="Name"
          style={{ width: "100%" }}
          {...register("name", {
            required: (
              <h1 style={{ fontSize: "0.5rem", color: "red" }}>
                This field required.
              </h1>
            ),
          })}
        />
        <div className={classes.input} onClick={() => setToggle(!toggle)}>
          {birthResult ?? "Birthday"}
        </div>
        <input
          value={birthResult ?? ""}
          style={{ visibility: "hidden", position: "absolute" }}
          {...register("birthday", {
            required: (
              <h1 style={{ fontSize: "0.5rem", color: "red" }}>
                This field required.
              </h1>
            ),
          })}
        />
        <DatePick
          control={control}
          view={toggle}
          setView={setToggle}
          setBirthday={setBirthday}
        />

        <ErrorMessage errors={errors} name="email" />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <input
            type="number"
            style={{ width: "30%" }}
            placeholder="010"
            {...register("p_1", {
              required: (
                <h1 style={{ fontSize: "0.5rem", color: "red" }}>
                  This field required.
                </h1>
              ),
              maxLength: {
                value: 3,
              },
            })}
          />
          &nbsp;-&nbsp;
          <input
            type="number"
            style={{ width: "30%" }}
            placeholder="0000"
            {...register("p_2", {
              required: (
                <h1 style={{ fontSize: "0.5rem", color: "red" }}>
                  This field required.
                </h1>
              ),
              maxLength: {
                value: 4,
                message: "MaxLength : 4",
              },
            })}
          />
          &nbsp;-&nbsp;
          <input
            type="number"
            style={{ width: "30%" }}
            placeholder="0000"
            {...register("p_3", {
              required: (
                <h1 style={{ fontSize: "0.5rem", color: "red" }}>
                  This field required.
                </h1>
              ),
              maxLength: {
                value: 4,
                message: "Maxlength : 4",
              },
            })}
          />
        </div>
        <ErrorMessage errors={errors} name="p_1" />
        <button className={classes.button} type="submit">
          이메일찾기
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

export default FindEmail;
