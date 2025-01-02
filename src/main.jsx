// import { StrictMode } from 'react'
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
  LoginForm,
} from "./components/index.js";
import { PokeDataProvider } from "./context/PokeDataContext.jsx";
import { FavouritesProvider } from "./context/FavouritesContext.jsx";

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
      { element: <LoginForm />, path: "/loginform" },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <>
    <PokeDataProvider>
      <FavouritesProvider>
        <RouterProvider router={router} />
      </FavouritesProvider>
    </PokeDataProvider>
  </>,
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
