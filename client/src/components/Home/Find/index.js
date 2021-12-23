import { Link, useLocation } from "react-router-dom";
const Find = () => {
  const location = useLocation();
  const classes = location.state.classes;
  return (
    <>
      <Link state={location.state} to="email" style={{ width: "100%" }}>
        <button className={classes.button}>이메일찾기</button>
      </Link>
      <Link state={location.state} to="password" style={{ width: "100%" }}>
        <button className={classes.button}>비밀번호찾기</button>
      </Link>
      <Link to="../" style={{ width: "100%" }}>
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

export default Find;
