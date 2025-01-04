import { FavouritesList } from "./FavouritesList";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { FavouritesContext } from "../../../context/FavouritesContext";

import { useContext } from "react";
import { Button } from "../../shared/Button";

const FAV_URL = 'http://localhost:3000/favourites'

export function Favourites() {
    const { pokemonsData, setPokemonsData, toggleFavourite } = useContext(PokeDataContext);
    const { favouritesData, setFavouritesData } = useContext(FavouritesContext);

  function handleFavouriteClick(newFavouritePokemon) {
    console.log("fav poke handled", newFavouritePokemon);
    console.log('pokemon do skas z fav', newFavouritePokemon.id)


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
      <FavouritesList handleClick={handleDeleteFavourite} />

    </>
  );
}


