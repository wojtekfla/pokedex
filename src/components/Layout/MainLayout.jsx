import { NavBar, Wrapper } from "../index.js";
import { NavLink } from "react-router-dom";
import { Button } from "../shared/Button.jsx";
import pokemonLogo from "../../assets/pokemon.png";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext.jsx";
import { DarkModeSwitch } from "../../components/subpages/Home/DarkModeSwitch.jsx";
import { Logout } from "../subpages/Login/Logout.jsx";
import { LoginContext } from "../../context/LoginContext.jsx";

// const routes = [
//   { name: "Home", id: 1, path: "/" },
//   { name: "Favourites", id: 2, path: "favourites" },
//   { name: "Arena", id: 3, path: "arena" },
//   { name: "Ranking", id: 4, path: "ranking" },
//   { name: "Edit", id: 5, path: "edit" },
//   { name: "Login", id: 6, path: "login" },
// ];

export function MainLayout() {
  const { darkMode, toggleDarkMode, clearDarkMode } = useContext(ThemeContext);
  const { loggedUser, isLoading } = useContext(LoginContext);

  if (isLoading) return null

  return (
    <>
      <NavBar className="flex min-h-12 items-center justify-between bg-blue-200 p-2 py-3">
        <Wrapper className="flex cursor-pointer">
          <NavLink to="/">
            <div className="px-3 py-1">
              <img className="max-h-12" src={pokemonLogo} />
            </div>
          </NavLink>
        </Wrapper>

        <Wrapper>
          <Wrapper className="mb-1 flex items-center justify-end gap-3 pr-2">
            <div className='flex items-center '>
              {loggedUser && (
                <span className="text-sm font-medium text-gray-800 dark:text-slate-400">
                  {loggedUser.userName}
                </span>
              )}
              <Logout />
            </div>
            <DarkModeSwitch />
          </Wrapper>

          <Wrapper className="flex justify-center gap-4">
            <NavLink to="favourites">
              <Button className="rounded bg-sky-500 px-3 py-1 text-white">
                Favourites
              </Button>
            </NavLink>
            <NavLink to="arena">
              <Button className="rounded bg-sky-500 px-3 py-1 text-white">
                Arena
              </Button>
            </NavLink>
            <NavLink to="ranking">
              <Button className="rounded bg-sky-500 px-3 py-1 text-white">
                Ranking
              </Button>
            </NavLink>
            <NavLink to="edit">
              <Button className="rounded bg-sky-500 px-3 py-1 text-white">
                Edit
              </Button>
            </NavLink>
            <NavLink to="login">
              <Button className="rounded bg-sky-500 px-3 py-1 text-white">
                Login
              </Button>
            </NavLink>
          </Wrapper>
        </Wrapper>
      </NavBar>
    </>
  );
}
