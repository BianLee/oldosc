import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import './index.css'
import "react-datepicker/dist/react-datepicker.css";
import * as serviceWorker from "./serviceWorker";
import ReactGA from "react-ga";
ReactGA.initialize("G-MKD2E181BM");
ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
