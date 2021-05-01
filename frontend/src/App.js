import React, { useEffect } from "react";
import styled from "styled-components";
import { Layout } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "./assets/logo.png";

import MainRoutes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import api from "./services/api";

const App = () => {
  const dispatch = useDispatch();
  const userName = useSelector((state) => state.username);

  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      dispatch({ type: "AUTHENTICATE", payload: true });
    }
    setLoading(false);
  }, []);

  return (
    !loading && (
      <Container>
        <Layout className="layout">
          <Layout.Header style={{ paddingLeft: "5px" }}>
            <img src={Logo} alt="Logo" />
          </Layout.Header>
          <Layout.Content>
            <MainRoutes />
          </Layout.Content>
          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Layout>
      </Container>
    )
  );
};

const Container = styled.div`
  width: 60vw;
  height: 55vh;

  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);

  img {
    width: 3rem;
  }
`;

export default App;
