import React from "react";
import styled from "styled-components";
import { Layout, Button } from "antd";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Logo from "./assets/logo.png";

import MainRoutes from "./routes";
import { useDispatch, useSelector } from "react-redux";
import api from "./services/api";
import history from "./history";

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

  const Logout = React.useCallback(() => {
    localStorage.removeItem("token");
    api.defaults.headers.Authorization = "";
    dispatch({ type: "AUTHENTICATE", payload: false });
    history.push("/");
  });

  return (
    !loading && (
      <Container>
        <Layout className="layout">
          <Header>
            <img src={Logo} alt="Logo" />

            {window.location.hash !== "#/" && (
              <Actions>
                <Button type="primary" size="small" danger onClick={Logout}>
                  Sair
                </Button>
              </Actions>
            )}
          </Header>

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

const Actions = styled.div`
  height: 90%;

  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
`;

const Header = styled(Layout.Header)`
  padding: 0 0.25rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

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
