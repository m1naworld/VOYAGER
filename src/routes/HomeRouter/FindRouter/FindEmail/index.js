import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router";
import { ErrorMessage } from "@hookform/error-message";
import { Link } from "react-router-dom";
import DatePick from "../../../../components/Home/Login/DatePick";
import "./resetInput.css";
import axios from "axios";
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
  const [ok, setOk] = useState({ success: false, message: null });
  if (birthday.year !== null) {
    birthResult = `${birthday.year}-${birthday.month}-${birthday.day}`;
  }

  const onSubmit = async (value) => {
    const { name, p_1, p_2, p_3 } = value;
    let { year, month, day } = birthday;
    if (month < 10) {
      month = `0${month}`;
    }
    if (day < 10) {
      day = `0${day}`;
    }
    const data = {
      name,
      birthday: `${year}-${month}-${day}`,
      phone: `${p_1}${p_2}${p_3}`,
    };
    try {
      const res = await axios.post("/api/auth/findEmail", data);
      setOk(res.data);
    } catch (err) {
      setOk(err.response.data);
    }
  };

  return ok.success ? (
    <div className={classes.profile__popup__view}>
      <h1>등록된 이메일은 {ok.message} 입니다.</h1>
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
  ) : (
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
            value="010"
            readOnly
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
        {ok.message && <h3>{ok.message}</h3>}
        <button className={classes.button} type="submit">
          이메일찾기
        </button>
      </form>
      <Link
        style={{ textDecoration: "none", color: "white", width: "100%" }}
        to="../"
      >
        <button
          style={{ backgroundColor: "#202363" }}
          className={classes.button}
        >
          돌아가기
        </button>
      </Link>
    </>
  );
};

export default FindEmail;
