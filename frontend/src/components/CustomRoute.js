import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const CustomRoute = ({ isPrivate, ...rest }) => {
  const isAuthenticated = useSelector((state) => state.authenticated);

  if (isPrivate && !isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
};

export default CustomRoute;
