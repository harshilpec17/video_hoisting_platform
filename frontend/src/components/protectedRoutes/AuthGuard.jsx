import { Navigate, Outlet } from "react-router";

const getToken = () =>
  sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");

// Protects private routes
export const Protected = ({ redirectTo = "/login" }) => {
  return getToken() ? <Outlet /> : <Navigate to={redirectTo} replace />;
};

// Blocks auth pages when logged in
export const Public = ({ redirectTo = "/videolistingpage" }) => {
  return getToken() ? <Navigate to={redirectTo} replace /> : <Outlet />;
};
