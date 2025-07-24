import { ToastContainer } from "react-toastify";
import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <ToastContainer />
      <Footer />
    </>
  );
}

export default App;
