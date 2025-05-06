import { PokeCardWrapper } from "../../shared/PokemonCardWrapper";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import clsx from "clsx";

import { LuSword } from "react-icons/lu";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";

export function PokemonCard({
  pokemon,
  handleFavouriteClick,
  handleArena,
  handleCardClick,
  isLoggedIn,
  
}) {
  const {
    name,
    img,
    height,
    weight,
    base_exp,
    ability,
    isFavourite,
    isInArena,
    edited,
    win,
    loss,
  } = pokemon;
  const { darkMode } = useContext(ThemeContext);

  const isPokemonFavourite = isFavourite;
  const isPokemonEdited = edited;
  // const isPokemonInArena = isInArena;

  function capitalizeFirstLetter(string) {
    const newName = string.charAt(0).toUpperCase() + string.slice(1);
    return newName;
  }

  const handleFavIconClick = (e) => {
    e.stopPropagation();
    handleFavouriteClick(pokemon);
  };

  const handleArenaClick = (e) => {
    e.stopPropagation();

    handleArena(pokemon.id);
  };

  const handlePokemonClick = () => {
    handleCardClick(pokemon);
  };

  return (
    <div className="">
      <li
        className={clsx(
          "m-1 transform cursor-pointer list-none rounded-md p-3 transition-all hover:scale-105",
          darkMode
            ? pokemon.isInArena
              ? "border-4 border-red-500 bg-gray-800 text-neutral-400"
              : "border-2 border-gray-600 bg-gray-800 text-neutral-400"
            : pokemon.isInArena
              ? "border-4 border-red-500 bg-gradient-to-r from-sky-200 to-sky-300"
              : "border-2 border-gray-200 bg-gradient-to-r from-sky-200 to-sky-300",
        )}
        onClick={handlePokemonClick}
      >
        <div className="flex flex-col">
          <div className="flex">
            <img className="mx-auto my-4 aspect-square w-3/5" src={img} />
            {isLoggedIn && (
            <div>
              <div className="flex flex-col justify-start px-1">
                {isPokemonFavourite ? (
                  <button className="" onClick={handleFavIconClick}>
                    <IoHeart className="size-6 h-3 min-h-8 text-red-500 hover:rounded-md hover:outline hover:outline-1 hover:outline-offset-1" />
                  </button>
                ) : (
                  <button className="" onClick={handleFavIconClick}>
                    <IoIosHeartEmpty className="size-6 min-h-8 hover:rounded-md hover:outline hover:outline-1 hover:outline-offset-1" />
                  </button>
                )}
                <button>
                  <LuSword
                    className="size-6 min-h-8 hover:rounded-md hover:outline hover:outline-1 hover:outline-offset-1"
                    onClick={handleArenaClick}
                  />
                </button>
              </div>

              {isPokemonEdited && (
                <div className='mt-2'>
                  <div className='text-xs'>win: {win}</div>
                  <div className='text-xs'>loss: {loss}</div>
                </div>
              )}
            </div>
            )}
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
                Base exp.
              </PokeCardWrapper>
              <PokeCardWrapper attribute={ability}>Ability</PokeCardWrapper>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

