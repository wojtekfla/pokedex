import { PokeCardInfoWrapper } from "./PokeCardInfoWrapper";

export function PokemonCard({ pokemon }) {
  const getPokemon = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        return { res };
      });
  };
  const { name, img, height, weight, base_exp, ability } = pokemon;

  function capitalizeFirstLetter (string) {
    const newName = string.charAt(0).toUpperCase() + string.slice(1)
    return newName
  }

  return (
    <div className="">
      <li className="list-none m-1 rounded-md bg-gradient-to-r from-sky-100 to-sky-200">
        <div className="flex flex-col">
          <img className="my-4 mx-auto w-3/5 aspect-square" src={img} />
          <p className="mx-auto pb-2 text-lg font-bold">{capitalizeFirstLetter(name)}</p>
          <div className="flex justify-around">
            <div className="flex flex-col justify-center mx-auto text-xs text-center py-2">
              <PokeCardInfoWrapper attribute={height}>
                Height
              </PokeCardInfoWrapper>
              <PokeCardInfoWrapper attribute={weight}>
                Weight
              </PokeCardInfoWrapper>
            </div>
            <div className="flex flex-col justify-center mx-auto text-xs text-center py-2">
              <PokeCardInfoWrapper attribute={base_exp}>
                Base experience
              </PokeCardInfoWrapper>
              <PokeCardInfoWrapper attribute={ability}>
                Ability
              </PokeCardInfoWrapper>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}

{
  /* <div>
  <div>
    <p>{pokemon.height}</p>
    <p>Height</p>
  </div>
  <div>
    <p>{pokemon.base_exp}</p>
    <p>Base experience</p>
  </div>
</div>; */
}
