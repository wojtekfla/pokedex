import { useState, useEffect, useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { FavouritesContext } from "../../../context/FavouritesContext";

import { SearchPokemons } from "./SearchPokemons";
import { PokemonsList } from "./PokemonsList";
import { PokemonCard } from "./PokemonCard";
import { loadFromJson } from "../../../utils/loadFromJson";

const BASE_URL = "http://localhost:3000";
const FAV_URL = "http://localhost:3000/favourites";

export function Home() {
  const { pokemonsData, setPokemonsData, handleDataFromJson, toggleArena } =
    useContext(PokeDataContext);
  const { favouritesData, setFavouritesData, toggleFavourite } =
    useContext(FavouritesContext);

  const loadFavourites = async () => {
    try {
      const response = await fetch(FAV_URL);
      if (!response.ok) {
        throw new Error("An error occurred ...");
      }
      const json = await response.json();
      console.log("json", json);
      setFavouritesData(json);
    } catch (e) {
      console.error("Error", e);
    }
  };

  const addData = async (url, bodyData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("An error occurred ...");
      }
    } catch (e) {
      console.error("Error", e);
    }
  };

  function handleFavouriteClick(newFavPokemon) {
    toggleFavourite(newFavPokemon.id);
    // setFavouritesData((prev) => ({ ...prev, newFavPokemon: !newFavPokemon.isFavourite }));
    // console.log('favData', favouritesData)
    addData(FAV_URL, { ...newFavPokemon, isFavourite: true });

    // addData(FAV_URL, {...newFavPokemon});
  }

  function handleDeleteFavourite(id) {
    fetch(`${FAV_URL}/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setFavouritesData((prev) => prev.filter((item) => item.id !== id));
          toggleFavourite(id);
        } else {
          throw new Error("Błąd podczas usuwania");
        }
      })
      .catch((e) => {
        alert(e.message);
      });
  }

  function handleArenaClick(pokemonToArena) {
    console.log("home toggle to arena", pokemonToArena);
    const pokeId = pokemonToArena.id;
    console.log("pokeId", pokeId);
    toggleArena(pokeId);
  }
  // let data;

  // async function loadPokemonsFromJson(url, data) {
  //   return (data = loadFromJson(url));
  // }

  async function printData() {
    const arenaToPrint = await loadFromJson(`${BASE_URL}/pokemons`);
    console.log(arenaToPrint);
  }

  useEffect(() => {
    handleDataFromJson(favouritesData);
    const newFavData = pokemonsData.filter((item) => item.isFavourite === true);
    setFavouritesData(newFavData);

    printData();

    //pokemonsInArena = loadFromJson(`${BASE_URL}/pokemons`)
    // const updatePokemons = loadFromJson(`${BASE_URL}/pokemons`);
  }, []);

  return (
    <>
      <SearchPokemons />
      <PokemonsList
        handleFavClick={handleFavouriteClick}
        handleRemove={handleDeleteFavourite}
        handleArena={handleArenaClick}
      />
    </>
  );
}
