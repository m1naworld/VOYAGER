import styles from "./airplane.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { checkStart } from "../../../redux/reducer/ToggleReducer";
import styled from "styled-components";

const li = [1, 2, 3];

function Airplane() {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);

  const handleChange = () => {
    setToggle(!toggle);
    dispatch(checkStart(true));
  };

  return (
    <div
      className={
        toggle
          ? `${styles.airplane__body} ${styles.airplane__body__rotate}`
          : styles.airplane__body
      }
    >
      <section
        className={
          toggle ? `${styles.active} ${styles.section}` : styles.section
        }
      >
        <StartBtn toggle={toggle} onClick={handleChange}>
          START
        </StartBtn>
        <div className={styles.clouds}>
          {li.map((m, idx) => (
            <Clouds key={idx} src="image/airplane/clouds.png" num={m} />
          ))}
        </div>
        <div className={`${styles.clouds} ${styles.clouds2}`}>
          {li.map((m, idx) => (
            <Clouds key={idx} src="image/airplane/cloud2.png" num={m} />
          ))}
        </div>
        <div className={styles.runway}></div>
        <img
          src="image/airplane/ship.png"
          alt="airplane"
          className={styles.plane}
        />
      </section>
    </div>
  );
}

export default Airplane;

const Clouds = styled.img`
  animation-delay: calc(-1.5s * ${(props) => props.num});
`;

const StartBtn = styled.button`
  display: ${(props) => (props.toggle ? "none" : "block")};
  position: absolute;
  width: 200px;
  height: 50px;
  background-color: #034071;
  z-index: 5000;
`;
