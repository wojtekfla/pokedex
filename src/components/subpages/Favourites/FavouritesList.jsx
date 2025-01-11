import { useContext, useEffect } from "react";
import { FavouritesCard } from "./FavouritesCard";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { FavouritesContext } from "../../../context/FavouritesContext";
import { useFetch } from "../../../hooks/useFetch";

const FAV_URL = 'http://localhost:3000/favourites'

export function FavouritesList({handleClick, handleFavorite}) {
  const { pokemonsData, setPokemonsData, handleDataFromJson } = useContext(PokeDataContext);
  const { favouritesData, setFavouritesData} = useContext(FavouritesContext)

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

  // useEffect (() => {
  //   loadFavourites(FAV_URL)
  //   console.log('effect fav LIST poke', favouritesData)
  //   const favToAdd = {favouritesData}
  //   console.log('favito-add', favToAdd)
  //   // tu zrobiła mi się pętla i zapiywało się do jsona mnówstwo danych
  //   //addData(FAV_URL, favouritesData)
  // }, [])

  return (
    <>
      <div className="grid grid-cols-4">
        {favouritesData.length > 0 && favouritesData.map((pokemon) => {
          return (
            <FavouritesCard 
              pokemon={pokemon}
              key={pokemon.id}
              handleClick={handleClick}
              // name={pokemon.name}
              handleFavorite={handleFavorite}
              // props={{ pokemonsData, setFavouritesData }}
            />
          );
        }) }
      </div>
    </>
  );
}

