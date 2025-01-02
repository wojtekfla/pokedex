import { PokeDataContext } from "../../../context/PokeDataContext";
import { PokemonCard } from "./PokemonCard";
import { useContext } from "react";

export function PokemonsList( ) {
  const { pokemonsData, setPokemonsData } = useContext(PokeDataContext)
  const { favouritesData, setFavouritesData } = useContext(FavouritesContext)

  console.log("pokemos data", pokemonsData)
  console.log('pok list', setPokemonsData)

  function handleFavouriteClick (newFavouritePokemon) {
    console.log('fav poke handled', newFavouritePokemon)
  }

  return (
    <>
      <div className="grid grid-cols-4">
        {pokemonsData.map((pokemon) => {
          return <PokemonCard pokemon={pokemon} key={pokemon.id} handleClick={handleFavouriteClick} props={pokemonsData}/>;
        })}
      </div>
    </>
  );
}




