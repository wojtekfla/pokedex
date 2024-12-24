import { PokemonCard } from "./PokemonCard";

export function PokemonsList() {
  const pokemonsData = [
    {
      id: 1,
      name: "bulbasaur",
      height: 7,
      weight: 69,
      base_exp: 64,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    },
    {
      id: 2,
      name: "ivysaur",
      height: 10,
      weight: 130,
      base_exp: 142,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png",
    },
    {
      id: 3,
      name: "venusaur",
      height: 20,
      weight: 1000,
      base_exp: 263,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png",
    },
    {
      id: 4,
      name: "charmander",
      height: 6,
      weight: 85,
      base_exp: 62,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png",
    },
    {
      id: 5,
      name: "charmeleon",
      height: 11,
      weight: 190,
      base_exp: 142,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/5.png",
    },
    {
      id: 6,
      name: "charizard",
      height: 17,
      weight: 905,
      base_exp: 267,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/6.png",
    },
    {
      id: 7,
      name: "squirtle",
      height: 5,
      weight: 90,
      base_exp: 63,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png",
    },
    {
      id: 8,
      name: "wartortle",
      height: 10,
      weight: 225,
      base_exp: 142,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/8.png",
    },

    {
      id: 9,
      name: "blastoise",
      height: 16,
      weight: 855,
      base_exp: 265,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/9.png",
    },
    {
      id: 10,
      name: "caterpie",
      height: 3,
      weight: 29,
      base_exp: 39,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/10.png",
    },
    {
      id: 11,
      name: "metapod",
      height: 7,
      weight: 99,
      base_exp: 72,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/11.png",
    },
    {
      id: 12,
      name: "butterfree",
      height: 11,
      weight: 320,
      base_exp: 198,
      url: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/12.png",
    },
  ];

  return (
    <>
      <div>Tu bedzie lista pokemonow</div>
      <div className="grid grid-cols-4">
        {pokemonsData.map((pokemon) => {
          return <PokemonCard pokemon={pokemon} key={pokemon.id} />;
        })}
      </div>
    </>
  );
}

{
  /* <p>Name: {getPokemon().name}</p> */
}

{
  /* <li className="">
        <div>
          <img />
        </div>
        <p>Name: {props.name}</p>
        <span>Height: {props.height}</span>
        <span>Weight: {props.weight}</span>
        <span>Base experience: {props.base_experience}</span>
        <span>Ability: {ability}</span>
      </li> */
}

// export function Card ({props, className}) {
//   console.log('props', props)
//   const url = props

//   const getPokemon = (url) => {
//     fetch(url)
//     .then((res) => res.json())
//     .then((res) => {
//       return pokeData = res
//     })
//   }
