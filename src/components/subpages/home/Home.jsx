import { useState, useEffect, useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { FavouritesContext } from "../../../context/FavouritesContext";

import { SearchPokemons } from "./SearchPokemons";
import { PokemonsList } from "./PokemonsList";
import { PokemonCard } from "./PokemonCard";

export function Home() {
  const { pokemonsData, setPokemonsData } = useContext(PokeDataContext);
  const { favouritesData, setFavouritesData} = useContext(FavouritesContext)
  // console.log("context in home", pokemonsData);

  function handleFavorites2(pokemon, id, ) {
    // e.stopPropagation()
    let favPokemon = pokemonsData.forEach.filter((poke) => poke.id === id);
    setFavouritesData((prev) => ({...prev}, favPokemon))
    console.log("fav pokemons", favouritesData);
  }

  useEffect (() => {
    console.log('effect pokemons', pokemonsData)
    console.log('effect fav pokemons', favouritesData)
  }, [pokemonsData, favouritesData])


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
                // handleFavorites={handleFavorites}
                props={{pokemonsData, setFavouritesData}}
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
