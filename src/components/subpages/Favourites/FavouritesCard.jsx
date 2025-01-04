import { PokeCardWrapper } from "../../shared/PokemonCardWrapper";

export function FavouritesCard({ pokemon, props, handleClick }) {
  const { name, img, height, weight, base_exp, ability, isFavourite } = pokemon;

  const isPokemonFavourite = isFavourite;

  function capitalizeFirstLetter(string) {
    const newName = string.charAt(0).toUpperCase() + string.slice(1);
    return newName;
  }

  const handleFavouriteIcon = () => {
    const newFavouritePokemon = pokemon;
    // newFavouritePokemon.isFavourite = !pokemon.isFavourite;
    console.log('zmiana favorite', newFavouritePokemon)
    handleClick(newFavouritePokemon.id);
  };

  return (
    <div className="">
      <li className="m-1 list-none rounded-md bg-gradient-to-r from-sky-100 to-sky-200">
        <div className="flex flex-col">
          <div className="flex">
            <div></div>
            <img className="mx-auto my-4 aspect-square w-3/5" src={img} />
            {isPokemonFavourite ? (
              <button className="" onClick={handleFavouriteIcon}>
                <svg
                  width="25"
                  height="24"
                  viewBox="0 0 25 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="heart-full"
                    d="M12.3335 3.62129C9.1847 -2.40139 0.333496 -0.642717 0.333496 6.90263C0.333496 11.8693 5.5475 17.2053 11.4971 23.6227C11.7299 23.8747 12.0323 24 12.3335 24C12.6347 24 12.9371 23.8747 13.1699 23.6227C19.1423 17.1813 24.3335 11.8706 24.3335 6.90263C24.3335 -0.668051 15.4583 -2.35605 12.3335 3.62129Z"
                    fill="#C60C0C"
                  />
                </svg>
              </button>
            ) : (
              <button className="" onClick={handleFavouriteIcon}>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill=""
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="heart"
                    d="M6.28 3.12176C9.516 3.12285 11.253 6.93012 12 8.61012C12.75 6.92249 14.469 3.13267 17.726 3.13267C19.784 3.13267 22 4.56067 22 7.69485C22 11.4498 17.256 16.2596 12 21.8767C6.742 16.2574 2 11.4487 2 7.69485C2 4.77558 3.965 3.12067 6.28 3.12176ZM6.281 0.939941C3.098 0.939941 0 3.32576 0 7.69485C0 12.7796 5.57 17.9789 12 24.9399C18.43 17.9789 24 12.7796 24 7.69485C24 3.31921 20.903 0.95085 17.726 0.95085C15.522 0.95085 13.28 2.08758 12 4.48321C10.715 2.07667 8.478 0.939941 6.281 0.939941Z"
                    fill="black"
                  />
                </svg>
              </button>
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
