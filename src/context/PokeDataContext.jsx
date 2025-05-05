import { createContext, useContext, useState, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import { useFetchPokemons } from "../hooks/useFetchPokemons";
import { LoginContext } from "../context/LoginContext";
import { BASE_URL, JSON_SERVER_URL } from "../utils/constants";

const ITEMS_PER_PAGE = 30;

export const PokeDataContext = createContext();

export const PokeDataProvider = ({ children }) => {
  const { pokemons, setPokemons, error, isLoading } = useFetchPokemons();
  const { isLoggedIn, loggedUser } = useContext(LoginContext);
  const [pokemonsData, setPokemonsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPokemons, setFilteredPokemons] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    const mergePokemons = async () => {
      if (!isLoggedIn) {
        setPokemonsData(pokemons); // pokemony tylko z API
        return;
      }

      try {
        const jsonRes = await fetch(JSON_SERVER_URL);
        const jsonPokemons = await jsonRes.json();

        const merged = pokemons.map((pokemon) => {
          const local = jsonPokemons.find((p) => p.id === pokemon.id);
          return local ? { ...pokemon, ...local } : pokemon;
        });

        const newLocalOnly = jsonPokemons.filter(
          (local) => !pokemons.some((apiP) => apiP.id === local.id),
        );

        setPokemonsData([...merged, ...newLocalOnly]);
      } catch (err) {
        console.error("Błąd przy pobieraniu z json-servera:", err);
        setPokemonsData(pokemons); // fallback
      }
    };

    mergePokemons();
  }, [pokemons, isLoggedIn]);

  useEffect(() => {
    if (searchName.trim() === "") {
      setFilteredPokemons(pokemonsData);
    } else {
      const filtered = pokemonsData.filter((pokemon) => {
        return pokemon.name.toLowerCase().includes(searchName.toLowerCase());
      });
      setFilteredPokemons(filtered);
    }
  }, [searchName, pokemonsData]);


  const paginationSource =
    searchName.trim() === "" ? pokemonsData : filteredPokemons;

  const totalPages = Math.ceil(paginationSource.length / ITEMS_PER_PAGE);
  const lastIndex = currentPage * ITEMS_PER_PAGE;
  const startIndex = lastIndex - ITEMS_PER_PAGE;

  const currentPokemons = filteredPokemons.slice(startIndex, lastIndex);

  function nextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }
  function prevPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  useEffect(() => {
    setCurrentPage(1);
  }, [searchName]); // nie wiem czy to potrzebne

  // favourite
  function toggleFavourite(id) {
    if (!loggedUser) {
      enqueueSnackbar("Zaloguj się aby dodawać do ulubionych", {
        variant: "info",
      });
      return;
    }

    const selectedPokemon = pokemonsData.find((p) => p.id === id);
    if (!selectedPokemon) return;

    const updatedFavourite = !selectedPokemon.isFavourite;

    setPokemonsData((prev) =>
      prev.map((p) =>
        p.id === id ? { ...p, isFavourite: updatedFavourite } : p,
      ),
    );
  }

  // arena
  function toggleArena(id) {
    const selectedPokemon = pokemonsData.find((p) => p.id === id);
    console.log("selected pokemon", selectedPokemon);

    if (selectedPokemon?.isInArena) {
      setPokemonsData((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isInArena: false } : p)),
      );
      return;
    }

    const pokemonsInArena = pokemonsData.filter((p) => p.isInArena);
  
    if (pokemonsInArena.length >= 2) {
      enqueueSnackbar("You can only add 2 Pokemons to the arena!", {
        variant: "warning",
      });
      return;
    }

    setPokemonsData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isInArena: true } : p)),
    );
  }

  async function handleFavouriteClick(pokemon) {
    const updatedPokemon = { ...pokemon, isFavourite: !pokemon.isFavourite };
    console.log("handle fav click pokemon", updatedPokemon);

    try {
      const response = await fetch(`${BASE_URL}/pokemons/${pokemon.id}`);

      if (response.ok) {
        const data = await response.json();

        if (!updatedPokemon.isFavourite && !data.edited) {
          // pokemon nie istniał w json-server jako edited lub po walce i został odklikniety
          await fetch(`${BASE_URL}/pokemons/${pokemon.id}`, {
            method: "DELETE",
          });
        } else {
          // pokemon istnieje w json-server, aktualizujemu pole favourite
          await fetch(`${BASE_URL}/pokemons/${pokemon.id}`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ isFavourite: updatedPokemon.isFavourite }),
          });
        }
      } else {
        // pokemon nie istnieje, dodajemy nowy element do tablicy pokemonów
        await fetch(`${BASE_URL}/pokemons`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedPokemon),
        });
      }

      toggleFavourite(pokemon.id);
    } catch (error) {
      console.error("Błąd przy zapisie favourite do JSON-a", error);
    }
  }

  // obsługa po walce w arenie stara wersja skasowac
  const handleDataFromJson2 = (data) => {
    const newData = pokemonsData.map((item) => {
      const element = data.find((itemFromJson) => itemFromJson.id === item.id);
      if (element) {
        console.log("Handle data from JSON", element);
        return { ...item, ...element };
      } else {
        return { ...item };
      }
    });
    setPokemonsData(newData);
  }

  async function updatePokemon(updatedPokemon) {
    try {
      // 1. sprawdzam czy pokemon jest już w bazie JSON-server
      const getResponse = await fetch(
        `${JSON_SERVER_URL}/${updatedPokemon.id}`,
      );

      let finalPokemonData;

      if (getResponse.ok) {
        // 2a. Pokemon istnieje, wykonuje PATCH
        const existingJson = await getResponse.json();
        finalPokemonData = {
          ...existingJson,
          ...updatedPokemon,
          edited: true,
        };
        const patchResponse = await fetch(
          `${JSON_SERVER_URL}/${updatedPokemon.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(finalPokemonData),
          },
        );

        if (!patchResponse.ok) {
          throw new Error("Failed to patch existing Pokemon");
        }

        enqueueSnackbar(
          `Pokemon "${updatedPokemon.name}" updated successfuly`,
          { variant: "success" },
        );
      } else if (getResponse.status === 404) {
        // 2b. Pokemon nie istnieje w bazie, pobieram dane z lokalnego stanu pokemonow z API w celu stworenia obiektu z potrzebnymi polami
        const pokemonDataFromApi = pokemons.find(
          (p) => p.id === updatedPokemon.id,
        );

        if (!pokemonDataFromApi) {
          throw new Error("Pokemon not found in local state");
        }

        finalPokemonData = {
          ...pokemonDataFromApi,
          ...updatedPokemon,
          edited: true,
        };
        console.log("Final pokemon data", finalPokemonData);

        const postResponse = await fetch(`${JSON_SERVER_URL}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(finalPokemonData),
        });

        if (!postResponse.ok) {
          throw new Error("Failed to add new Pokemon to JSON-server");
        }

        enqueueSnackbar(`Pokemon "${updatedPokemon.name}" added to database`, {
          variant: "success",
        });
      } else {
        // 2c. inny błąd HTTP niż 404
        throw new Error(`Unexpected response status: ${getResponse.status}`);
      }

      // 3. Aktualizuje stan dla listy pokemonów
      setPokemonsData((prev) => {
        const existPokemon = prev.some((p) => p.id === finalPokemonData.id);

        console.log("final exist pokemon", existPokemon);

        if (existPokemon) {
          return prev.map((p) =>
            p.id === finalPokemonData.id ? finalPokemonData : p,
          );
        } else {
          return [...prev, finalPokemonData];
        }
      });

      enqueueSnackbar(
        `Pokemon "${finalPokemonData.name}" updated successfuly!`,
        {
          variant: "success",
        },
      );
    } catch (error) {
      console.error("updatePokemon error: ", error);
      enqueueSnackbar(`Error updating Pokemon: ${error.message}`, {
        variant: "error",
      });
    }
  }

  const createPokemon = async (pokemon) => {
    const newPokemon = {
      ...pokemon,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      win: 0,
      loss: 0,
      ability: "none",
      isFavourite: false,
      isInArena: false,
      edited: true,
      isCustom: true,
    };

    console.log("NEW pokemon in context", newPokemon);
    try {
      // sprawdzam czy pokemon ma unikalne ID
      const res = await fetch(`${JSON_SERVER_URL}?id={newPokemon.id}`);
      const existing = await res.json();

      if (existing.length > 0) {
        enqueueSnackbar("A Pokemon with this ID already exist", {
          variant: "error",
        });
        return;
      }

      // pokemon ma unikalne ID, tworzę nowego Pokemona
      const response = await fetch(`${JSON_SERVER_URL}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...newPokemon,
          isCustom: true,
          edited: true,
          win: 0,
          loss: 0,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create Pokemon");
      }

      const savedNewPokemon = await response.json();
      console.log("NEW POKEMON", savedNewPokemon);

      setPokemonsData((prev) => [...prev, savedNewPokemon]);
      enqueueSnackbar("Pokémon created successfully!", { variant: "success" });
    } catch (error) {
      console.error("Error creating Pokemon: ", error);
      enqueueSnackbar("An error occures while creating new Pokemon", {
        variant: "error",
      });
      throw error;
    }
  };

  return (
    <PokeDataContext.Provider
      value={{
        pokemons,
        setPokemons,
        error,
        isLoading,
        toggleFavourite,
        toggleArena,
        pokemonsData,
        setPokemonsData,
        handleDataFromJson2,
        currentPage,
        totalPages,
        nextPage,
        prevPage,
        handleFavouriteClick,
        updatePokemon,
        createPokemon,
        searchName,
        setSearchName,
        filteredPokemons,
        currentPokemons,
      }}
    >
      {children}
    </PokeDataContext.Provider>
  );
};

export const usePokeData = () => {
  return useContext(PokeDataContext);
};
