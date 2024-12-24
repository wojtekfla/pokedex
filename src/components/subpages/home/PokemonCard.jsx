import { PokeCardInfoWrapper } from "./PokeCardInfoWrapper";

export function PokemonCard({ pokemon }) {
  const getPokemon = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        return { res };
      });
  };

  console.log("pokemon", pokemon);
  const { name, url, height, weight, base_exp } = pokemon;
  // console.log(pokemon.id)

  const pokemonObj = {
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    base_exp: 64,
    url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
  };

  return (
    <div className="">
      <li className="list-none bg-gradient-to-r from-sky-100 to-sky-200">
        <div className="bg-[url(pokemon.url)]">
          <img src={pokemon.url} />
          <p>{pokemon.name}</p>
          <div>
            <PokeCardInfoWrapper attribute={height}>Height</PokeCardInfoWrapper>
            <PokeCardInfoWrapper attribute={weight}>Weight</PokeCardInfoWrapper>
            <PokeCardInfoWrapper attribute={base_exp}>Base experience</PokeCardInfoWrapper>
            <PokeCardInfoWrapper >Ability</PokeCardInfoWrapper>
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
