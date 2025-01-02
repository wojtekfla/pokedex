import { NavBar, Wrapper } from "../index.js";
import { NavLink } from "react-router-dom";
import { Button } from "../shared/Button.jsx";

const routes = [
  { name: "Home", id: 1, path: "/" },
  { name: "Favourites", id: 2, path: "favourites" },
  { name: "Arena", id: 3, path: "arena" },
  { name: "Ranking", id: 4, path: "ranking" },
  { name: "Edit", id: 5, path: "edit" },
  { name: "Login", id: 6, path: "loginform" },
];

export function Layout() {
  return (
    <>
      <NavBar className="flex min-h-12 items-center justify-between bg-blue-200 p-2 py-3">
        <Wrapper className="flex cursor-pointer">
          <NavLink to="/">
            <div className="px-3 py-1">Home</div>
          </NavLink>
          {/* <Home className="px-3 py-1" /> */}
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
          <NavLink to="loginform">
            <Button className="rounded bg-sky-500 px-3 py-1 text-white">
              Login
            </Button>
          </NavLink>
        </Wrapper>
      </NavBar>
    </>
  );
}
