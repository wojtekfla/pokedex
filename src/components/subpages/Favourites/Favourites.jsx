import { FavouritesList } from "./FavouritesList";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { FavouritesContext } from "../../../context/FavouritesContext";

import { useContext } from "react";
import { Button } from "../../shared/Button";

export function Favourites() {
    const { pokemonsData, setPokemonsData, toggleFavourite } = useContext(PokeDataContext);
    const { favouritesData, setFavouritesData } = useContext(FavouritesContext);

  function handleFavouriteClick(newFavouritePokemon) {
    console.log("fav poke handled", newFavouritePokemon);
    // const newFavList = favouritesData.map((item) => {
    //   Number(item.id) !== Number(id)
    // })
    // console.log('nev fav list', newFavList)

    // const newData = pokemonsData.map((item) => {
    //   return Number(item.id) === Number(id) ? {...item, isFavourite: true} : {...item}
    // toggleFavourite(newFavouritePokemon.id)
    // setFavouritesData((prev) => ({ ...prev, newFavouritePokemon} ));
    // tu zapis do json
    // addData(FAV_URL, newFavouritePokemon)
    
  }

  return (
    <>
      <h2><strong>Moje ulubione pokemony</strong></h2>
      <FavouritesList handleClick={handleFavouriteClick} />

    </>
  );
}


