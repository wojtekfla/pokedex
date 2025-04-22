import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { PokemonForm } from "./PokemonForm";

export function EditPokemon() {
  const { id } = useParams();
  const { pokemonsData, updatePokemon } = useContext(PokeDataContext);

  const pokemonToEdit = pokemonsData.find((p) => p.id === Number(id));
  console.log('POKEMON to EDIT', pokemonToEdit)

  if (!pokemonToEdit) return <p> Pokemon not found </p>;

  return (
    <>
    <h1>EDYCJA POKEMONA</h1>
    
    <PokemonForm
      initialValues={pokemonToEdit}
      onSubmit={() => console.log('pokemon to EDIT', pokemonToEdit)}
      // onSubmit={updatePokemon}
      isEditMode={true}
      usedImageIds={pokemonsData.map((p) => p.id)}
    />
    </>
    
  );
}
