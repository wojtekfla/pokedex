import { useContext, useEffect, useState } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { LoginContext } from "../../../context/LoginContext";
import { Modal } from "../../shared/Modal";
import { PokemonCard } from "./PokemonCard";
import { PokemonDetails } from "./PokemonDetails";

export function PokemonsList() {
  const {
    toggleArena,
    handleFavouriteClick,
    currentPokemons,
    currentPage,
    totalPages,
    nextPage,
    prevPage,
  } = useContext(PokeDataContext);

  const { isLoggedIn } = useContext(LoginContext);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    console.log("clicked pokemon", selectedPokemon);
  }, [selectedPokemon]);

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const modalClose = () => {
    setSelectedPokemon(null);
  };

//   console.log("filteredPokemons", filteredPokemons);
//  console.log("paginatedPokemons", paginatedPokemons);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {currentPokemons.map((pokemon) => {
          return (
            <PokemonCard
              pokemon={pokemon}
              key={pokemon.id}
              handleFavouriteClick={handleFavouriteClick}
              handleArena={toggleArena}
              handleCardClick={handleCardClick}
              isLoggedIn={isLoggedIn}
            />
          );
        })}
      </div>
      {selectedPokemon && (
        <Modal onClose={modalClose}>
          <PokemonDetails pokemon={selectedPokemon} />
        </Modal>
      )}

      <div className="mt-6 flex justify-center gap-4 bg-yellow-100">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
        >
          ⬅️ Poprzednia
        </button>
        <span className="text-lg font-bold">
          {currentPage} / {totalPages}
        </span>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white disabled:bg-gray-300"
        >
          Następna ➡️
        </button>
      </div>
    </>
  );
}

{
  /* <Modal onClose={() => setSelectedPokemon(null)}>
  <PokemonDetails pokemon={selectedPokemon} />
</Modal>; */
}
