// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import { App } from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import {
  Favorites,
  Wrapper,
  Home,
  Arena,
  Edit,
  Ranking,
  Logout,
} from "./components/index.js";

const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      { element: <Home />, path: "/" },
      { element: <Favorites />, path: "/favorites" },
      { element: <Arena />, path: "/arena" },
      { element: <Ranking />, path: "/ranking" },
      { element: <Edit />, path: "/edit" },
      { element: <Logout />, path: "/logout" },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <>
      <RouterProvider router={router} />
  </>,
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
