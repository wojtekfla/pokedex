import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../../shared/Button";

import { LoginContext } from "../../../context/LoginContext";
import { useContext } from "react";

export function Login() {
  const { isLoggedIn, setIsLoggedIn } = useContext(LoginContext)


  return (
    <>
      {/* <div className="flex mt-2 max-h-8 justify-center"> */}
      <div className="flex justify-center items-center min-h-12 mt-1 bg-amber-100">
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
      </div>
    </>
  );
}
