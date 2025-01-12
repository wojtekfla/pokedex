import { useContext } from "react";
import { PokeDataContext } from "../../../context/PokeDataContext";
import { FavouritesContext } from "../../../context/FavouritesContext";
import { PokeCardWrapper } from "../../shared/PokemonCardWrapper";
import { LuSword } from "react-icons/lu";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

export function PokemonCard({ pokemon, handleFavouriteClick, handleRemove, handleArena }) {
  const { name, img, height, weight, base_exp, ability, isFavourite } = pokemon;
  const isPokemonFavourite = isFavourite;


  function capitalizeFirstLetter(string) {
    const newName = string.charAt(0).toUpperCase() + string.slice(1);
    return newName;
  }

  const handleFavIconClick = () => {
    // const pokeId = pokemon.id
    handleFavouriteClick(pokemon);
  };

  const handleRemoveFromFav = () => {
    handleRemove(pokemon.id)
  }

  const handleArenaClick = () => {
    // const id = pokemon.id
    // console.log(id)
    handleArena(pokemon)
  }

  return (
    <div className="">
      <li className="m-1 list-none rounded-md bg-gradient-to-r from-sky-100 to-sky-200">
        <div className="flex flex-col">
          <div className="flex">
            <img className="mx-auto my-4 aspect-square w-3/5" src={img} />
            <div className="flex flex-col justify-start px-1">
              {isPokemonFavourite ? (
                <button className="" onClick={handleRemoveFromFav}>
                  <IoHeart className="size-6 min-h-8 text-red-500 h-3" />
                </button>
                
              ) : (
                <button className="" onClick={handleFavIconClick}>
                  <IoIosHeartEmpty className="size-6 min-h-8" />
                </button>
              )}
              <button>
                <LuSword onClick={handleArenaClick} className="size-6 min-h-8" />
              </button>
            </div>
          </div>

          <p className="mx-auto pb-2 text-lg font-bold">
            {capitalizeFirstLetter(name)}
          </p>
          <div className="flex justify-around">
            <div className="mx-auto flex flex-col justify-center py-2 text-center text-xs">
              <PokeCardWrapper attribute={height}>Height</PokeCardWrapper>
              <PokeCardWrapper attribute={weight}>Weight</PokeCardWrapper>
            </div>
            <div className="mx-auto flex flex-col justify-center py-2 text-center text-xs">
              <PokeCardWrapper attribute={base_exp}>
                Base experience
              </PokeCardWrapper>
              <PokeCardWrapper attribute={ability}>Ability</PokeCardWrapper>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}
