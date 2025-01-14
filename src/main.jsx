import { StrictMode } from "react";
import "./index.css";
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

import { PokeDataProvider } from "./context/PokeDataContext.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";
import { LoginProvider } from "./context/LoginContext.jsx";

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
      <PokeDataProvider>
        <FavouritesProvider>
          <RouterProvider router={router} />
        </FavouritesProvider>
      </PokeDataProvider>
    </LoginProvider>
  </StrictMode>,
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
