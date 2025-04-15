import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../../shared/Button";

import { useContext } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { ThemeContext } from "../../../context/ThemeContext";
import clsx from "clsx";

export function Login() {
  // const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div
        className={clsx(
          "min-h-screen",
          darkMode ? "bg-gray-900 text-gray-300" : "bg-orange-300 text-gray-900",
        )}
      >
        <div className="mt-1 flex min-h-12 items-center justify-center">
          <NavLink to="registration" className="mx-2">
            <Button className="rounded bg-sky-500 hover:bg-sky-600 px-3 py-1 text-white dark:bg-sky-700 dark:hover:bg-sky-600">
              Register
            </Button>
          </NavLink>
          <NavLink to="loginForm" className="mx-2">
            <Button className="rounded bg-sky-500 hover:bg-sky-600 px-3 py-1 text-white dark:bg-sky-700 dark:hover:bg-sky-600">
              Login
            </Button>
          </NavLink>
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

{
  /* <div className="flex justify-center items-center min-h-12 mt-1 bg-amber-100">
<NavLink to="registration" className="mx-2">
  <Button className="rounded bg-sky-500 px-3 py-1 text-white">
    Register
  </Button>
</NavLink>
<NavLink to="loginForm" className="mx-2">
  <Button className="rounded bg-sky-500 px-3 py-1 text-white">
    Login
  </Button>
</NavLink>
</div>
<div>
<Outlet />
</div> */
}
