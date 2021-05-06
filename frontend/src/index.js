import React from "react";
import ReactDOM from "react-dom";
import "./styles/global.less";

import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";

import { store } from "./reducers";

import App from "./App";

ReactDOM.render(
  <Provider store={store}>
    <ConfigProvider locale={ptBR}>
      <App />
    </ConfigProvider>
  </Provider>,
  document.getElementById("root")
);
