import { FavouritesContext } from "../../../context/FavouritesContext";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { PokemonCard } from "./PokemonCard";
import { useContext, useEffect } from "react";

export function PokemonsList( {handleFavClick} ) {
  const { pokemonsData, setPokemonsData, toggleFavourite, handleDataFromJson } = useContext(PokeDataContext)
  const { favouritesData, setFavouritesData } = useContext(FavouritesContext)

  // function handleFavouriteClick (newFavouritePokemon) {
  //   console.log('fav poke handled', newFavouritePokemon)
  // }



  return (
    <>
        <div className="grid grid-cols-4">
          {pokemonsData.map((pokemon) => {
            return (
              <PokemonCard
                pokemon={pokemon}
                key={pokemon.id}
                handleFavouriteClick={handleFavClick}
                props={{ pokemonsData, setFavouritesData }}
                // toggleArena2={toggleArena2}
              />
            );
          })}
        </div>
      </>
  );
}




