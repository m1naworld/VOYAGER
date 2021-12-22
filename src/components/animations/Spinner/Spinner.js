import "./spinner.css";
import styled, { keyframes } from "styled-components";

// const text = "LOADING  LOADING  ";

function Spinner({ editStyle }) {
  return (
    <div className="body" style={{ backgroundColor: "#202020", ...editStyle }}>
      <Sec image={process.env.PUBLIC_URL + "/image/spinner.png"}>
        <div className="earth"></div>
        <div className="circle">
          {/* {txt.map((m, idx) => (
            <Sp key={idx} num={idx}>
              {m}
            </Sp>
          ))} */}
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
      background-position: -1000px 0;
    }
`;

const animateText = keyframes`
  0% {
      transform: perspective(1000px) rotateY(360deg) rotateX(15deg)
        translateY(-20px);
    }
    100% {
      transform: perspective(1000px) rotateY(0deg) rotateX(15deg)
        translateY(-20px);
    }
`;

// const Sp = styled.span`
//   transform: rotateY(calc((${(props) => props.num}) * calc(360deg / 18)))
//     translateZ(180px);
// `;

const Sec = styled.section`
  @font-face {
    font-family: "Aero";
    src: url("./fonts/Aero\ Club\ Como.otf") format("woff");
    font-weight: normal;
    font-style: normal;
  }
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
    background: ${(props) => `url(${props.image})`};
    background-size: cover;
    background-repeat: repeat-x;
    border-radius: 50%;
    box-shadow: inset 0 0 20px rgba(0, 0, 0, 1), 0 0 30px #039d7e8f;
    animation: ${animateEarth} 15s linear infinite;
  }
  .circle {
    transform-style: preserve-3d;
    animation: ${animateText} 10s linear infinite;
    span {
      font-family: "Aero";
      position: absolute;
      top: 0;
      left: 0;
      color: white;
      font-size: 3em;
      transform-origin: center;
      transform-style: preserve-3d;
      padding: 5px 11px;
    }
    /* span::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: black;
      transform: translateZ(-5px);
    } */
  }
`;
