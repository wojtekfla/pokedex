import { useContext, useState, useEffect } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { LoginContext } from "../../../context/LoginContext";

import { PokemonCard } from "../Home/PokemonCard";
import { IoIosHeartEmpty } from "react-icons/io";

export function Favourites() {
  const { isLoggedIn } = useContext(LoginContext);
  const { pokemonsData, toggleArena, handleFavouriteClick } =
    useContext(PokeDataContext);

  const [favouritesPokemons, setFavouritesPokemons] = useState([]);

  useEffect(() => {
    setFavouritesPokemons(pokemonsData.filter((p) => p.isFavourite));
  }, [pokemonsData]);

  return (
    <>
      {favouritesPokemons.length > 0 ? (
        <ul className="grid grid-cols-2 pt-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {favouritesPokemons.map((pokemon) => (
            <PokemonCard
              pokemon={pokemon}
              key={pokemon.id}
              handleFavouriteClick={handleFavouriteClick}
              handleArena={toggleArena}
              isLoggedIn={isLoggedIn}
            />
          ))}
        </ul>
      ) : (
        <div className="my-12 flex flex-col items-center justify-center rounded-xl bg-blue-50 p-6 shadow-lg dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-900 dark:shadow-xl">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png"
            alt="Pikachu"
            className="mb-4 h-24 w-24"
          />
          <h2 className="mb-2 text-2xl font-bold text-blue-700 dark:text-blue-200">
            No favourites yet!
          </h2>
          <div className="flex flex-row items-center">
            <p className="px-2 text-center text-gray-600 dark:text-gray-400">
              Find your favourites and click
            </p>
            <IoIosHeartEmpty className="size-6 min-h-8" />
          </div>
        </div>
      )}
    </>
  );
}
