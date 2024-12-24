import "./App.css";
import { Layout } from "./components/Layout/Layout.jsx";
import { Outlet } from "react-router-dom";

export function App() {
  return (
    <>
      <Layout />
      <Outlet />
    </>
  );
}
