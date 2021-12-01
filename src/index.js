import React from "react";
import ReactDOM from "react-dom";
import { CookiesProvider } from "react-cookie";
import { store } from "./store";
import { Provider } from "react-redux";
import App from "./components/Main/App";
import { Reset } from "styled-reset";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Reset />
      <CookiesProvider>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
