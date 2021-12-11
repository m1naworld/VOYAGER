import Ship from "../animations/airplane/Ship";
import classes from "./Home.module.scss";
import ReactFullpage from "@fullpage/react-fullpage";
import { useLocation } from "react-router";
import { useState } from "react";
import { useEffect } from "react";
import "./active.scss";
const Home = () => {
  const { hash } = useLocation();
  const [path, setPath] = useState(hash);
  useEffect(() => {
    setPath(hash);
    console.log(hash);
  }, [hash]);
  return (
    <div
      style={{
        width: "100vw",
        background: "#363636",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0 10vw",
      }}
      onScroll={() => console.log("SCROLL")}
    >
      {/* <NavTest /> */}

      <ReactFullpage
        //fullpage options
        licenseKey={"2E84F30F-B2A14C7F-AA0EA463-F1F631DC"}
        scrollBar={false}
        scrollingSpeed={800}
        lazyLoading={true}
        autoScrolling={true}
        continuousVertical={true}
        recordHistory={false}
        anchors={["page-1", "page-2", "page-3", "page-4", "page-5", "page-6"]}
        fadingEffect={true}
        navigation
        navigationTooltips={[
          "page-1",
          "page-2",
          "page-3",
          "page-4",
          "page-5",
          "page-6",
        ]}
        render={({ state, fullpageApi }) => {
          return (
            <div id="fullpage-wrapper">
              <div className={`${classes.home__section} section`}>
                <div
                  style={{
                    width: "100%",
                    height: "90%",
                    position: "relative",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src="image/space.gif"
                    loop={true}
                    alt="space-background"
                    className={classes.home__img}
                  />
                  <Ship />
                </div>
              </div>
              <div
                className={`${classes.home__section} ${classes.home__section__2} section`}
              >
                <div className={classes.section__page2}>
                  <div className={classes.title}>
                    <pre>
                      {`
                    "
                    골든 레코드는
                    인간이 자신을 어떻게 보고 싶어 하는지를
                    보여주는
                    아름다운 예술품일 뿐이다
                    "`}
                    </pre>
                    <span>-세리 웰슨 얀센-</span>
                  </div>
                  <img
                    className={
                      path === "#page-2"
                        ? `${classes.active} ${classes.disable}`
                        : classes.disable
                    }
                    src={`${process.env.PUBLIC_URL}/image/page2_brush.png`}
                    alt="page2_brush"
                  />
                </div>
              </div>
              <div className={`${classes.home__section} section`}>
                <section
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: "min-content",
                      height: "min-content",
                      border: "10px solid #DBD9D9",
                      borderRadius: "50%",
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: "397px",
                        height: "397px",
                        backgroundColor: "#374A67",
                        borderRadius: "50%",
                        zIndex: "0",
                        overflow: "auto",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          width: "2px",
                          height: "2px",
                          backgroundColor: "white",
                          top: 0,
                          left: "50%",
                        }}
                      ></div>
                    </div>
                    <img
                      src={`${process.env.PUBLIC_URL}/image/main/page3.svg`}
                      alt="page3"
                      style={{
                        position: "absolute",
                        zIndex: 1000,
                        width: "400px",
                        height: "400px",
                        top: "0",
                      }}
                    />
                  </div>
                  <pre
                    style={{
                      width: "min-content",
                      // textAlign: "left",
                      color: "white",
                      fontSize: "5rem",
                    }}
                  >
                    {`
WE
ARE
TRAVELERS

`}
                  </pre>
                </section>
              </div>
              <div className={`${classes.home__section} section`}>
                <section
                  style={{
                    width: "100vw",
                    height: "100vh",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%,-50%)",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    className={
                      path === "#page-4"
                        ? `${classes.page4__img} ${classes.page4__img__active}`
                        : classes.page4__img
                    }
                    src={`${process.env.PUBLIC_URL}/image/main/page4.png`}
                    alt="svgpage4"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      color: "white",
                    }}
                  >
                    <h2 style={{ color: "#529FBE" }}>COLOR COLLECTION</h2>
                    <br />
                    <h1 style={{ fontSize: "5rem" }}>오늘의 감정을 색깔로</h1>
                    <br />
                    <pre
                      style={{ textAlign: "right", lineHeight: "120%" }}
                    >{`오늘의 감정에 대한 질문에 답을 한다면 그에 맞는 색깔을 줄께요.
지금까지 수집한 색깔들로 당신의 우주를 채워 볼 수 있습니다.

오늘의 감정을 말해주세요. 색깔을 비춰드립니다.`}</pre>
                    <br />
                    <br />
                    <button
                      style={{
                        display: "block",
                        textAlign: "center",
                        padding: "0.5rem 3rem",
                        borderRadius: "8px",
                        background: "#5ddae9",
                        textDecoration: "none",
                        color: "#fff",
                        fontSize: "1rem",
                        border: "none",
                      }}
                    >
                      MORE
                    </button>
                  </div>
                </section>
              </div>
              <div className={`${classes.home__section} section`}>
                <section
                  style={{
                    // width: "100vw",
                    // height: "100vh",
                    // position: "absolute",
                    // top: "50%",
                    // left: "50%",
                    // transform: "translate(-50%,-50%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      color: "white",
                    }}
                  >
                    <h2 style={{ color: "#529FBE" }}>Daily Questions</h2>
                    <br />
                    <h1 style={{ fontSize: "5rem" }}>질문엔 답변을.</h1>
                    <br />
                    <pre
                      style={{ textAlign: "left", lineHeight: "120%" }}
                    >{`매일 제공되는 질문들에 대한 답변을 작성해주세요.
짧은 말로 답을 하기 위해 더 신중하게 생각하세요.

내가 살았던 오늘 하루의 작은 부분도 기록해보세요.`}</pre>
                    <br />
                    <br />
                    <button
                      style={{
                        display: "block",
                        textAlign: "center",
                        padding: "0.5rem 3rem",
                        borderRadius: "8px",
                        background: "#5ddae9",
                        textDecoration: "none",
                        color: "black",
                        fontSize: "1rem",
                        border: "none",
                      }}
                    >
                      MORE
                    </button>
                  </div>
                  <img
                    className={
                      path === "#page-5"
                        ? `${classes.page5__img} ${classes.page5__img__active}`
                        : classes.page5__img
                    }
                    src={`${process.env.PUBLIC_URL}/image/main/page5.png`}
                    alt="svgpage4"
                  />
                </section>
              </div>
              <div className={`${classes.home__section} section`}>
                <section
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    className={
                      path === "#page-6"
                        ? `${classes.page6__img} ${classes.page6__img__active}`
                        : classes.page6__img
                    }
                    style={{ width: "100%", position: "absolute", bottom: "0" }}
                    src={`${process.env.PUBLIC_URL}/image/main/page6.svg`}
                    alt="page6"
                  />
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <h1
                      style={{
                        color: "white",
                        fontSize: "5rem",
                        marginRight: "12px",
                      }}
                    >
                      다다를때까지
                    </h1>
                    <pre
                      style={{ color: "white" }}
                    >{`얼마나 표류할지, 어디에 도착할지,
그리고 그 다음이 무엇일지 까지

이 광활한 우주에서는 도무지 알 길이 없습니다.`}</pre>
                  </div>
                </section>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

export default Home;
