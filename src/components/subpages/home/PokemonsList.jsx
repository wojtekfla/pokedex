import { PokemonCard } from "./PokemonCard";

export function PokemonsList( {pokemonsData} ) {

  console.log('pok list', pokemonsData)

  return (
    <>
      <div className="grid grid-cols-4">
        {pokemonsData.map((pokemon) => {
          return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
        })}
      </div>
    </>
  );
}




