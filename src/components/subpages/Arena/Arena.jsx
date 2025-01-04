// import { NavLink } from "react-router-dom";
import { Button } from "../../shared/Button";
import { LuSwords } from "react-icons/lu";


export function Arena() {
  return (
    <>
      <Button className="rounded bg-sky-500 px-3 py-1 text-white">Arena</Button>
      <button><LuSwords className="size-5" /></button>
    </>
  );
}
