import { useContext, useState } from "react";
import { LoginContext } from "../../../context/LoginContext";
import { PokeDataContext } from "../../../context/PokeDataContext";

import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { Button } from "../../shared/Button";
import { PokemonCard } from "../Home/PokemonCard";

export function Edit() {
  const { isLoggedIn } = useContext(LoginContext);
  const { pokemonsData } = useContext(PokeDataContext);
  const navigate = useNavigate();
  // const [showOutlet, setShowOutlet] =useState(false)

  const location = useLocation();
  const isOnEditRoot = location.pathname === "/edit";

  function handleCreateNewPokemonClick() {
    navigate("/edit/new");
  }

  function handleEditPokemonClick(pokemonId) {
    // setShowOutlet(true)
    navigate(`/edit/${pokemonId}`);
  }

  const visiblePokemons = isLoggedIn
    ? pokemonsData
    : pokemonsData.filter((p) => !p.isCustom && !p.edited);

  return (
    <>
      {isOnEditRoot ? (
        <div className="mx-auto max-w-5xl px-4 py-8">
          <h1 className="mb-6 text-2xl font-bold text-gray-900 dark:text-gray-300">
            Edycja Pokemonów
          </h1>

          {isLoggedIn && (
            <div className="mb-6 text-center">
              <button
                onClick={handleCreateNewPokemonClick}
                className="rounded bg-blue-600 px-4 py-2 text-gray-100 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                Stwórz nowego Pokemona
              </button>
            </div>
          )}

          <div className="overflow-x-auto rounded shadow-md">
            <table className="min-w-full border dark:border-gray-600">
              <tbody>
                {visiblePokemons.map((pokemon, index) => (
                  <tr
                    key={pokemon.id}
                    className={`${
                      index % 2 === 0
                        ? "bg-slate-300 dark:bg-gray-800"
                        : "bg-slate-400 dark:bg-gray-700"
                    } hover:bg-slate-100 dark:hover:bg-gray-600`}
                  >
                    <td className="border px-4 py-2 text-center text-gray-900 dark:border-gray-700 dark:text-gray-100">
                      {index + 1}
                    </td>
                    <td className="border px-4 py-2 text-center dark:border-gray-700">
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`}
                        alt={pokemon.name}
                        className="z-10 mx-auto aspect-square h-12"
                        // transition-transform duration-200 hover:scale-125
                      />
                    </td>
                    <td className="border px-4 py-2 text-gray-900 dark:border-gray-700 dark:text-gray-100">
                      {pokemon.name}
                    </td>
                    {isLoggedIn && (
                      <td className="border px-4 py-2 text-center dark:border-gray-700">
                        <button
                          onClick={() => handleEditPokemonClick(pokemon.id)}
                          className="rounded bg-sky-500 px-4 py-1 text-slate-100 hover:bg-sky-600 dark:bg-blue-500 dark:hover:bg-blue-600"
                        >
                          Edytuj
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </>
  );
}
