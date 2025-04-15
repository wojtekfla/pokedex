import { useContext, useEffect, useState } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { useNavigate } from "react-router-dom";

import { Button } from "../../shared/Button";
import { PokemonCard } from "../Home/PokemonCard";
import { saveToJson } from "../../../utils/saveToJson";
import { loadFromJson } from "../../../utils/loadFromJson";
import { enqueueSnackbar, useSnackbar } from "notistack";
import { LuSwords } from "react-icons/lu";

import { API_URL, JSON_SERVER_URL } from "../../../utils/constants";

export function Arena() {
  // const [pokemonsInArena, setPokemonsInArena] = useState([]);
  const { pokemonsData, setPokemonsData, handleDataFromJson } =
    useContext(PokeDataContext);
  const navigate = useNavigate();

  let pokemonsInArena = pokemonsData.filter((item) => item.isInArena === true);


  const handleFightClick = () => {
    let [pokemonOne, pokemonTwo] = pokemonsData.filter(
      (item) => item.isInArena === true,
    );

    const pokemonOnePower = pokemonOne.base_exp * pokemonOne.weight;
    const pokemonTwoPower = pokemonTwo.base_exp * pokemonTwo.weight;

    console.log("pokemons to fight");
    console.log("pok1", pokemonOnePower);
    console.log("pok2", pokemonTwoPower);

    if (pokemonOnePower === pokemonTwoPower) {
      enqueueSnackbar("A drow, no one lost"), { variant: "info" };
    }

    if (pokemonOnePower > pokemonTwoPower) {
      pokemonOne = {
        ...pokemonOne,
        win: pokemonOne.win + 1,
        base_exp: Number(pokemonOne.base_exp + 10),
        edited: true,
      };
      pokemonTwo = { ...pokemonTwo, loss: pokemonTwo.loss + 1, edited: true };
    } else {
      pokemonTwo = {
        ...pokemonTwo,
        win: pokemonTwo.win + 1,
        base_exp: Number(pokemonTwo.base_exp + 10),
        edited: true,
      };
      pokemonOne = { ...pokemonOne, loss: pokemonOne.loss + 1, edited: true };
    }

    enqueueSnackbar("Battle finished! Updating stats...", {
      variant: "success",
    });

    const newPokemonOne = { ...pokemonOne, isInArena: false };
    saveData(JSON_SERVER_URL, newPokemonOne);
    const newPokemonTwo = { ...pokemonTwo, isInArena: false };
    saveData(JSON_SERVER_URL, newPokemonTwo);

    setTimeout(() => {
      handleDataFromJson([newPokemonOne, newPokemonTwo]);
      // pokemonsInArena = null
      navigate("/");
    }, 2 * 1000);
  };

  async function saveData(url, data) {
    await saveToJson(url, data);
  }

  return (
    <>
      <div className="mx-auto my-3 flex w-11/12 justify-center text-center">
        <div className="h-4/5 min-h-[400px] w-2/5 outline outline-2">
          {pokemonsInArena.length > 0 && pokemonsInArena[0] ? (
            <PokemonCard pokemon={pokemonsInArena[0]} />
          ) : (
            <div>Pokemon 1</div>
          )}
        </div>

        <div className="mx-5 my-auto min-h-20">
          <button onClick={handleFightClick} className="">
            <LuSwords className="my-auto size-12 rounded outline outline-1" />
          </button>
        </div>

        <div className="h-4/5 min-h-[400px] w-2/5 outline outline-2">
          {pokemonsInArena.length > 0 && pokemonsInArena[1] ? (
            <PokemonCard pokemon={pokemonsInArena[1]} />
          ) : (
            <div>Pokemon 2</div>
          )}
        </div>
      </div>
    </>
  );
}


