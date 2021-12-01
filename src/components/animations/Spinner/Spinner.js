import "./spinner.css";
import styled, { keyframes } from "styled-components";

const text = "Now-Loading...";
const txt = text.split("");
function Spinner() {
  return (
    <div className="body">
      <Sec>
        <div className="earth"></div>
        <div className="circle">
          {txt.map((m, idx) => (
            <Sp key={idx} num={idx}>
              {m}
            </Sp>
          ))}
        </div>
      </Sec>
    </div>
  );
}
export default Spinner;

const animateEarth = keyframes`
    0% {
      background-position: 0 0;
    }
    100% {
      background-position: -750px 0;
    }
`;

const animateText = keyframes`
  0% {
      transform: perspective(1000px) rotateY(360deg) rotateX(15deg)
        translateY(-30px);
    }
    100% {
      transform: perspective(1000px) rotateY(0deg) rotateX(15deg)
        translateY(-30px);
    }
`;

const Sp = styled.span`
  transform: rotateY(calc((${(props) => props.num}) * calc(360deg / 31)))
    translateZ(200px);
`;

const Sec = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  transform-style: preserve-3d;

  .earth {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    background: url("image/space.jpg");
    background-size: cover;
    background-repeat: repeat-x;
    border-radius: 50%;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 1), 0 0 59px #4069ff;
    animation: ${animateEarth} 15s linear infinite;
  }
  .circle {
    transform-style: preserve-3d;
    animation: ${animateText} 10s linear infinite;
    span {
      position: absolute;
      top: 0;
      left: 0;
      background: #fff;
      color: #35146f;
      font-size: 3em;
      transform-origin: center;
      transform-style: preserve-3d;
      padding: 5px 11px;
      border-top: 4px solid #35146f;
      border-bottom: 4px solid #35146f;
    }
    span::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      transform: translateZ(-5px);
    }
  }
`;
