import "./App.css";

import { Outlet } from "react-router-dom";
import { useContext } from "react";

import { usePokeData } from "./context/PokeDataContext.jsx";
import { MainLayout } from "./components/Layout/MainLayout.jsx";
import { LoadingScreen } from "./components/shared/LoadingScreen.jsx";
import { ErrorScreen } from "./components/shared/ErrorScreen.jsx";
import { ThemeContext } from "./context/ThemeContext.jsx";

export function App() {
  // const { darkMode, toggleDarkMode, clearDarkMode } = useContext(ThemeContext)
  const { error, isLoading } = usePokeData();


  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    console.log("error", error);
    return <ErrorScreen message={error.message} />;
  }

  return (
    <>
      <MainLayout />
      <Outlet />
    </>
  );
}
