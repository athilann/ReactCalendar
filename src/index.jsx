import React from "react";
import ReactDOM from "react-dom";
import { LocalizeProvider } from "react-localize-redux";
import "./common/template/dependencies";
import Main from "./main";

ReactDOM.render(
  <LocalizeProvider>
    <Main />
  </LocalizeProvider>,
  document.getElementById("app")
);

