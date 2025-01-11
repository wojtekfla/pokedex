// import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import { Button } from "../../shared/Button";
import { LuSwords } from "react-icons/lu";
import { PokeDataContext } from "../../../context/PokeDataContext";


export function Arena() {
  const [pokemonsInArena, setPokemonsInArena] = useState (null)
  const { pokemonsData, toggleArena } = useContext(PokeDataContext);

  const handleClick = () => {
    const pokemonsInArena = pokemonsData.filter((item) => item.isArena === true)
    console.log('poke in arena', pokemonsInArena)
  }


  return (
    <>

    <div>


    </div>
    <div className="mx-auto my-3 text-center flex justify-center w-11/12 ">
      <div className="outline outline-2 w-2/5 h-4/5 min-h-60">pokemon 1</div>
      <div className="mx-5"><button><LuSwords className="size-10" /></button></div>
      <div className="outline outline-2 w-2/5 h-4/5 min-h-60">pokemon 2</div>  
    </div>
     
      <div className="mx-auto flex justify-center">
      <Button onClick={handleClick} className=" rounded bg-sky-500 px-3 py-1 text-white">pokaż arene</Button>
      </div>
      
    </>
  );
}
