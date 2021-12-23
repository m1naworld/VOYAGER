import axios from "axios";
import styles from "./login.module.scss";
import { useNavigate } from "react-router";
import KakaoButton from "../../button/KakaoButton";
import NaverButton from "../../button/NaverButton";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useDispatch } from "react-redux";
import { getError, toggleLogin } from "../../../redux/reducer/ToggleReducer";
import { useCallback, useRef, useState } from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const errorMsg = useSelector(getError);

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
    const res = await axios.post("/api/confirm/change", {
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
        dispatch(toggleLogin(true));
        navigate("/detail");
      }
      if (result.status === 202) {
        setConfirm(result.data);
      }
    } catch (err) {
      const {
        data: { success, message },
      } = err.response;

      setSuccess({ success, message });
    }
  };

  return (
    <>
      {confirm.success ? (
        <>
          {errorMsg && <h1>{errorMsg}</h1>}
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
            {!success.success && (
              <h1
                style={{ fontSize: "1rem", color: "black", marginTop: "10px" }}
              >
                {success.message}
              </h1>
            )}
            <button className={styles.button} type="submit">
              로그인
            </button>

            <button className={styles.button} onClick={() => navigate("/join")}>
              회원가입
            </button>
            <hr style={{ color: "black", width: "100%", margin: "10px 0" }} />
            <KakaoButton />
            <NaverButton />
            <Link
              style={{
                textAlign: "center",
                marginTop: "10px",
                textDecoration: "none",
                color: "gray",
                whiteSpace: "nowrap",
              }}
              state={{ title: "find", classes: styles }}
              to="find"
            >
              계정을 잊어버리셨나요? &rarr;
            </Link>
          </form>
        </>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>
            {!emailSuccess.success ? confirm.message : emailSuccess.message}
          </h1>
          <button className={styles.button} onClick={sendEmail}>
            이메일 재전송
          </button>
          <button
            className={`${styles.button} ${styles.navy}`}
            onClick={() => setConfirm({ ...confirm, success: true })}
          >
            돌아가기
          </button>
        </>
      )}
    </>
  );
}
export default Login;
