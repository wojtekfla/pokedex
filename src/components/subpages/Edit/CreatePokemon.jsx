import { useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { PokemonForm } from "./PokemonForm";

export function CreatePokemon() {
  const { createPokemon, pokemonsData } = useContext(PokeDataContext);

  console.log('createPokemon', createPokemon)

  const initialEmptyPokemon = {
    name: "",
    weight: 0,
    height: 0,
    base_exp: 0,
    id: 151,
    img: '',
    ability: 'none',
    isFavourite: 'false',
    isInArena: 'false',
    edited: 'true',
    win: '',
    loss: '',
    isCustom: true,
  };

  return (
    <PokemonForm
      initialValues={initialEmptyPokemon}
      onSubmit={createPokemon}
      isEditMode={false}
      usedImageIds={pokemonsData.map((p) => p.id)}
    />
  );
}
