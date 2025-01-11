import { FavouritesList } from "./FavouritesList";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { FavouritesContext } from "../../../context/FavouritesContext";

import { useContext, useEffect } from "react";
import { Button } from "../../shared/Button";

const FAV_URL = 'http://localhost:3000/favourites'

export function Favourites() {
  const { pokemonsData, setPokemonsData, toggleFavourite } = useContext(PokeDataContext);
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
      const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify(bodyData),
      headers: {
        "Content-Type": "application/json",
        },
      })
      if(res.ok) {
        await loadFavourites()
        console.log('fav json', favouritesData)
        console.log('pokemon dodany do favourites')
      }
    } catch (e) {
      console.error('Error', e)
    }
  }

  useEffect (() => {
    loadFavourites(FAV_URL)
    console.log('effect fav LIST poke', favouritesData)
    // const favToAdd = {favouritesData}
    // console.log('favito-add', favToAdd)
    // tu zrobiła mi się pętla i zapiywało się do jsona mnówstwo danych
    //addData(FAV_URL, favouritesData)
  }, [])



  function handleFavouriteClick2(newFavPokemon) {
    console.log("fav poke handled", newFavPokemon);
    addData(newFavPokemon)


    // const newData = pokemonsData.map((item) => {
    //   return Number(item.id) === Number(id) ? {...item, isFavourite: true} : {...item}
    // toggleFavourite(newFavouritePokemon.id)
    // setFavouritesData((prev) => ({ ...prev, newFavouritePokemon} ));
    // tu zapis do json
    // addData(FAV_URL, newFavouritePokemon)
    
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

  return (
    <>
      <h2><strong>Moje ulubione pokemony</strong></h2>
      <FavouritesList handleClick={handleDeleteFavourite} handleFavourite={handleFavouriteClick2} />

    </>
  );
}


