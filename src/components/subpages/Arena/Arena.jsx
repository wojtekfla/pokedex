// import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button } from "../../shared/Button";
import { LuSwords } from "react-icons/lu";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { PokemonCard } from "../Home/PokemonCard";

export function Arena() {
  const [pokemonsInArena, setPokemonsInArena] = useState(null);
  const { pokemonsData, toggleArena } = useContext(PokeDataContext);

  const handleClick = () => {
    // const pokemonsInArena = pokemonsData.filter(
    //   (item) => item.isArena === true,
    // );
    console.log("poke in arena", pokemonsInArena);
    console.log("pok1", pokemon1);
  };
  let pokemon1;
  if (pokemonsInArena) {
    pokemonsInArena.map((item) => {
      console.log("item", item);
    });
    pokemon1 = pokemonsInArena[0];
  }
  let pokemon2;

  useEffect(() => {
    const pokemonsToArena = pokemonsData.filter(
      (item) => item.isArena === true,
    );
    setPokemonsInArena(pokemonsToArena);
    // pokemon1 = pokemonsInArena[0]
    // pokemon2 = pokemonsInArena[1]
    // console.log('pok1', pokemon1)
    // console.log('pok2', pokemon2)
  }, []);

  return (
    <>
      <div></div>
      <div className="mx-auto my-3 w-11/12 flex justify-center text-center">
        <div className="h-4/5 w-2/5 outline outline-2">
          {pokemonsInArena && pokemonsInArena[0] ? (
            <PokemonCard pokemon={pokemonsInArena[0]} />
          ) : (
            <div>
              Pokemon 1
            </div>
          )}
        </div>

        <div className="mx-5">
          <button>
            <LuSwords className="size-12 outline outline-1 rounded" />
          </button>
        </div>

        <div className="h-4/5 w-2/5 outline outline-2">
          {pokemonsInArena && pokemonsInArena[1] ? (
            <PokemonCard pokemon={pokemonsInArena[1]} />
          ) : (
            <div>
              Pokemon 2
            </div>
          )}
        </div>
      </div>
      <div className="mx-auto flex justify-center">
        <Button
          onClick={handleClick}
          className="rounded bg-sky-500 px-3 py-1 text-white"
        >
          pokaż arene
        </Button>
      </div>
    </>
  );
}
