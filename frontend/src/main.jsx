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
import VideoListingPage from "./components/video/VideoListingPage.jsx";
import VideoDetailPage from "./components/video/VideoDetailPage.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";

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
      <Route
        path="video"
        element={
          <ProtectedRoutes>
            <VideoDetailPage />
          </ProtectedRoutes>
        }
      />
      <Route />
    </>
  )
);

root.render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
);
