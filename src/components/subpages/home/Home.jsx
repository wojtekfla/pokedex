import { useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";

import { SearchPokemons } from "./SearchPokemons";
import { PokemonsList } from "./PokemonsList";


export function Home() {

  return (
    <>
      <SearchPokemons />
      <PokemonsList />
    </>
  );
}
