import { IoHeart } from "react-icons/io5";
import { PokeCardWrapper } from "../../shared/PokemonCardWrapper";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuSword } from "react-icons/lu";

export function FavouritesCard({ pokemon, handleFavourite, handleRemove }) {
  const { name, img, height, weight, base_exp, ability, isFavourite } = pokemon;

  const isPokemonFavourite = isFavourite;

  function capitalizeFirstLetter(string) {
    const newName = string.charAt(0).toUpperCase() + string.slice(1);
    return newName;
  }

  const handleFavouriteIcon = () => {
    const newFavouritePokemon = pokemon;
    // newFavouritePokemon.isFavourite = !pokemon.isFavourite;
    console.log("hanFav in fav Card", newFavouritePokemon);
    handleFavourite(newFavouritePokemon.id);
    // handleFavouriteIcon(newFavouritePokemon)
  };

  const handleRemoveFromFav = () => {
    handleRemove(pokemon.id)
  }

  return (
    <div className="">
      <li className="m-1 list-none rounded-md bg-gradient-to-r from-sky-100 to-sky-200">
        <div className="flex flex-col">
          <div className="flex">
            <div></div>
            <img className="mx-auto my-4 aspect-square w-3/5" src={img} />
            <div className="flex flex-col justify-start px-1">
              {isPokemonFavourite && (
                <button className="" onClick={handleRemoveFromFav}>
                  <IoHeart className="size-6 h-3 min-h-8 text-red-500" />
                </button>
              ) }
              <button>
                <LuSword
                  // onClick={handleToggleArenaClick}
                  className="size-6 min-h-8"
                />
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
