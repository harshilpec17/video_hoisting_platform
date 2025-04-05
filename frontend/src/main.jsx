import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Login from "./components/authentication/Login.jsx";
import Register from "./components/authentication/Register.jsx";
import {
  BrowserRouter,
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from "react-router";
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes.jsx";
import VideoListingPage from "./components/video/videoListingPage.jsx";

const root = createRoot(document.getElementById("root"));

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="" element={<App />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        // Protected Route
        <Route
          path="videolistingpage"
          element={
            <ProtectedRoutes>
              <VideoListingPage />
            </ProtectedRoutes>
          }
        />
      </Route>
    </>
  )
);

root.render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>
);
