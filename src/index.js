import React from "react";
import ReactDOM from "react-dom";
import { store } from "./store";
import { Provider } from "react-redux";
import App from "./components/Main/App";
// import { Reset } from "styled-reset";
import "./index.css";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Reset /> */}
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
