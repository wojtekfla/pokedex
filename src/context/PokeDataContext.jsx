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

  useEffect(() => {
    console.log("Pokemons in context", pokemonsData);
  }, [pokemonsData]);

  useEffect(() => {
    console.log("filteredPokemons", filteredPokemons);
  }, [filteredPokemons]);

  // pagination ver.2
  const paginationSource = searchName.trim() === '' ? pokemonsData : filteredPokemons

  const totalPages = Math.ceil(paginationSource.length / ITEMS_PER_PAGE);
  const lastIndex = currentPage * ITEMS_PER_PAGE
  const startIndex = lastIndex - ITEMS_PER_PAGE;

  const currentPokemons = filteredPokemons.slice(
    startIndex, lastIndex)

  function nextPage() {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  }
  function prevPage() {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  }

  useEffect (() => {
    setCurrentPage(1)
  }, [searchName]) // nie wiem czy to potrzebne 

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
    console.log("pokemons in arena", pokemonsInArena);

    if (pokemonsInArena.length >= 2) {
      enqueueSnackbar("You can only add 2 Pokemons to the arena!", {
        variant: "warning",
      });
      return;
    }

    setPokemonsData((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isInArena: true } : p)),
    );
    // pamiętać o returnie przy zapisie z klamrami fn((a) => { return ... })
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

  // obsługa po walce w arenie, zmienić nazwę
  const handleDataFromJson = (data) => {
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
  };

  async function updatePokemon (updatedPokemon) {
    try {
      const response = await fetch(`${JSON_SERVER_URL}/${updatedPokemon.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedPokemon)
      })

      if (!response.ok) {
        throw new Error('Response not ok, failed to update Pokemon')
      }

      //update local state if succesful request
      const newData = pokemonsData.map((item) => item.id === updatedPokemon.id ? updatedPokemon : item)
      setPokemonsData(newData)
    } catch (error) {
      console.error('In catch: Error updating Pokemon', error)
    }
  }
  
  async function updatePokemon2(updatedPokemon) {
    try {
      // 1️⃣ Najpierw spróbuj PATCH
      const patchRes = await fetch(`${JSON_SERVER_URL}/${updatedPokemon.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedPokemon),
      });
  
      if (patchRes.ok) {
        // ✅ PATCH zadziałał — pobierz z serwera zwrócony obiekt (może mieć dodatkowe pola)
        const saved = await patchRes.json();
        setPokemonsData((prev) =>
          prev.map((p) => (p.id === saved.id ? saved : p))
        );
        return;
      }
  
      if (patchRes.status === 404) {
        // 📦 Zasób nie istniał — utwórz nowego Pokemona
        const postRes = await fetch(`${JSON_SERVER_URL}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...updatedPokemon, edited: true, isCustom: true }),
        });
  
        if (!postRes.ok) {
          throw new Error(`Failed to create Pokemon (status ${postRes.status})`);
        }
  
        const created = await postRes.json();
        setPokemonsData((prev) => [...prev, created]);
        return;
      }
  
      // 🤷‍♂️ Inny kod odpowiedzi niż 2xx/404
      throw new Error(`Failed to update Pokemon (status ${patchRes.status})`);
    } catch (err) {
      // Logujemy tylko raz wszystkie nieoczekiwane błędy
      console.error("Error in updatePokemon:", err);
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
        handleDataFromJson,
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
        currentPokemons
      }}
    >
      {children}
    </PokeDataContext.Provider>
  );
};

export const usePokeData = () => {
  return useContext(PokeDataContext);
};
