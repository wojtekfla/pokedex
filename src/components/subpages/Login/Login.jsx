import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../../shared/Button";

import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import clsx from "clsx";

export function Login() {
  const { darkMode } = useContext(ThemeContext);

  return (
    <>
      <div
        className={clsx(
          "min-h-screen",
          darkMode ? "bg-gray-900 text-slate-300" : "bg-sky-500 text-gray-900",
        )}
      >
        <div className="py-1 flex min-h-12 items-center justify-center">
          <NavLink to="registration" className="mx-2">
            <Button className="rounded bg-sky-500 hover:bg-sky-600 px-3 py-1 text-slate-300 dark:bg-sky-700 dark:hover:bg-sky-600">
              Register
            </Button>
          </NavLink>
          <NavLink to="loginForm" className="mx-2">
            <Button className="rounded bg-sky-500 hover:bg-sky-600 px-3 py-1 text-slate-300 dark:bg-sky-700 dark:hover:bg-sky-600">
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


