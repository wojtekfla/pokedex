import { IoIosHeartEmpty } from "react-icons/io";
import { IoHeart } from "react-icons/io5";
import { LuSword } from "react-icons/lu";
import { PokeCardWrapper } from "../../shared/PokemonCardWrapper";

export function ArenaCard({pokemon}) {
  const { name, img, height, weight, base_exp, ability, isFavourite } = pokemon;
  const isPokemonFavourite = isFavourite;


  return (
    <>
    <div className="">
          <li className="m-1 list-none rounded-md bg-gradient-to-r from-sky-100 to-sky-200">
            <div className="flex flex-col">
              <div className="flex">
                <img className="mx-auto my-4 aspect-square w-3/5" src={img} />
                <div className="flex flex-col justify-start px-1">
                  {isPokemonFavourite ? (
                    <button className="" >
                      <IoHeart className="size-6 min-h-8 text-red-500 h-3" />
                    </button>
                  ) : (
                    <button className="" >
                      <IoIosHeartEmpty className="size-6 min-h-8" />
                    </button>
                  )}
                  <button>
                    <LuSword className="size-6 min-h-8" />
                  </button>
                </div>
              </div>
    
              <p className="mx-auto pb-2 text-lg font-bold">
                {/* {capitalizeFirstLetter(name)} */}
                {name}
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

    </>
  );
}
