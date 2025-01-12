// import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Button } from "../../shared/Button";
import { LuSwords } from "react-icons/lu";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { PokemonCard } from "../Home/PokemonCard";
import { saveToJson } from "../../../utils/saveToJson"; 
import { useNavigate } from "react-router-dom";

const POKE_URL = "http://localhost:3000/pokemons"

export function Arena() {
  const [pokemonsInArena, setPokemonsInArena] = useState([]);
  const { pokemonsData, toggleArena } = useContext(PokeDataContext);

  const navigate = useNavigate()

  const handleClick = () => {
    // const pokemonsInArena = pokemonsData.filter(
    //   (item) => item.isArena === true,
    // );
    console.log("poke in arena", pokemonsInArena);
  };

  const clearArena = () => {
    setPokemonsInArena([])
    console.log('Cleared !!!')  
    navigate("/")
  }

  const handleFightClick = () => {
    let pokemonOne = pokemonsInArena[0]
    let pokemonTwo = pokemonsInArena[1]
    let winner = ""

    const pokemonOnePower = pokemonOne.base_exp * pokemonOne.weight
    const pokemonTwoPower = pokemonTwo.base_exp * pokemonTwo.weight

    console.log('pokemons to fight')
    console.log('pok1', pokemonOnePower)
    console.log('pok2', pokemonTwoPower)

    if (pokemonOnePower === pokemonTwoPower)
      return alert('A drow, no one lost')

    if (pokemonOnePower > pokemonTwoPower) {
      pokemonOne = {...pokemonOne, win: pokemonOne.win +1, base_exp: Number(pokemonOne.base_exp + 10)}
      pokemonTwo = {...pokemonTwo, loss: pokemonTwo.loss +1}
      console.log('pok1', pokemonOne)
      console.log('pok2', pokemonTwo) 
    } else {
      pokemonTwo = {...pokemonTwo, win: pokemonOne.win +1, base_exp: Number(pokemonTwo.base_exp + 10)}
      pokemonOne = {...pokemonOne, loss: pokemonTwo.loss +1}
      console.log('pok1', pokemonOne)
      console.log('pok2', pokemonTwo) 
    }

    saveToJson(POKE_URL, {...pokemonOne, isArena: false})
    saveToJson(POKE_URL, {...pokemonTwo, isArena: false})

    setTimeout(() => clearArena(), 3*1000);
  }


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
        <div className="min-h-[400px] h-4/5 w-2/5 outline outline-2">
          {pokemonsInArena.length > 0 && pokemonsInArena[0] ? (
            <PokemonCard pokemon={pokemonsInArena[0]} />
          ) : (
            <div>
              Pokemon 1
            </div>
          )}
        </div>

        <div className="my-auto mx-5 min-h-20">
          <button onClick={handleFightClick} className="">
            <LuSwords className="my-auto size-12 outline outline-1 rounded " />
          </button>
        </div>

        <div className="min-h-[400px] h-4/5 w-2/5 outline outline-2">
          {pokemonsInArena.length > 0 && pokemonsInArena[1] ? (
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
