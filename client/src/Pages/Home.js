import React from "react";
import { Navigate } from "react-router-dom";

const Home = () => {
  const isAuthenticated = !!localStorage.getItem("token");
  return isAuthenticated ? (
    <Navigate to="/dashboard" />
  ) : (
    <Navigate to="login" />
  );
};

export default Home;
