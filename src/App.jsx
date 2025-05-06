import "./App.css";

import { Outlet } from "react-router-dom";
import { usePokeData } from "./context/PokeDataContext.jsx";
import { MainLayout } from "./components/Layout/MainLayout.jsx";
import { LoadingScreen } from "./components/shared/LoadingScreen.jsx";
import { ErrorScreen } from "./components/shared/ErrorScreen.jsx";


export function App() {
  const { error, isLoading } = usePokeData();

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ErrorScreen message={error.message} />;
  }

  return (
    <>
      <MainLayout />
      <Outlet />
    </>
  );
}
