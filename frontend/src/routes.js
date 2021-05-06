import React from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch } from "react-router-dom";

import CustomRoute from "./components/CustomRoute";

import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage";
import CreatePage from "./pages/CreatePage";
import ViewPage from "./pages/ViewPage";

const MainRoutes = () => {
  const routes = [
    {
      path: "/",
      component: LoginPage,
      exact: true,
      isPrivate: false,
    },
    {
      path: "/register",
      component: RegisterPage,
      exact: false,
      isPrivate: false,
    },
    {
      path: "/home",
      component: HomePage,
      exact: true,
      isPrivate: true,
    },
    {
      path: "/home/:id",
      component: ViewPage,
      exact: true,
      isPrivate: true,
    },
    {
      path: "/create",
      component: CreatePage,
      exact: false,
      isPrivate: true,
    },
  ];

  return (
    <Container>
      <Router history={history}>
        <Switch>
          {routes.map((route, key) => (
            <CustomRoute
              key={key}
              exact={route.exact}
              path={route.path}
              component={route.component}
              isPrivate={route.isPrivate}
            />
          ))}
        </Switch>
      </Router>
    </Container>
  );
};

const Container = styled.div`
  width: 60vw;
  height: 55vh;
  padding: 1rem;
`;

export default MainRoutes;
