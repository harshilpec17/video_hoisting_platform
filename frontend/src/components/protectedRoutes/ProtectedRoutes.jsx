import React from "react";
import { Navigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const token = localStorage.getItem("refreshToken");

  if (!token) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoutes;
