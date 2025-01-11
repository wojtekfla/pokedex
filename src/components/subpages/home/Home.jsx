import { useState, useEffect, useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { FavouritesContext } from "../../../context/FavouritesContext";

import { SearchPokemons } from "./SearchPokemons";
import { PokemonsList } from "./PokemonsList";
import { PokemonCard } from "./PokemonCard";

const FAV_URL = "http://localhost:3000/favourites";

export function Home() {
  const {
    pokemonsData,
    setPokemonsData,
    handleDataFromJson,
    toggleFavourite,
    toggleArena,
  } = useContext(PokeDataContext);
  const { favouritesData, setFavouritesData } = useContext(FavouritesContext);

  const loadFavourites = async () => {
    try {
      const res = await fetch(FAV_URL)
      const json = await res.json()
      console.log("json", json)
      setFavouritesData(json)
      } catch (e) {
        console.error('Error', e)
    }
  }

  const addData = async (url, bodyData) => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(bodyData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      console.error("Error", e);
    }
  };

  function handleFavouriteClick(newFavouritePokemon) {
    console.log("home handFavClick", newFavouritePokemon);
    setFavouritesData((prev) => ({ ...prev, newFavouritePokemon }));
    toggleFavourite(newFavouritePokemon.id);
    addData(FAV_URL, { ...newFavouritePokemon, isFavourite: true });
  }

  function toggleArena2(pokemonToArena) {
    console.log("home toggle to arena", pokemonToArena);
    const pokeId = pokemonToArena.id;
    console.log("pokeId", pokeId);
    toggleArena(pokeId);
  }

  useEffect(() => {
    console.log("home eff pokeData", pokemonsData);
    console.log("home eff favData", favouritesData);
    handleDataFromJson(favouritesData)
  }, []);

  console.log('Home render')

  return (
    <>
      <SearchPokemons />
      <PokemonsList handleFavClick={handleFavouriteClick} />
    </>
  );
}

