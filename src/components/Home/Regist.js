import { useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import DatePick from "./DatePick";
import { checkEmail } from "../../hooks/checkEmail";

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
  date.current = watch("birth");
  emailRef.current = watch("email");

  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);
  const [emailToggle, setEmailToggle] = useState(false);
  const [birthday, setBirthday] = useState({
    year: null,
    month: null,
    day: null,
  });

  if (birthday.year !== null) {
    birthResult = `${birthday.year}년-${birthday.month}월-${birthday.day}일`;
  }

  const onSubmit = async (data) => {
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
    const res = await axios
      .post("/auth/join", value)
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
    console.log(data);
    console.log(res);
  };

  const handleClick = async () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i;
    if (emailRegex.test(emailRef.current)) {
      const result = await checkEmail(emailRef.current);
      console.log(result);
      setEmailToggle(result.check);
      return;
    }
  };

  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      <section>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label htmlFor="email">Email</label>
          <input
            {...register("email", {
              required: "This field required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,3}$/i,
                message: "invalid email address",
              },
              validate: {
                checkUrl: (v) => emailToggle,
              },
            })}
          />
          <ErrorMessage errors={errors} name="email" as="h3" />
          <button
            onClick={handleClick}
            // disabled={emailToggle}
          >
            중복체크
          </button>
          <label htmlFor="password">Password</label>
          <input
            {...register("password", {
              required: "This field required.",
              minLength: {
                value: 5,
                message: "Minlength : 5",
              },
            })}
          />
          <ErrorMessage errors={errors} name="password" as="h3" />
          <label htmlFor="passwordConfirm">passwordConfirm</label>
          <input
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
          <label htmlFor="name">Name</label>
          <input
            {...register("name", {
              required: "This field required",
            })}
          />
          <ErrorMessage errors={errors} name="name" as="h3" />
          <label htmlFor="birth">Birth</label>
          <input
            value={birthResult ?? "Insert Birthday"}
            onChange={(e) => console.log(e)}
            onClick={() => setToggle(!toggle)}
          />

          <DatePick
            control={control}
            view={toggle}
            setView={setToggle}
            setBirthday={setBirthday}
          />
          <ErrorMessage errors={errors} name="birth" as="error" />
          <label htmlFor="phone">Phone-number</label>
          <input
            {...register("phone", {
              required: "This field required",
              pattern: {
                value: /^\d{3}\d{3,4}\d{4}$/,
                message: "invalid Phone number",
              },
            })}
          />
          <ErrorMessage errors={errors} name="phone" as="h3" />
          <input type="submit" value="SUBMIT" />
          <br />
          <span>
            Have a account? <Link to="/">&rarr;</Link>
          </span>
        </form>
      </section>
    </main>
  );
}
export default Regist;
