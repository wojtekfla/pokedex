import { useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";

import { SearchPokemons } from "./SearchPokemons";
import { PokemonsList } from "./PokemonsList";


export function Home() {
  // const {
  //   toggleArena,
  //   handleFavouriteClick,
  // } = useContext(PokeDataContext);

  return (
    <>
      <SearchPokemons />
      <PokemonsList
        // handleFavClick={handleFavouriteClick}
        // handleArena={toggleArena}
      />
    </>
  );
}
