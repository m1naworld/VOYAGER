import { useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./login.module.scss";
import { useNavigate } from "react-router";
import KakaoButton from "../button/KakaoButton";
import NaverButton from "../button/NaverButton";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function Login() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const checkVerify = useCallback((e) => {}, []);

  const onSubmit = async (data) => {
    try {
      const result = await axios.post("/auth/login", data, { timeout: 3000 });
      if (result.status === 200) {
        return navigate("/detail");
      }
    } catch (err) {}
  };

  return (
    <main className={styles.login}>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "invalid email address",
              },
            })}
          />
          <ErrorMessage errors={errors} name="email" />
          <label htmlFor="password">Password</label>
          <input
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
          <button type="submit">Submit</button>
          <input onClick={checkVerify} type="button" value="verify" />
          <span>
            Don't have Account? <Link to="/join">&rarr;</Link>
          </span>
          <KakaoButton />
          <NaverButton />
        </form>
      </section>
    </main>
  );
}
export default Login;
