import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";
import { AppContext, InitContext } from "./store/index";

ReactDOM.render(
  <InitContext>
    <App></App>
  </InitContext>,
  document.getElementById("root")
);
