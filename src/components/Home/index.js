import classes from "./Home.module.scss";
import ReactFullpage from "@fullpage/react-fullpage";
import Page1 from "./section/Page1";
import Page2 from "./section/Page2";
import Page3 from "./section/Page3";
import Page4 from "./section/Page4";
import Page5 from "./section/Page5";
import Page6 from "./section/Page6";
import { useEffect, useState } from "react";
const Home = () => {
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (window.innerWidth > 500) {
      setMobile(true);
    }
    setLoading(false);
  }, [mobile]);

  return !loading ? (
    <div className={classes.home__container}>
      <ReactFullpage
        //fullpage options
        licenseKey={"2E84F30F-B2A14C7F-AA0EA463-F1F631DC"}
        scrollBar={!mobile}
        scrollingSpeed={800}
        lazyLoading={true}
        autoScrolling={mobile}
        continuousVertical={true}
        recordHistory={true}
        anchors={["page-1", "page-2", "page-3", "page-4", "page-5", "page-6"]}
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
              <Page1 />
              <Page2 />
              <Page3 />
              <Page4 />
              <Page5 />
              <Page6 />
            </div>
          );
        }}
      />
    </div>
  ) : (
    ""
  );
};

export default Home;
