import React from "react";
import ReactDOM from "react-dom";

import AppRouter from "./AppRouter";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";

// import DebugObserver from "components/DebugObserver";
import * as serviceWorkerRegistration from "utils/serviceWorkerRegistration";
import reportWebVitals from "utils/reportWebVitals";

import "styles/index.css";
import "styles/calendar.css";
import "styles/firework.css";

Notification.requestPermission().then(function (result) {
  console.log(result);
});

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

ReactDOM.render(
  <RecoilRoot>
    {/* <DebugObserver /> */}
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  </RecoilRoot>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
