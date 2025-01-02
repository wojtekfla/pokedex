import { PokeDataContext } from "../../../context/PokeDataContext";
import { PokemonCard } from "./PokemonCard";
import { useContext } from "react";

export function PokemonsList( { handleFavorites} ) {
  const {pokemonsData, setPokemonsData} = useContext(PokeDataContext)
  const { favouritesData, setFavouritesData} = useContext(FavouritesContext)

  console.log("pokemos data", pokemonsData)

  console.log('pok list', pokemonsData)
  console.log('pok list', setPokemonsData)

  return (
    <>
      <div className="grid grid-cols-4">
        {pokemonsData.map((pokemon) => {
          return <PokemonCard pokemon={pokemon} key={pokemon.id} handleFavorites={handleFavorites} props={pokemonsData}/>;
        })}
      </div>
    </>
  );
}




