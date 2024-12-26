import {
  Favorites,
  NavBar,
  Wrapper,
  Home,
  Arena,
  Edit,
  Ranking,
  Logout,
} from "../index.js";
import { NavLink } from "react-router-dom";
import { Button } from "../shared/Button.jsx";

const routes = [
  { name: "Home", id: 1, path: "/" },
  { name: "Favorites", id: 2, path: "favorites" },
  { name: "Arena", id: 3, path: "arena" },
  { name: "Ranking", id: 4, path: "ranking" },
  { name: "Edit", id: 5, path: "edit" },
  { name: "Logout", id: 6, path: "logout" },
];

export function Layout() {
  return (
    <>
      <NavBar className="py-3 flex min-h-12 items-center justify-between bg-blue-200 p-2">
        <Wrapper className="flex cursor-pointer">
          <NavLink to="/">
            <div className="px-3 py-1">Home</div>
          </NavLink>
          {/* <Home className="px-3 py-1" /> */}
        </Wrapper>
        <Wrapper className="flex justify-center gap-4">
          <NavLink to="favorites">
            <Button className="rounded bg-sky-500 px-3 py-1 text-white">
              Favorites
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
          <NavLink to="logout">
            <Button className="rounded bg-sky-500 px-3 py-1 text-white">
              Logout
            </Button>
          </NavLink>
        </Wrapper>
      </NavBar>
    </>
  );
}
