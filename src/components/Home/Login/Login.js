import axios from "axios";
import styles from "./login.module.scss";
import { useNavigate } from "react-router";
import KakaoButton from "../../button/KakaoButton";
import NaverButton from "../../button/NaverButton";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { toggleLogin } from "../../../redux/reducer/ToggleReducer";
import { useCallback, useRef, useState } from "react";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [confirm, setConfirm] = useState({ success: true, message: "" });
  const [success, setSuccess] = useState({ success: true, message: "" });
  const [emailSuccess, setEmailSuccess] = useState({
    success: false,
    message: "",
  });

  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const userEmail = useRef();
  userEmail.current = watch("email");

  const sendEmail = useCallback(async () => {
    const res = await axios.post("/api/auth/change", {
      email: userEmail.current,
      target: "email",
    });
    setEmailSuccess(res.data);
  }, []);

  const onSubmit = async (data) => {
    try {
      const result = await axios.post("/api/auth/login", data, {
        timeout: 3000,
      });
      if (result.status === 204) {
        console.log(result);
        dispatch(toggleLogin(true));
        navigate("/detail");
      }
      if (result.status === 202) {
        console.log(result.data);
        setConfirm(result.data);
      }
    } catch (err) {
      const { success, message } = err.response.data;
      console.log(err.response.data);
      setSuccess({ success, message });
    }
  };

  const sendPassword = useCallback(async () => {
    const res = await axios.post("/api/auth/change", {
      email: userEmail.current,
      target: "password",
    });
    console.log(res);
  }, []);

  return (
    <main className={styles.login}>
      <section className={styles.section}>
        {confirm.success ? (
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
            {!success.success && (
              <h1
                style={{ fontSize: "1rem", color: "black", marginTop: "10px" }}
              >
                {success.message}
              </h1>
            )}

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
        ) : (
          <>
            <h1 style={{ textAlign: "center" }}>
              {!emailSuccess.success ? confirm.message : emailSuccess.message}
            </h1>
            <button onClick={sendEmail}>이메일 재전송</button>
            <button onClick={() => setConfirm({ ...confirm, success: true })}>
              돌아가기
            </button>
          </>
        )}
        <button onClick={sendPassword}>비밀번호찾기</button>
      </section>
    </main>
  );
}
export default Login;
