import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Layout, Button } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "./assets/logo.png";
import MainRoutes from "./routes";
import api from "./services/api";
import history from "./history";

const App = () => {
  const dispatch = useDispatch();
  const authenticated = useSelector((state) => state.authenticated);
  const username = useSelector((state) => state.username);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
      dispatch({ type: "AUTHENTICATE", payload: true });
    }
    setLoading(false);
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = "";
    dispatch({ type: "AUTHENTICATE", payload: false });
    history.push("/");
  };

  return (
    !loading && (
      <Container>
        <Layout className="layout">
          <Header>
            <img src={Logo} alt="Logo" />

            {authenticated && (
              <Actions>
                <Icon className="fas fa-user-circle" />
                <UserName>{username}</UserName>
                <Logout onClick={onLogout}>sair</Logout>
              </Actions>
            )}
          </Header>

          <Layout.Content>
            <MainRoutes />
          </Layout.Content>

          <ToastContainer
            position="top-center"
            closeOnClick
            draggable
            autoClose={5000}
            newestOnTop={false}
            pauseOnHover={false}
            hideProgressBar={false}
          />
        </Layout>
      </Container>
    )
  );
};

const Logout = styled.a`
  line-height: 0.6rem;
`;

const UserName = styled.div`
  color: #b9b9b9;
  font-weight: bold;
  line-height: 0.5rem;
`;

const Icon = styled.span`
  font-size: 1.5rem;
  color: #f9b236;
`;

const Actions = styled.div`
  height: 90%;

  gap: 0.25rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Header = styled(Layout.Header)`
  padding: 0 0.25rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Container = styled.div`
  width: 60vw;
  height: 62vh;

  position: absolute;
  left: 50%;
  top: 50%;

  transform: translate(-50%, -50%);
  img {
    width: 3rem;
  }

  .layout {
    height: 63vh;
  }
`;

export default App;
