import { useParams } from "react-router-dom";
import { useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { PokemonForm } from "./PokemonForm";

export function EditPokemon() {
  const { id } = useParams();
  const { pokemonsData, updatePokemon } = useContext(PokeDataContext);

  const pokemonToEdit = pokemonsData.find((p) => p.id === Number(id));
  console.log("POKEMON to EDIT", pokemonToEdit);

  if (!pokemonToEdit) return <p> Pokemon not found </p>;

  return (
    <>
      <PokemonForm
        initialValues={pokemonToEdit}
        onSubmit={updatePokemon}
        isEditMode={true}
        usedImageIds={pokemonsData.map((p) => p.id)}
      />
    </>
  );
}



// "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"

