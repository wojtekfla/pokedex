import "./index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { App } from "./App.jsx";
import {
  Favourites,
  Home,
  Arena,
  Edit,
  Ranking,
  Login,
  RegistrationForm,
  LoginForm,
} from "./components/index.js";

import { LoginProvider } from "./context/LoginContext.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { PokeDataProvider } from "./context/PokeDataContext.jsx";

import { SnackbarProvider } from "notistack";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      { element: <Home />, path: "/" },
      { element: <Favourites />, path: "/favourites" },
      { element: <Arena />, path: "/arena" },
      { element: <Ranking />, path: "/ranking" },
      { element: <Edit />, path: "/edit" },
      {
        element: <Login />,
        path: "/login",
        children: [
          { element: <RegistrationForm />, path: "/login/registration" },
          { element: <LoginForm />, path: "/login/loginForm" },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LoginProvider>
      <ThemeProvider>
        <PokeDataProvider>
          <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
          >
            <RouterProvider router={router} />
          </SnackbarProvider>
        </PokeDataProvider>
      </ThemeProvider>
    </LoginProvider>
  </StrictMode>,
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
