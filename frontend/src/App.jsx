import "./App.css";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
