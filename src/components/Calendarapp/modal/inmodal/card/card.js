import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ModalCard = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 15px;

  @media screen and (max-width: 900px) {
    display: flex;
    width: 100%;
    justify-content: space-between;
    position: relative;
    align-items: center;
  }
`;

const Btn = styled.div`
  visibility: hidden;
  padding: 0;
  margin: 0;

  @media screen and (max-width: 900px) {
    visibility: visible;
  }
`;

const CardContainer = styled.div`
  text-align: center;
  width: 80%;
  height: 100%;
  top: 0;
  left: 0;
  display: flex;
  overflow: hidden;
`;

const Cardview = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex: 0 0 auto;
  float: left;
  justify-content: space-around;

  @media screen and (max-width: 900px) {
    width: 300%;
    transition: all 0.5s ease-out;
    transform: ${({ idx }) => `translate(-${idx * 33.3}%,0%)`};

    /* transform: translate(0%, 0%); */
  }
`;

const Card = styled.div`
  position: relative;
  width: 30%;
  height: 100%;
  transform-style: preserve-3d;
  transition: all 1s ease;
  border: 2px solid white;
  /* justify-content: space-around; */
  display: flex;

  &:hover {
    transform: rotateY(180deg);
    transition: all 1s ease-in-out;
  }

  @media screen and (max-width: 900px) {
    width: 100%;
  }
`;

const Fr = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  backface-visibility: hidden;
  background: rgb(1, 1, 1);
  color: rgb(255, 255, 255);
  text-align: center;
  box-shadow: 7px 7px 2px 1px rgba(125, 125, 125, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Bc = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 4px;
  backface-visibility: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgb(1, 1, 1);
  color: rgb(255, 125, 0);
  text-align: center;
  transform: rotateY(180deg);
  box-shadow: 7px 7px 2px 1px rgba(125, 125, 125, 0.7);
`;

function Flipcard({ currentDiary }) {
  const [idx, setIdx] = useState(0);
  return (
    <ModalCard className="ModalCard">
      <Btn
        dierection="prev"
        onClick={() => {
          if (idx === 0) {
            setIdx(2);
          } else {
            setIdx(idx - 1);
          }
        }}
        className="Btn BtnLeft"
      >
        <FaArrowLeft />
      </Btn>

      <CardContainer className="CardContainer">
        <Cardview idx={idx} className="Cardview">
          {currentDiary !== undefined &&
          currentDiary?.length !== 0 &&
          currentDiary[0].question ? (
            currentDiary[0].question?.map((m, index) => {
              return (
                <Card className="Card Card1" key={m.index}>
                  <Fr className="fr">
                    <div
                      style={{ position: "absolute", left: "50%", top: "0%" }}
                    >
                      {m.index + 1}
                    </div>
                    <span>{m.qs}</span>
                  </Fr>
                  <Bc className="bc">
                    <div
                      style={{
                        position: "absolute",
                        top: "0%",
                        margin: "0 auto",
                      }}
                    >
                      {m.index + 1}
                    </div>
                    <span>{currentDiary[0].answer[m.index].answer}</span>
                  </Bc>
                </Card>
              );
            })
          ) : (
            <>
              <Card className="Card Card1">
                <Fr className="fr">
                  <div style={{ position: "absolute", left: "50%", top: "0%" }}>
                    1
                  </div>
                </Fr>
                <Bc className="bc">
                  <div
                    style={{
                      position: "absolute",
                      top: "0%",
                      margin: "0 auto",
                    }}
                  >
                    1
                  </div>
                </Bc>
              </Card>
              <Card className="Card Card1">
                <Fr className="fr">
                  <div style={{ position: "absolute", left: "50%", top: "0%" }}>
                    2
                  </div>
                </Fr>
                <Bc className="bc">
                  <div
                    style={{
                      position: "absolute",
                      top: "0%",
                      margin: "0 auto",
                    }}
                  >
                    2
                  </div>
                </Bc>
              </Card>
              <Card className="Card Card1">
                <Fr className="fr">
                  <div style={{ position: "absolute", left: "50%", top: "0%" }}>
                    3
                  </div>
                </Fr>
                <Bc className="bc">
                  <div
                    style={{
                      position: "absolute",
                      top: "0%",
                      margin: "0 auto",
                    }}
                  >
                    3
                  </div>
                </Bc>
              </Card>
            </>
          )}
        </Cardview>
      </CardContainer>

      <Btn
        direction="next"
        onClick={() => {
          if (idx === 2) {
            setIdx(0);
          } else {
            setIdx(idx + 1);
          }
        }}
        className="Btn BtnRight"
      >
        <FaArrowRight />
      </Btn>
    </ModalCard>
  );
}

export default Flipcard;
