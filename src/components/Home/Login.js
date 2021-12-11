import { useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.scss";
import { useNavigate } from "react-router";
import KakaoButton from "../button/KakaoButton";
import NaverButton from "../button/NaverButton";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../../redux/reducer/ToggleReducer";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const result = await axios.post("/api/auth/login", data, {
        timeout: 3000,
      });
      if (result.status === 200) {
        dispatch(toggleLogin(true));
        navigate("/");
      }
    } catch (err) {}
  };

  return (
    <main className={styles.login}>
      <section>
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          {/* <label htmlFor="email">Email</label> */}
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
          {/* <label htmlFor="password">Password</label> */}
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
          <button type="submit">로그인</button>
          <hr style={{ color: "black", width: "100%", margin: "10px 0" }} />

          {/* <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
            }}
          > */}
          <KakaoButton />
          <NaverButton />
          {/* </div> */}
        </form>
      </section>
    </main>
  );
}
export default Login;
