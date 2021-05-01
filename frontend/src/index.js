import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "./styles/global.less";

import { store } from "./reducers";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
