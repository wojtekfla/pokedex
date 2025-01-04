import { useState, useEffect, useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { FavouritesContext } from "../../../context/FavouritesContext";

import { SearchPokemons } from "./SearchPokemons";
import { PokemonsList } from "./PokemonsList";
import { PokemonCard } from "./PokemonCard";

const FAV_URL = 'http://localhost:3000/favourites'

export function Home() {
  const { pokemonsData, setPokemonsData, toggleFavourite } = useContext(PokeDataContext);
  const { favouritesData, setFavouritesData } = useContext(FavouritesContext);
  // console.log("context in home", pokemonsData);

  const addData = async (url, bodyData) => {
    try {
      const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
        },
      })
    } catch (e) {
      console.error('Error', e)
    }
  }

  function handleFavouriteClick(newFavouritePokemon) {
    console.log("fav poke handled", newFavouritePokemon);
    setFavouritesData((prev) => ({ ...prev, newFavouritePokemon} ));
    toggleFavourite(newFavouritePokemon.id)
    addData(FAV_URL, {...newFavouritePokemon, isFavourite: true})
    
  }

  useEffect(() => {
    console.log("effect pokemons", pokemonsData);
    console.log("effect fav pokemons", favouritesData);
  }, [pokemonsData, favouritesData]);

  return (
    <>
      <SearchPokemons />
      <>
        <div className="grid grid-cols-4">
          {pokemonsData.map((pokemon) => {
            return (
              <PokemonCard
                pokemon={pokemon}
                key={pokemon.id}
                handleClick={handleFavouriteClick}
                props={{ pokemonsData, setFavouritesData }}
              />
            );
          })}
        </div>
      </>
    </>
  );
}

{
  /* <img className="" src={data.sprites?.other["official-artwork"].front_dafault}></img> */
}
