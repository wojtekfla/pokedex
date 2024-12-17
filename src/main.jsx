// import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom"


// const router = createBrowserRouter([
//   {
//     element: <App />,
//     path: '/'

//   }
// ])

createRoot(document.getElementById("root")).render(
	<>
		{/* <RouterProvider router={router}/> */}
    <App/>
	</>
);

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )
