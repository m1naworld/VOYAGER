import { useRef, useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import DatePick from "../Login/DatePick";
import { checkEmail } from "../../../hooks/checkEmail";
import { checkPhone } from "../../../hooks/checkPhone";
import classes from "./Regist.module.scss";
import { Link } from "react-router-dom";

let birthResult;

function Regist() {
  const {
    handleSubmit,
    register,
    watch,
    control,
    formState: { errors },
  } = useForm();

  const password = useRef({});
  const date = useRef();
  const emailRef = useRef();
  password.current = watch("password");
  date.current = watch("birthday");
  emailRef.current = watch("email");

  const [toggle, setToggle] = useState(false);
  const [birthday, setBirthday] = useState({
    year: null,
    month: null,
    day: null,
  });
  const [success, setSuccess] = useState({
    msg: "",
    success: false,
  });

  if (birthday.year !== null) {
    birthResult = `${birthday.year}년-${birthday.month}월-${birthday.day}일`;
  }

  const onSubmit = async (data) => {
    try {
      const { email, password, name, phone } = data;
      let { year: birthyear, month, day } = birthday;
      if (month < 10) {
        month = `0${month}`;
      }
      if (day < 10) {
        day = `0${day}`;
      }

      const value = {
        provider: "local",
        email,
        password,
        name,
        birthyear,
        birth: `${month}${day}`,
        phone,
      };
      const re = await axios.post("/api/auth/join", value);
      const res = await axios.post("/api/confirm/change", {
        email,
        target: "email",
      });
      const { success, message } = res.data;
      setSuccess({ success, message });
    } catch (err) {
      console.error(err.response);
    }
  };

  return (
    <main className={classes.regist__main}>
      <img
        src="image/space.gif"
        loop={true}
        alt="space-background"
        className={classes.regist__img}
      />
      <section className={classes.regist__section}>
        <article className={classes.regist__article}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className={classes.regist__form}
          >
            {!success.success ? (
              <>
                <input
                  placeholder="Email"
                  {...register("email", {
                    required: "This field required.",

                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
                      message: "invalid email address",
                    },
                    validate: {
                      checkUrl: async (v) => {
                        let re = await checkEmail(v);
                        re = re.success;
                        return re || <h3>가입한 이메일입니다</h3>;
                      },
                    },
                  })}
                />
                <ErrorMessage errors={errors} name="email" as="h3" />
                <input
                  type="password"
                  placeholder="Password"
                  {...register("password", {
                    required: "This field required.",
                    minLength: {
                      value: 5,
                      message: "Minlength : 5",
                    },
                  })}
                />
                <ErrorMessage errors={errors} name="password" as="h3" />
                <input
                  type="password"
                  placeholder="password Confirm"
                  {...register("passwordConfirm", {
                    required: "This field required.",
                    minLength: {
                      value: 5,
                      message: "Minlength : 5",
                    },
                    validate: (value) =>
                      value === password.current || "Passwords do not Match",
                  })}
                />
                <ErrorMessage errors={errors} name="passwordConfirm" as="h3" />

                <input
                  placeholder="Name"
                  {...register("name", {
                    required: "This field required",
                  })}
                />
                <ErrorMessage errors={errors} name="name" as="h3" />
                <div
                  onClick={() => setToggle(!toggle)}
                  className={classes.date__div}
                >
                  {birthResult ?? "Birthday"}
                </div>
                <input
                  className={classes.birth}
                  placeholder="Birthday"
                  value={birthResult ?? ""}
                  {...register("birthday", {
                    required: "This field required",
                  })}
                  onClick={() => setToggle(!toggle)}
                  onFocus={() => setToggle(!toggle)}
                />
                <ErrorMessage errors={errors} name="birthday" as="h3" />

                <DatePick
                  control={control}
                  view={toggle}
                  setView={setToggle}
                  setBirthday={setBirthday}
                />

                <input
                  placeholder="Phone-number"
                  {...register("phone", {
                    required: "This field required",
                    pattern: {
                      value: /^\d{3}\d{3,4}\d{4}$/,
                      message: "invalid Phone number",
                    },
                    validate: {
                      checkPhone: async (v) => {
                        let re = await checkPhone(v);
                        re = re.success;
                        return re || <h3>가입한 전화번호입니다</h3>;
                      },
                    },
                  })}
                />
                <ErrorMessage errors={errors} name="phone" as="h3" />
                <button type="submit" className={classes.btn}>
                  SUBMIT
                </button>
                <br />
              </>
            ) : (
              <>
                <h1 style={{ whiteSpace: "nowrap" }}>{success.message}</h1>
                <Link to="/">
                  <button className={classes.btn}>HOME</button>
                </Link>
              </>
            )}
          </form>
        </article>
      </section>
    </main>
  );
}
export default Regist;
