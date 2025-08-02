import React from "react";
import { Navigate } from "react-router";
import RequireLogin from "./RequireLogin";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("refreshToken");

  if (!token) {
    return <RequireLogin />;
  }
  return children;
};

export default ProtectedRoutes;
