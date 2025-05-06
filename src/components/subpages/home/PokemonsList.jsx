import { useContext, useState } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { LoginContext } from "../../../context/LoginContext";
import { Modal } from "../../shared/Modal";
import { PokemonCard } from "./PokemonCard";
import { PokemonDetails } from "./PokemonDetails";
import { Pagination } from "../../shared/Pagination";

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

  const handleCardClick = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const modalClose = () => {
    setSelectedPokemon(null);
  };

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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        nextPage={nextPage}
        prevPage={prevPage}
      />
    </>
  );
}





