import React from "react";
import styled from "styled-components";
import { HashRouter as Router, Switch } from "react-router-dom";

import CustomRoute from "./components/CustomRoute";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";

const MainRoutes = () => {
  const routes = [
    {
      path: "/",
      component: Login,
      exact: true,
      isPrivate: false,
    },
    {
      path: "/register",
      component: Register,
      exact: true,
      isPrivate: false,
    },
    {
      path: "/home",
      component: Home,
      exact: true,
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
