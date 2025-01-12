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
    // toggleFavourite,
    toggleArena,
  } = useContext(PokeDataContext);
  const { favouritesData, setFavouritesData, toggleFavourite } = useContext(FavouritesContext);

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

  function handleFavouriteClick(newFavPokemon) {
    toggleFavourite(newFavPokemon.id);
    // setFavouritesData((prev) => ({ ...prev, newFavPokemon: !newFavPokemon.isFavourite }));
    // console.log('favData', favouritesData)
    addData(FAV_URL, { ...newFavPokemon, isFavourite: true });
    
    // addData(FAV_URL, {...newFavPokemon});
  }

  function handleDeleteFavourite(id) {
    fetch(`${FAV_URL}/${id}`, {
      method: "DELETE"
    })
    .then((res) => {
      if(res.ok) {
        setFavouritesData((prev) => 
          prev.filter((item) => item.id !== id))
        toggleFavourite(id)
      } else {
        throw new Error ('Błąd podczas usuwania')
      }
    })
    .catch((e)=> {
      alert(e.message)
    })
  }

  function handleArenaClick(pokemonToArena) {
    console.log("home toggle to arena", pokemonToArena);
    const pokeId = pokemonToArena.id;
    console.log("pokeId", pokeId);
    toggleArena(pokeId);
  }

  useEffect(() => {
    console.log("home eff pokeData", pokemonsData);
    console.log("home eff favData", favouritesData);
    handleDataFromJson(favouritesData)
    const newFavData = pokemonsData.filter((item) => item.isFavourite === true)
    setFavouritesData(newFavData)
    //addData(FAV_URL, {...newFavPokemon});
  }, []);

  return (
    <>
      <SearchPokemons />
      <PokemonsList handleFavClick={handleFavouriteClick} handleRemove={handleDeleteFavourite} handleArena={handleArenaClick} />
    </>
  );
}

