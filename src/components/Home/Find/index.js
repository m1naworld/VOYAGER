import { Link, useLocation } from "react-router-dom";
const Find = () => {
  const location = useLocation();
  const classes = location.state.classes;
  return (
    <>
      <Link state={location.state} to="email">
        <button className={classes.button}>이메일찾기</button>
      </Link>
      <Link state={location.state} to="password">
        <button className={classes.button}>비밀번호찾기</button>
      </Link>
      <Link to="../">
        <button className={classes.button}>돌아가기</button>
      </Link>
    </>
  );
};

export default Find;
